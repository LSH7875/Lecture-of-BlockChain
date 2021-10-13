/*가나시 연결을 해야 한다. */

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//node.js가 아니고 javascript연결때 이렇게 사용한다. 
const ABI=JSON.parse(`[{"inputs":[{"internalType":"string[]","name":"_candidateNames","type":"string[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"totalVotesFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"vodeForCandiodate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"voteReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`);
const deployAddress=`0xf70931b2415b7cfce985aee2e422a5e167ef4a5b`;

let candidates={"ingoo1":"candidate1","ingoo2":"candidate2","ingoo3":"candidate3"};
let VotingContract = new web3.eth.Contract(ABI,deployAddress);

window.addEventListener('DOMContentLoaded',init);
async function init(){
    let candidateNames = Object.keys(candidates);
    for(let i=0;i<candidateNames.length;i++){
        let name = candidateNames[i];//ingoo1
        candidates[name]//candidate1
        const nameElement = document.querySelector(`#${candidates[name]}`);
        nameElement.innerHTML=name;
        
        const countElement=document.querySelector(`#candidateCount${i+1}`);
        countElement.innerHTML=await VotingContract.methods.totalVotesFor(`ingoo${i+1}`).call();
    }
    // console.log('hello world!');
    // await VotingContract.methods.vodeForCandiodate('ingoo1').send({from:'0x7fB9085d9D321106fb9De9Dd95ef0A8776599beA'});
    // VotingContract.methods.totalVotesFor('ingoo1').call().then(data=>{
    //     console.log(data);
    // })
}

const btn = document.querySelector("#btn");
btn.addEventListener('click',btnEvent);

async function btnEvent(){
    let candidateName = document.querySelector(`#candidateName`).value;
    await VotingContract.methods. vodeForCandiodate(candidateName).send({from:'0x7fB9085d9D321106fb9De9Dd95ef0A8776599beA'})

    let candidateCount = await VotingContract.methods.totalVotesFor(candidateName).call();
    let number = candidateName.charAt(candidateName.length-1)
    let countElement = document.querySelector(`#candidateCount${number}`);
    countElement.innerHTML = candidateCount;


}