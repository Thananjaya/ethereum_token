const solc = require('solc');
const path = require('path');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, '../build');
fs.removeSync(buildPath)

const contractPath = path.resolve(__dirname, '../contracts', 'SangToken.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const compiledContract = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in compiledContract) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        compiledContract[contract]
    )
}


