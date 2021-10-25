import React, { useState,useEffect,useReducer } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import axios from 'axios';
// import axios from 'axios'

import "./App.css";

const reducer = (state,action)=>{
  switch(action.type){
    case "INIT":{
      let {web3,Instance,account} = action; 
      return {
        ...state,web3,Instance,account
      }
    }
  }
}

const INIT_ACTIONS=(web3,Instance,account)=>{
  return{ type:'INIT',web3,Instance,account}
}

const App=()=>{

  const initialState={
    web3:null,
    Instance:null,
    account:null,
  }
  const [state,dispatch]=useReducer(reducer,initialState);
  const [value,setValue]=useState(0);
  const [storage,setStorage] = useState(0);
  const [loadding,setLoadding] = useState(false);
  
  const handleResult =(log,web3)=>{
    const params=[
      {type:'string',name:'message'},
      {type:'uint256',name:'newVal'}
      //uint만 적는 것이 아니라 uint256으로 적어준다.
    ]
    const returnValues = web3.eth.abi.decodeLog(params,log.data)//dat:0x00000.....을 우리가 원하는 형식으로 변경해준다.
    //decode는 첫번째는 데이터 형식, 두번째는 log.data 

    console.log(`returnValues:`,returnValues);//서명까지 해야 보인다. 
    //returnValues.message=="set" 이렇게 다양한 이벤트 ㅊㅓ리가 가능하다.스위치문으로 가능
    setStorage(returnValues.newVal);
    setLoadding(prev=>!prev);
  }


  const handleChange = (e) =>{
    let val = e.target.value;
    setValue(val);
  }

  //button 함수
  const send = async() => {
    const {account,Instance} = state;
    if(value > 0){
      setLoadding(prev=>!prev);
      //비동기적 처리
      await Instance.set(value,{from:account})
    }
  }

  const sendAPI = async ()=> {
    let {web3,account}=state;
    //역할
    /*1. 백엔드에 요청한다.(비동기axios)
    백엔드에서 reqTx객체를 반환해준다.
    반환받은 값을 sendTransaction()을 실행한다.(실질적으로 서명하는 과정) */
    if(value > 0){
      setLoadding(prev=>!prev);
      let result = await axios.post('http://localhost:3001/rpc/set',{from:account,val:value});
  
      if(result.data !==undefined && result.data.rawTx !== undefined && result.success ==true){
        await web3.eth.sendTransaction(result.data.rawTx)
      }
      //비동기적 처리
      //web3.eth.sendTransaction() 서명만 처리하는 방법이 있다. 
      //인자값으로 객체가 들어간다.
      /*rawTx={
        "from":"adress,,,",
        "to":"",
        "data":"실질적인 데이터부분 이제는 우리가 컴퓨터가 이해 편하도록인코딩을 해야한다. 이걸 백엔드에서 처리해야함 여기서 set함수로 넣는다."
        "gasLimit":"...",
        "gasPrice":",,,"
      }*/
    }
  }

  const sendTx = async() => {
    const {account}=state;
    
    if(value > 0){
      setLoadding(prev=>!prev);
      let result = await axios.post('http://localhost:3001/rpc/setTx',{from:account,val:value});  
    }

  }

  const init = async() => {
    const contract=require('@truffle/contract');
    const web3 = await getWeb3();

    const [account] = await web3.eth.getAccounts();//하나인거 알고 있을 때는 이렇ㄹ게 쓰자
    // const networkId= await web3.eth.net.getId();//네트워크 아이들 가져올 수 있다.
    let simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(web3.currentProvider);

    const Instance = await simpleStorage.deployed();
    console.log(Instance);
    dispatch(INIT_ACTIONS(web3,Instance,account))
    web3.eth.subscribe("logs",{address:Instance.address})//사용자의 어드레스가 아니라 contract계정의 address임
    .on('data',log=>{
      // console.log(log)
      handleResult(log,web3)
    })
    .on('error',err=>console.log(err))
  }

  useEffect(()=>{
    init();
  },[])



  return (
    <div>
      <input type = "text" value={value} onChange={handleChange}/>
      <div>
        <button onClick={send}>일반 서명</button>
        <button onClick={sendAPI}>Server거치고 서명</button>
        <button onClick={sendTx}>Server 서명</button>
      </div>
      <div>
        {loadding? `loading`:storage}
      </div>
    </div>
  )
}

export default App;
