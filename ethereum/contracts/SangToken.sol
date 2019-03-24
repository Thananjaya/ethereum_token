pragma solidity^0.4.17;

contract SangToken {
    uint public totalSupply;
    string public name = 'Sang Token';
    string public symbol = 'SANG';
    mapping(address => uint) public balanceOf;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    constructor(uint initialSupply) public {
        balanceOf[msg.sender] = initialSupply;
        totalSupply = initialSupply;
    }

    function transfer(address _to, uint _value) public returns(bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}