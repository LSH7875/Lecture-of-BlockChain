pragma solidity ^0.8.0;

contract Voting{
    //후보자들 초기화
    string [] public candidateList;
    constructor(string[] memory _candidateNames) public {
        candidateList = _candidateNames;
    }
    //투표기능 만들기
    mapping(string => uint) public voteReceived;
    //uint의 기본값은 0;

    function vodeForCandiodate(string memory _candidate) public{
        voteReceived[_candidate] += 1;
    }

    //각 후보자들의 투표 갯수 알아보기
    //후보자명을 넣어주면 결과값으로 투표갯수를 리턴해주기
    function totalVotesFor(string memory _name) view public returns(uint){
        //여기서 filesystem을 사용할 수 있어서 storage를 사용하면 파일에 저장이 된다. 
        return voteReceived[_name];
    }

    //예외처리 (string 비교-kaccak암호화를 통해서 )
    function validCandidate(string memory _name) view public returns(bool){
        //완전탐색O(n);
        /*javascript code
            voteReceived.forEach(v=>{
                if(keccak256(v.key)===keccak256(_name)){
                    return true;
                }
            })
        return false;
        */
        //keccak256() string 안들어가고 byte로 들어간다. 
        //그래서 string 을 byte값으로 변환한다.
        //keccake256() 메소드 안에 byte값을 넣는다. 
        for(uint i = 0; i<candidateList.length; i++){
            if(keccak256(bytes(candidateList[i]))== keccak256(bytes(_name))) return true;
        }

        return false;
    }
}