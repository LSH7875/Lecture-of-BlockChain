pragma solidity ^0.8.0;

contract hello {
    string value;//전역변수임.
    constructor(){
        value = "hello world";
    }
    function get() public view returns (string memory){
        /* string memory
        version up되면서 생긴 문법
        returns에서 파일 시스템 파일에 저장된 내용을 가져올거냐(storage) 
        메모리에 저장된 내용을 가져올건지(memory)*/
        return value;
    }

}