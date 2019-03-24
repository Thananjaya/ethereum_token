pragma solidity^0.4.17;

contract SangToken {
    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    constructor(uint initialSupply) public {
        balanceOf[msg.sender] = initialSupply;
        totalSupply = initialSupply;
    }
}