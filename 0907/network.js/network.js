//server.js는 소통만 해주는 것일 분.
//block.js는 블록을 저장하는 형태를 만들어주는 코드일 뿐
//network.js는 각각의 데이터를 전달해주는 역할을 한다.

const WebSocket = require('ws');
let sockets=[];//접속한 클라이언트 중 특정 사람에게만 냉룡 전달하고 싶어서

const MessageAction={
    QUERY_LAST:0,
    QUERY_ALL:1,
    RESPONSE_BLOCK:2
}



console.log(1)
function wsInit(){
    console.log(2)
    const server = new WebSocket.Server({port:6005})
    console.log(3)
    server.on("connection",(ws)=>{
            init(ws);
            console.log(4)
        //     ws.on('message', (message)=>{
        //         console.log(5)
        //     console.log(`received: ${message}`);
        //   });
          console.log(6)
          ws.send(`i'm server`);
          console.log(7)

    })
}

function initMessageHandler(ws){
    ws.on("message",(message)=>{
        console.log(JSON.parse(message))
    })
}
wsInit()
function init(ws){
    sockets.push(ws)
    initMessageHandler(ws)
}
module.exports={wsInit}