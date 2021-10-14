import React, { useState , useEffect, useReducer} from "react";
import FruitshopContract from "./contracts/Fruitshop.json";
import getWeb3 from "./getWeb3";


import "./App.css";

const App=()=>{
  
  const [myApple,setMyApple]= useState(0);
  let initialState={web3:null, instance:null, accounts:null};
  const [state,dispatch]= useReducer(reducer,initialState);

  function reducer(state,action){
    switch(action.type){
      case "INIT":
        let {web3,instance,accounts}=action;
        return{
          ...state,web3, instance, accounts
        }
    }
  }
  const buyApple = async() =>{
    // setMyApple(w=>w+1);
    //instance값을 가져와야 함.
    let {instance,accounts,web3} = state;
    await instance.buyApple({
      from:accounts,
      value:web3.utils.toWei("10","ether"),
      //10000000000000000000,
      gas:90000
    })
    setMyApple(prev=>prev+1);
  }

  const sellApple = async()=>{
    let{instance,accounts,web3} = state;
    await instance.sellApple(
      web3.utils.toWei("10","ether"),{
        from:accounts,
        gas:90000
    });
    setMyApple(prev=>0);

  }
  const getweb= async ()=>{
    var contract = require("@truffle/contract");
    let web3 = await getWeb3()
    // console.log(web3);

    //util이라는 걸 쓰기 위해서 이것도 상태값에 저장을 해야함.
    let fruitshop= contract(FruitshopContract);
    fruitshop.setProvider(web3.currentProvider);//여기가 votingcontract부분까지임

    let instance = await fruitshop.deployed();
    // console.log('instance');
    // console.log(instance);

    //주소 가져오기
    let accounts = await web3.eth.getAccounts();
    console.log(accounts);

    // instance.sellApple();
    // instance.buyApple();
    await dispatch({type:"INIT",web3,instance,accounts:accounts[0]})
    
    //web3와 instance와 account의 값을 상태에 저장하는 것이 목표이다.

    //현재 내가 가지고 있는 사과를 리턴해주는 함수를 만드는 것
    getApple(instance);
  }
  //이거는 가져오는 것임
  const getApple=async(instance)=>{
    if(instance == null) return;
    let result = await instance.getMyApple();
    setMyApple(result.toNumber());
  }
  //componentDidMount WEB3 가져와서 메타마스크 연결
  useEffect(()=>{
    getweb()
  },[])


  return(
    <div>
      <h1>사과 가격 10 ETH</h1>
      <button onClick={()=>buyApple()}>구매하기</button>
      <p>내가 가진 사과 : <span>{myApple}</span></p>
      <button onClick={()=>sellApple()}>Sell</button>
      <p>판매가격 : {myApple*10} ETH</p>
    </div>
  )
}

export default App;
