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
    const header = new BlockHeader(version,index,previousHash,time,root)
    return new Block(header,body)
}

function getVersion(){
    const package = fs.readFileSync("../package.json");
    return JSON.parse(package).version;
};

class BlockHeader {
    constructor(version,index,previousHash,timestamp,merkleRoot){//header를 만들 인잣값들
        this.version = version//
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

let Blocks= [createGenesisBlock()]
console.log(Blocks)

function getBlock(){
    return Blocks
}

function getLastBlock(){
    return Blocks[Blocks.length-1]
}

function nextBlock(data){
    //header
    const prevBlock = getLastBlock()
    const version = getVersion()
    const index = prevBlock.header.index + 1
    const previousHash = createHash(prevBlock) 
    const time = parseInt(Date.now()/1000);
    const merkleTREE = merkle('sha256').sync(data)
    const merkleRoot = merkleTREE.root() || '0'.repeat(64)
    /*이전 해쉬값의
    SHA256(versiton+index+previousHash+timestamp+merkleRoot)*/

    const header = new BlockHeader(version,index,previousHash,time,merkleRoot)
    return new Block(header,data)
}

function createHash(data){
    //header
    const {
        version,
        index,
        previoushash,
        time,
        merkleRoot
    } = data.header
    const blockString = version+index+previoushash+time+merkleRoot
    const Hash = CryptoJs.SHA256(blockString).toString()
    return Hash
}

function addBlock(data){
    //header+body
    //검증을 위한 미리 공간을 확보해 놓은 것
    // 함수 하나에는 함수 하나의 기능만 할 수 있게끔
    const newBlock = nextBlock(data)
    if(isValidBlock(newBlock,getLastBlock())){
        
        Blocks.push(newBlock);
        return true;
    }
    return false;
}
 

function isValidBlock(currentBlock,previousBlock){
    //검증1.타입(배열인지 객체인지 스트링인지...)
    isValidType(currentBlock);
    return true
}

function isValidType(block){
    //내가 검사할 블럭
    console.log('1111111111')
    console.log(block)
    console.log('111111111111111')

}
// 검증
// 1.타입
// 2.데이터가 잘 갔는지
// 3.데이터에 대한 검증
addBlock(["hello1"]);
addBlock(["hello2"]);
addBlock(["hello3"]);
console.log(Blocks);