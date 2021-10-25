const address=require('../../../client/src/contracts/SimpleStorage.json').networks[5777].address;
const Web3 = require('web3');
const abi=require('../../../client/src/contracts/SimpleStorage.json').abi;
const web3 = new Web3('http://localhost:7545');//가나시에 연결>>네크워크에 접근 가능
const ethTx = require('ethereumjs-tx').Transaction

const set =async (req,res)=>{
    const {from,val}=req.body;
    //우리가 배포한 주소 값을 알아야 한다.
    const instance = await new web3.eth.Contract(abi,address)   
    //data를 만들기 위한 것.. 함수 호출이 되었다. 
       const data = await instance.methods.set(val).encodeABI()
    console.log(`data:`,data);
    let txObject={
        from,
        to:address,//contract address
        data,//인코딩하는 작업
        /*배포한 set이라는 메소드를 인자값을 넣은 set(10)을 바꾸어주어야함 이더리움 네트어크에 접근해야 한다.
        ->web3라이브러리를 사용해야 한다.  */
        gasLimit:web3.utils.toHex(30000), // 16진수로 변환해주어야 함.
        gasPrice:web3.utils.toHex(web3.utils.toWei('20','gwei')) }//wei인데 hex로 써야한다.
    
    res.json({success:true,rawTx:txObject})
}

const setTx = async(req,res)=>{
    const {from,val}=req.body;
    // //우리가 배포한 주소 값을 알아야 한다.
    const instance = await new web3.eth.Contract(abi,address) 
    // //data를 만들기 위한 것.. 함수 호출이 되었다. 
    const data = await instance.methods.set(val).encodeABI();
    const txCount = await web3.eth.getTransactionCount(from);

    console.log(`data:`,data);
    let txObject={
        nonce:web3.utils.toHex(txCount),
        from,
        to:address,//contract address
        data,//인코딩하는 작업
        /*배포한 set이라는 메소드를 인자값을 넣은 set(10)을 바꾸어주어야함 이더리움 네트어크에 접근해야 한다.
        ->web3라이브러리를 사용해야 한다.  */
        gasLimit:web3.utils.toHex(3000000), // 16진수로 변환해주어야 함.
        gasPrice:web3.utils.toHex(web3.utils.toWei('20','gwei')) 
    }//wei인데 hex로 써야한다.
    

    
    // //여기서 서명 완료 시켜야함
    const tx = new ethTx(txObject);//객체를 검증해준다.
    const privateKey = Buffer.from('dae44eb4528946cc427b341d572740423ea62b9e4b37e10f393e9657fce56fbc',"hex");
    tx.sign(privateKey)
    // console.log(tx);

    // sendSignedTransaction()
    const SerializedTx=tx.serialize();
    console.log(SerializedTx.toString('hex'));
    const txHash= await web3.eth.sendSignedTransaction(`0x`+SerializedTx.toString('hex'))
    console.log(txHash);
    res.json({success:true,rawTx:txObject,SerializedTx,txHash})
    // res.json({success:true,txObject})
}

module.exports = {
    set,setTx
}