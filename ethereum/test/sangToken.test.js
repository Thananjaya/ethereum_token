const assert = require('assert');
const Web3 = require('web3');
const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile/compile');

let accounts;
let sangToken;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    sangToken = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({
            from: accounts[0],
            gas: '1000000'
        });
});

describe('test cases for SangToken ERC 20 token', () => {
    it('testing whether the contract been deployed', () => {
        assert.ok(sangToken.options.address)
    });
});

