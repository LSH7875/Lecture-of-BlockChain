// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloToken {
  constructor() public {
  }

  function helo() public view returns(string memory){
      return "hello";
  }
}
