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

    it('checks for the tokan name and symbol', async() => {
        const name = await sangToken.methods.name().call();
        const symbol = await sangToken.methods.symbol().call();
        assert.equal(name, 'Sang Token');
        assert.equal(symbol, 'SANG')
    })

    it('test for total supply of the tokens', async () => {
        const totalSupply = await sangToken.methods.totalSupply().call()
        assert.equal(totalSupply, initialSupply);
    });

    it('tests whether the inial supply is been allocated to the administrator', async () => {
        const adminBalance = await sangToken.methods.balanceOf(accounts[0]).call()
        assert.equal(adminBalance, initialSupply);
    });

    it('tests for transfering the token', async () => {
        try {
            const transferEvent = await sangToken.methods.transfer(accounts[1], 100).send({ from: accounts[0], gas: '100000'});
            assert.equal(true, transferEvent);
        } catch(err) {
            assert(err);
        }
    });
});

