import web3 from './web3';

const compiledTokenSaleContract = require('../build/SangTokenSale.json');

const instance = new web3.eth.Contract(
    JSON.parse(compiledTokenSaleContract.interface),
    "0x862e3A6475BA52aE478A04E0B7a4E8Baf394f1f4"
);
export default instance;
