const { Blockchain, Transaction } = require('./blockchain');

// ! Tests Blockchain
let samCoin = new Blockchain();
samCoin.createTransaction(new Transaction('address1', 'address2', 100));
samCoin.createTransaction(new Transaction('address2', 'address1', 34));

// Transactions will then be pending, miner would need to make block...

console.log('\n Miner will mine!');
samCoin.minePendingTransaction('Miner Address');

console.log('\n My balance is ', samCoin.getBalanceOfAddress('Miner Address'));
// Mining reward is sent to pending, will only enter balance once a new block is mined

console.log('\n Miner will mine!');
samCoin.minePendingTransaction('Miner Address');
console.log('\n My balance is ', samCoin.getBalanceOfAddress('Miner Address'));
