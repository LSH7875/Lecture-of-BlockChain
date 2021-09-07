const bodyParser = require('body-parser');
const WebSocket = require('ws');
const wsPORT = process.env.WS_PORT || 6005;
const bc = require('./non')
let sockets =[];

function getSockets(){
    return sockets
}

function initErrorHandler(ws){

    ws.on("close",()=>{closeConnection(ws)})
    ws.on("error",()=>{closeConnection(ws)})
}

function closeConnection(ws){
    console.log(`Connection closed ${ws.url}`)
    socket.splice(sockets.indexOf(ws),1)
}
function wsInit(){
    const server = new WebSocket.Server({port:wsPORT})
    server.on("connection",(ws)=>{//connection:최초의 실행(handshake)
        //도대체 여기서 ws가 뭐야? 
        //ws:고유키값 서버와 클라이언트간의 연결되어잇는 고유값
        console.log('-------------------')
        console.log(ws)
        console.log('-------------------')
        init(ws)//ws: 소켓의 (고유)키값
    })
}

const MessageAction = {
    QUERY_LAST:0, //블록의 마지막의 내용을 찾는 것
    QUERY_ALL:1, //가지고 있는 노드를 다 처리하느 ㄴ공간
    RESPONSE_BLOCK:2, //실질적으로 추가처리를 해줄지 말지 결정하는 메소드
}


//reducer과 같은 것을 만들거 임
function initMessageHandler(/*서버 측의 내용 즉, 소켓의 내용*/ws){
/*
data = {
    type:"",
    date:""
}
*/
    ws.on("message",data=>{
        const message = JSON.parse(data)
        switch(message.type){
            case MessageAction.QUERY_LAST:
                write(ws,responseLastMsg())
                break;
            case MessageAction.QUERY_ALL:
                write(ws,responseBlockMsg())
                break;
                //둘 다 RESPONSE_BLOCk으로 가지만 둘의 data만드는 것이 달라서 난눈 것임.
            case MessageAction.RESPONSE_BLOCK:
                handleBlockResponse(message)
                break;
        }
    })//name of events, callback
}


function handleBlockResponse(message){
    //message에는 type도 들어가있음. 그래서 
    const receivedBlocks = JSON.parse(data);//받은 블록
    const  lastBlockReceived = message.data[receivedBlocks.length-1];
    const lastBlockHeld = bc.getLastBlock() //내가 가지고 있는 블록의 마지막
    
    //블록의 최신화 체크하는 것
    if(lastBlockReceived.header.index>lastBlockHeld.header.index){
        console.log(`블록의 갯수 \n 내가 받은 블록의 index값${lastBlockReceived.header.index}\n 내가 가지고 있는 블록의 인덱스 값 ${lastBlockHeld.header.index}\n`)
        
        //연결점이 어느정도인가?
        if(bc.createHash(lastBlockHeld) === lastBlockReceived.header.previousHash){
            
        
            console.log(`마지막 하나만 비어있느 경우에는 하나만 추가함`)
            if(bc.addBlock(lastBlockReceived)){
                broadcast(responseLastMsg())
            }
        }else if(receivedBlocks.lenght ===1){
            console.log(`피어로부터 블록을 연결해야 합니다ㅣ.`)
            broadcast(queryAllMsg())//전체를 바꾸는 것임
        }else{
            console.log('블록 최신화를 진행합니다.')
            //블록 최신화 코드 또 작성.....
            //내가 가지고 있는 블럭을 다 수정해야 한다.
            //bc.replaceBlock()
        }
    
    }else{
        console.log('블록이 이미 최신버전입니다.')
    }
}




function responseLastMsg(){
    return{
        type:MessageAction.RESPONSE_BLOCK,
        data://배열 안에 내용을 만들어서 보내준다. 마지막 블럭은[]
        JSON.stringify([bc.getLastBlock()])
        //글자 형태로 만들어서 보내주어야 한다.
    }
}

function responseBlockMsg(){
    return{
        type:MessageAction.RESPONSE_BLOCK,
        data://배열 안에 내용을 만들어서 보내준다. 마지막 블럭은[]
        JSON.stringify(bc.getBlock())//배열인데 왜 JSON.stringify
    }
}

function queryAllMsg(){
    return {
        type:MessageAction.QUERY_ALL,
        data:null
    }
}

function init(ws){
    sockets.push(ws)
    initMessageHandler(ws)//무엇을 보내는지 관리해주는 함수
    initErrorHandler(ws)
    // ws.send(JSON.stringify({type:MessageActoin.}))
    write(ws,queryBlockMsg())
}

function queryBlockMsg(){
    return {
        type:MessageAction.QUERY_LAST,
        data:null
    }
}

//여기서 받는 메세지는 뭐지? 통신할 거
function broadcast(message){
    sockets.forEach(socket=>{
        write(socket,message)
    })
}

function write(ws,message){//message는 객체
    ws.send(JSON.stringify(message))
}

function connectionToPeers(newPeers){
    newPeers.forEach(peer=>{
        console.log(peer)
        const ws = new WebSocket("ws://localhost:6007/")//peer라는 도메인주소를 받는다.
        ws.on("open",()=>{
            //Emitted when the connection is established.
            //연결이 구성되면 방출된다.
            init(ws)//여기서 ws는? 도메인주소!
        })
        ws.on("error",()=>{
            console.log("connection failed")
        })
        
    })
}

module.exports = {
    wsInit, getSockets,broadcast,connectionToPeers,responseLastMsg,
}

//마지막 배열의 인덱스값이 다르다면 두개의 서버는 블록의 갯수가 다르다는 말임. 그래서 가져오는 것임.
//프로토콜이 같으면 호환성이 좋다.
//Dapp