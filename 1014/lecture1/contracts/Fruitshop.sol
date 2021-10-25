// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
  //1. 보낸 사람의 계정주소에서 사과를 총 몇개 가지고 있는가.
  //2. 사과를 구매했을 시, 해당 계정주소에 사과를 추가해주는 코드를 작성
  //3. 사과를 판매시 내가 가지고 있는 (사과 * 사과구매가격)만큼 토큰을 반환해주고, 사과를 0개로 바꿔준다.  
contract Fruitshop {
  //사과를 몇개 가지고 있는가.
  mapping(address=>uint) myApple;

  
  constructor() public {

  }

  function buyApple() payable public {
    myApple[msg.sender]++;
  //msg.sender요청한 사람의 주소값이 들어가있음
  
  }

  function sellApple(uint _applePrice) payable public {
    uint tatalPrice = myApple[msg.sender]*_applePrice;
    myApple[msg.sender] = 0;
    msg.sender.transfer(tatalPrice);//환불에 가깝다//얘는 비쥬얼스튜디오가 8이고 트러플은 5여서 문제가 일어나는 것임
  }

  function getMyApple() public view returns(uint){
    return myApple[msg.sender];
  }
}


//truffle --version