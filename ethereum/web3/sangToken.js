import web3 from './web3';

const compiledTokenContract = require('../build/SangToken.json');

const instance = new web3.eth.Contract(
    JSON.parse(compiledTokenContract.interface),
    "0xB3c4010BE41e1261EEC7eDb40d43Be99f1d57b0a"
);
export default instance;
