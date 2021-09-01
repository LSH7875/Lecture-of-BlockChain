//npm i merkletreejs crypto-js

const {MerkleTree} = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');
//노란색: 함수 초록색:클래스
console.log('여기서붙어시작임')
console.log(SHA256('ab').toString())
console.log(SHA256('내가 암호화할 텍스트값임').toString());

const testSet =['a','b','c','c'];'철수철수'
const testArray = testSet.map((v)=>SHA256(v))
console.log('과연 같은값이 있다면?')
console.log(testArray);


const tree = new MerkleTree(testArray,SHA256);

console.log('-----------tree-------------');
console.log(tree);//2가지 인자값을 받는다. 내가 만들었던 암호화할 변수들

//최상위 노드를 가져오는 method
const root = tree.getRoot();
console.log('////////////root//////////////')
console.log(root.toString('hex'));//hex로 해야지 알 수 있다. 그래서 

//검증하는 것
const testRoot = 'a'
const leaf = SHA256(testRoot)
const proof = tree.getProof(leaf);//tree안에서 이 값이 있는지 없는지 검증한다.
console.log('---------검증과정----------')
console.log(tree.verify(proof,leaf,root));
console.log(tree.verify(tree.getProof(leaf),SHA256('a'),tree.getRoot()));
console.log(tree.toString());


const merkle = require('merkle');
const CryptoJs = require('crypto-js');

/* 사용법 */
const tree2 = merkle("sha256").sync(['aaaa','ffffff'])//배열만 되는데, 배열 안의 객체를 넣는 것도 가능하다. tree구조로 만들어준다.
console.log('---------------tree2------------')
console.log(tree2.root());



///1차 목표는 제네시스 블럭을 만드는 것

class BlockHeader {
    constructor(version,index,previousHash,timestamp,merkleRoot){//header를 만들 인잣값들
        this.version = version//1{version:1}
        this.index = index
        this.previousHash = previousHash
        this.timestamp = timestamp 
        this.merkleRoot = merkleRoot

    }

}

const header = new BlockHeader(1,2,3,4,5);
const header2 = new BlockHeader(1,9,3,4,5);
console.log('--------header````````````')
console.log(header);


class Block{
    constructor(header,body){
        this.header = header
        this.body = body
    }
}

// const blockchain = new Block(new BlockHeader(1,2,3,4,5),['hello'])
// console.log("--------block----------")
// console.log(blockchain);


////제네시스 블럭을 만드는 함수를 만들 것임

