pragma solidity^0.4.17;

contract SangToken {
    uint public totalSupply;
    string public name = 'Sang Token';
    string public symbol = 'SANG';
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    modifier valueCheck(uint _value){
        require(balanceOf[msg.sender] >= _value);
        _;
    }

    constructor(uint initialSupply) public {
        balanceOf[msg.sender] = initialSupply;
        totalSupply = initialSupply;
    }

    function transfer(address _to, uint _value) public valueCheck(_value) returns(bool success) {
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public valueCheck(_value) returns(bool success) {
        allowance[msg.sender][_spender] = _value; 
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns(bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }
}