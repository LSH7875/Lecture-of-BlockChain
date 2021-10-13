const Web3 = require('web3');
const fs = require('fs');

const ABI = JSON.parse(fs.readFileSync('./Voting_sol_Voting.abi').toString());
const BYTECODE=fs.readFileSync('./Voting_sol_Voting.bin').toString();

const web3= new Web3('http://127.0.0.1:8545');

const deployContract = new web3.eth.Contract(ABI);
//블록을 생성할 때 컴파일한 abi를 컴파일에 넣었다.

// deployContract.deploy({
//     //배포를 할 때 컴파일한 byte값을 넣음
//     data:BYTECODE,
//     arguments:[['ingoo1','ingoo2','ingoo3'].map(name=>web3.utils.asciiToHex(name))]
//     //원래 string값을 못씀 16진수로 바꾸어야 함.
//     //{}가 없으면 return 값을 생략해줄 수 있다!

// })//배포를 할 때 생성자를 넣어주는 것임. sol안에 생성자를 넣어주느 것이 아니다. 
// .send({//어느 주소에서 transaction을 발생시킬겨냐=>ganache의 하나의 주소값을 사용한다. 
//     from:'0x7fB9085d9D321106fb9De9Dd95ef0A8776599beA',
//     gas:'6721975',
// })//결과값이 프로미스로 떨어져서 then으로 받았다.
// .then(newContract=>{
//     console.log(newContract.options.address);
// })
//원래 이런 작업들이 truffle 프레임워크를 이용해서 할 수 있다.
// 
/*
['ingoo1','ingoo2','ingoo3'].map(name=>{
    return web3.utils.asciiToHex(name);
})
*/

//해당 블록주소에 접속해야 한다. 내 contract는 그 주소에 있으니까
const contract=new web3.eth.Contract(ABI, '0xf70931b2415b7cfce985aee2e422a5e167ef4a5b');

contract.methods.totalVotesFor('ingoo1').call().then(data=>{
    console.log(data);
})//call을 써야지만 promise객체로 실행한다. 

contract.methods.vodeForCandiodate('ingoo1').send({from:'0x7fB9085d9D321106fb9De9Dd95ef0A8776599beA'});
//투표하는 메소드에 넣는  from 값은 처음 생성한 계정의 주소값을 넣어주면 된다. 
//투표하는 사람이다. 10개의 계정중에 아무거나 넣어도 상관이 없다.