const fs = require('fs');//filesystem

function getVersion(){
    const package = fs.readFileSync("../package.json");
    // console.log(package.toString("utf8"));
    console.log(JSON.parse(package).version);
    return JSON.parse(package).version;

    //const 
};

function createGenesisBlock(){
    //1.header만들기(5개의 인자를 만들기)
    const version = getVersion()
}





getVersion();
//파일을 읽어서 원하는 정보를 받아 왔다!

//timestamp에 넣을 내용
function getCurrentTime(){
    console.log(Math.ceil(new Date().getTime()/1000));//Math.floor: 내림함수 Math.ceil: 올림 Math.round:반올림
    console.log(Date.now());
}
getCurrentTime();
