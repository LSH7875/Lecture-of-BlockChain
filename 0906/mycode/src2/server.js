const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const {mineBlock,getBlock,getLastBlock,addBlock,getVersion} =require('./non')
const bodyParser = require('body-parser')
const { wsInit, getSockets,broadcast,connectionToPeers} = require('./non_network')


app.use(bodyParser.json());

app.get('/version',(req,res)=>{
    res.send(getVersion())
})
app.get("/blocks",(req,res)=>{
    res.send(getBlock())
})

app.post('/mineBlock',(req,res)=>{
    const aaa =req.body.data;
    const result = mineBlock(aaa); //{} or false 반환될 거임
    if(result === false){
        res.send(`mineBlock failed`)
        res.status(400).send(`블럭추가에 오류가 발생되었습니다.`)
    }else{
        res.send(result)
    }
    // res.send(addBlock(`[${aaa}]`))
})
//culr http:
app.get('/stop',(req,res)=>{
    res.send("Server Stop");
    process.exit(0);
})


//peers> 현재 가지고 있는 소켓 리스트 getSockets /get
app.get('/peers',(req,res)=>{
    res.send(getSockets().map(socket=>{
        return `${socket._socket.remoteAddress}:
        ${socket._socket.remotePort}`//내가 소켓에 접속한 주소/ 접속한 포트 
        //다시 배열로 반환해줌.
    }))
})

//addPeers => 내가 보낼 주소값에 소켓ㅇ르 생성하는 작업 connectToPeers /post

app.post('/addPeers',(req,res)=>{
    const peers = req.body.peers || [];
    connectionToPeers(peers);
    res.send('success');
})

// crul -X POST -H "Content-Type:application/json" -d "{\"peers\":[\"ws://localhost:7001\"]}" http://localhost:3000/addPeers


wsInit()//오후에 추가
//express는 클라이언트가 해주는 역할 sebsocket은 서버측 코ㄷ,ㅡ


app.listen(port,()=>{
    console.log(`server start port ${port}`)
})

/*
window
set 변수명 = 값
linuix mac
export 변수명  값
window 변수 확인
set 변수명
env | grep 변수명
*/

/*블록 가져오기
간단한 기록들이나 버전 바꾸기 중단 같은 거를 peer
*/

/*
c+ url + -X:메소드
json형식으로 */