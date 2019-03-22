const solc = require('solc');
const path = require('path');
const fs = require('fs-extra');

const contractPath = path.resolve(__dirname, '../contracts', 'SangToken.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const compiledContract = solc.compile(source, 1);

module.exports = compiledContract.contracts[':SangToken'];

