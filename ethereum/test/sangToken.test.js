const assert = require('assert');
const Web3 = require('web3');
const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());
const compiledContract = require('../build/SangToken.json'); 

let accounts;
let sangToken;
const initialSupply = 100000;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    sangToken = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
        .deploy({
            data: compiledContract.bytecode,
            arguments: [initialSupply]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });
});

describe('test cases for SangToken ERC 20 token', () => {
    it('testing whether the contract been deployed', () => {
        assert.ok(sangToken.options.address)
    });

    it('test for total supply of the tokens', async () => {
        const totalSupply = await sangToken.methods.totalSupply().call()
        assert.equal(totalSupply, initialSupply);
    });

    it('tests whether the inial supply is been allocated to the administrator', async () => {
        const adminBalance = await sangToken.methods.balanceOf(accounts[0]).call()
        assert.equal(adminBalance, initialSupply);
    });
});

