// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;


  //이벤트를 만든다. 웹소켓 코드를 써준다고 생각하면 편하다.
  event Change(string message, uint newVal); //이벤트의 선언

  function set(uint x) public {
    storedData = x;
    emit Change("set",x);
  }

  function get() public view returns (uint) {
    return storedData;
  }
}