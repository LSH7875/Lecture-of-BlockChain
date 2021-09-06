/*
npm i ws
*/

const WebSocket = require('ws');
const {WebSocktServer} = require('ws')


const wsPORT = process.env.WS_PORT || 6005;

//전역번수 소켓에 연결된 사람(peer)들을 모아놓는 리스트
//웹소켓 접속한 사람들의 정보를 모은 배열
let sockets = [];

function getSockets(){
    return sockets
}

//최초의 접속
function wsInit(){
    const server = new WebSocket.Server({ port:wsPORT })//자기 자신의 도메인에서 포트만 넣어서 생성해준거임//웹소켓 서버를 만들어줌.
    //내 자신의 호스트로 해당 포트를 열겠다.
    server.on("connection",(ws)=>{
        //ws: 소켓의 id  고유 객체.... url

        //커넥션이 완료가 되면 콜백함수를 실행하겠다.
        //message를 받을 수 잇는 상태가 됨
        //server 내가 받은 소켓
        //server.on("메세지",()=>{
        // 특정한 메세지를 받으면 뒤의 콜백함수를 실행하겠다는 거임
        //})
        console.log('-------------')
        console.log(ws)
        init(ws)
    })
}
//arrow함수 안쓴느 이유: 이벤트적인 함수를 많이 쓴다.
//이벤트는 비동기이다. 그래서 대부분 코드들이 
// Object.getOwnPropertyDescriptor("message",()=>{
//     Object.getOwnPropertyDescriptor("message",()=>{
//         Object.getOwnPropertyDescriptor("message",()=>{
//         })
//     })
// })

// 애로우 함수는 변수이기 때문에 순수 함수와는 다르게 위에서 소환이 안된다.  


function init(ws){
    sockets.push(ws)
}

function write(ws,message){
    ws.send(JSON.stringify(message))
}

//broadcast를 만들것임.
//websocket은 나에게는 안 왔음. 그러나 여기서는 나 포함 broadcast라고 생각하자.

function broadcast(message){
    sockets.forEach( socket =>{
        write(socket,message)
    })
}


//peerd생성(접속할 수 있는 사람들을 설정)  socket으로만은 할 수 없고 http통신과 함께하면 할 수 있다. 할 숭 ㅣㅆ다.

function connectionToPeers(newPeers){
    //http://localhsot:3000 http://localhost:3001
    //http://localhost:3005
    //이 내용은 배열에 넣을 것임.
    newPeers.forEach(peer=>{
        //peer은 정확하게 주소값이 들어갈거임 http://localhost:3000  그래서 http를 프로토콜
        //웹소켓은 프로토콜이 다르기때문에 주솟값이 정확하게 ws://localhost:7001

        const ws = new WebSocket(peer)//도메인가지 받은 것임.
        ws.on("open",()=>{
            init(ws)
        })
        ws.on("error",()=>{
            console.log("connection failed")
        })
    })
}

module.exports = {
    wsInit, getSockets,broadcast,connectionToPeers
}