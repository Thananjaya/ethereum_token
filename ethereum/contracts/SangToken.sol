pragma solidity^0.4.17;

contract SangToken {
    uint public totalSupply;
    address public owner;
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
        require(balanceOf[owner] >= _value);
        _;
    }

    constructor(uint initialSupply) public {
        owner = msg.sender;
        balanceOf[owner] = initialSupply;
        totalSupply = initialSupply;
    }

    function transfer(address _to, uint _value) public valueCheck(_value) returns(bool success) {
        balanceOf[owner] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(owner, _to, _value);
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

contract SangTokenSale {
    SangToken public sangToken;
    uint public tokensForSale;
    uint public tokenPrice;
    uint public tokensSold;
    address public admin;

    constructor(address tokenAddress) public {
        sangToken = SangToken(tokenAddress);
        admin = msg.sender;
    }

    modifier adminAccess() {
        require(msg.sender == admin);
        _;
    }

    event Sell(
        address indexed sender,
        uint tokens
    );

    function setTokenPrice(uint price) public adminAccess {
        tokenPrice = price;
    }

    function setNumberOfTokensForSale (uint totalTokensForSale) public adminAccess {
        require(totalTokensForSale <= sangToken.totalSupply());
        require(sangToken.transfer(admin, totalTokensForSale));
        tokensForSale += totalTokensForSale;
    }

    function buyTokens(uint totalTokens) public payable {
        require(totalTokens <= tokensForSale);
        require(msg.value >= totalTokens * tokenPrice);
        require(sangToken.transfer(msg.sender, totalTokens));

        emit Sell(msg.sender, totalTokens);

        tokensSold += totalTokens;
        tokensForSale -= totalTokens;
    }

    function endTokenSale() public adminAccess {
        require(sangToken.transfer(admin, tokensForSale));

        selfdestruct(admin);
    }
}