const fs = require('fs');//filesystem
const merkle = require('merkle');
const CryptoJs = require('crypto-js');
const SHA256 = require('crypto-js/sha256');
let index=0;
function createGenesisBlock(aaaaa){
    //1.header만들기(5개의 인자를 만들기)
    const version = getVersion()
    const time = parseInt(Date.now()/1000)
    const previousHash =  aaaaa || '0'.repeat(64)
    //body의 내용으로 merkleroot를 만드는 것임. 그래서 먼저 body를 만듦
    const body = ['hello block']
    const tree = merkle('sha256').sync(body)
    const root = tree.root() || '0'.repeat(64)
    // console.log('tree',root,'tree')
    const header = new BlockHeader(version,index,previousHash,time,root)
    return new Block(header,body)
}

function getVersion(){
    const package = fs.readFileSync("../package.json");
    // console.log(package.toString("utf8"));
    // console.log(JSON.parse(package).version);
    return JSON.parse(package).version;
};

class BlockHeader {
    constructor(version,index,previousHash,timestamp,merkleRoot){//header를 만들 인잣값들
        this.version = version//1{version:1}
        this.index = index
        this.previousHash = previousHash
        this.timestamp = timestamp 
        this.merkleRoot = merkleRoot

    }

}

class Block{
    constructor(header,body){
        this.header = header
        this.body = body
    }
}

const block=createGenesisBlock();



///다음 블럭을 만들기....
////검증과 데이터 타입을 신경쓰면서 만들어야 함.

//연결리스트 형태로 블록을 만들거임.
let Blocks= [createGenesisBlock()]

//뒤에다가 붙여주기만 하면 된다.
//Blocks[Blocks.lenght-1]
function getBlock(){
    return Blocks
}

function getLastBlock(){
    return Blocks[Blocks.length-1]
}
function addBlock(){
    
    console.log(Blocks[Blocks.length-1].header.index);;
    index++;
    const aaa=Object.values(getLastBlock().header);
    const bbb=merkle('sha256').sync(aaa).root()
    //const bbb = SHA256(aaa).toString()
    //console.log(bbb);//bbb는 previous값
    //previoushesh 마지막 블록의 header 값을 string으로 연결해서 sha256으로 변환하면 됨.
    Blocks.push(createGenesisBlock(bbb))
}
addBlock();
addBlock();
addBlock();
console.log(Blocks);