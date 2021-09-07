const WebSocket =require('ws');


const ws = new WebSocket('ws://localhost:6005')//프로토콜, url, 포트번호, uri

ws.on('open',()=>{//연결이 완료가 되었고, 최초 실행할 때 되는 코드

    let obj={name:"seunghui"}
    let rst =  JSON.stringify(obj)
    ws.send(rst)
    let obj2 = {type:1,data:'data를 보내보겠다.'}
    let rst2 =  JSON.stringify(obj2)
    ws.send(rst2)
})

ws.on('message',(message)=>{
    console.log(`received: ${message}`)
})