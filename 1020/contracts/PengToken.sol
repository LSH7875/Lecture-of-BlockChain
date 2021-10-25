// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import '../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol';
import '../node_modules/openzeppelin-solidity/contracts/security/Pausable.sol';


contract PengToken is ERC20,Ownable,Pausable{
  string public _name = "PENG TOKEN";
  string public _symbol = "PENG";
  // uint256 public _decimals = 18; 함수여서 그냥 갖다 쓰기만 하면 된다. 
  uint256 public _totalSupply =1000 * (10**uint256(decimals()));//형변환한다. 
  string _text = "hello world!";
//_ 붙이는 이유 ERC20.sol에서 함수명을 똑같이 쓰고 있어서 ㅎㅎㅎ
  constructor() ERC20(_name,_symbol) {
    _mint(msg.sender,_totalSupply);
  //토큰 생성 끝
  
  }
  function pause() public onlyOwner{
    _pause();
  }

  function unpause() public onlyOwner{
    _unpause();
  }


}
