const WebSocket = require('ws');
const wsPORT = process.env.WS_PORT || 6005;

let sockets =[];

function getSockets(){
    return sockets
}

function wsInit(){
    const server = new WebSocket.Server({fort:wsPORT})
    server.on("connection",(ws)=>{
        //도대체 여기서 ws가 뭐야?
        console.log('-------------------')
        console.log(ws)
        console.log('-------------------')
        init(ws)
    })
}

function init(ws){
    sockets.push(ws)
}
//여기서 받는 메세지는 뭐지?
function broadcast(message){
    sockets.forEach(socket=>{
        write(socket,message)
    })
}

function write(ws,message){
    ws.send(JSON.stringify(message))
}

function connectionToPeers(newPeers){
    newPeers.forEach(peer=>{
        const ws = new WebSocket(peer)//peer라는 도메인주소를 받는다.
        ws.on("open",()=>{
            //Emitted when the connection is established.
            //연결이 구성되면 방출된다.
            init(ws)//여기서 ws는? 도메인주소!
        ws.on("error",()=>{
            console.log("connection failed")
        })
        })
    })
}
wsInit()
module.exports = {
    wsInit, getSockets,broadcast,connectionToPeers
}