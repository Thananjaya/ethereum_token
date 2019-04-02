const Web3 = require('web3');
const truffleProvider = require('truffle-hdwallet-provider');

const compiledTokenContract = require('../build/SangToken.json');
const compiledTokenSaleContract = require('../build/SangTokenSale.json');

const provider = new truffleProvider(
    "open pride vacant cushion soccer shadow eager omit robust soft armed loan",
    "https://rinkeby.infura.io/v3/ffd2deb0df864ae299640e5d442c4eaa"
);
const web3 = new Web3(provider);

const deploy = async () => {
    const initialSupply = 100000;
    const accounts = await web3.eth.getAccounts();
    const deployToken = await new web3.eth.Contract(JSON.parse(compiledTokenContract.interface))
        .deploy({
            data: compiledTokenContract.bytecode, 
            arguments: [initialSupply]
        })
        .send({
            from: accounts[0], 
            gas: '1000000'
        });
    const tokenAddress = deployToken.options.address;
    const deployTokenSale = await new web3.eth.Contract(JSON.parse(compiledTokenSaleContract.interface))
        .deploy({
            data: compiledTokenSaleContract.bytecode,
            arguments: [tokenAddress]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });
}

deploy();

