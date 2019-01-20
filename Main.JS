// ? Utilizes SHA256 hash function from crypto.JS
const SHA256 = require('crypto-js/sha256');

// * =================================== Creation of Transaction =====================================
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

// * ====================================== Creation of Block ========================================
class Block {
    constructor(timestamp, transaction, previousHash = '') {
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(
            this.index +
                this.timestamp +
                this.previousHash +
                JSON.stringify(this.data) +
                this.nonce
        ).toString();
    }

    // Prevents spam
    mineBlock(difficulty) {
        // Makes a string of zeros exactly the same length of the difficulty
        while (
            this.hash.substring(0, difficulty) !==
            Array(difficulty + 1).join('0')
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined: ' + this.hash);
    }
}

// * ================================= Creation of Blockchain =====================================
class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
        this.difficulty = 2;
        this.pendingTransaction = [];
        this.miningReward = 100;
    }

    // First block in the blockchain
    createGenesis() {
        return new Block('01/15/19', 'Genesis Block', 0);
    }

    // Returns newest block
    latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransaction(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransaction);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined! 😋');
        this.chain.push(block);

        this.pendingTransaction = [
            // Reset pending transaction
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransaction.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transaction) {
                // Money going out of account
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                // Money going into account
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    // Ensures blocks in the chain has not been tampered with
    checkValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const CURRENT_BLOCK = this.chain[i];
            const PREVIOUS_BLOCK = this.chain[i - 1];

            if (CURRENT_BLOCK.hash !== CURRENT_BLOCK.calculateHash()) {
                return false;
            }

            if (CURRENT_BLOCK.previousHash !== PREVIOUS_BLOCK.hash) {
                return false;
            }
        }
        return true;
    }
}

// ! Tests Blockchain
let samCoin = new Blockchain();
samCoin.createTransaction(new Transaction('address1', 'address2', 100));
samCoin.createTransaction(new Transaction('address2', 'address1', 50));

// Transactions will then be pending, miner would need to make block...

console.log('\n Miner will mine!');
samCoin.minePendingTransaction('Miner Address');

console.log('\n My balance is ', samCoin.getBalanceOfAddress('Miner Address'));
// Mining reward is sent to pending, will only enter balance once a new block is mined

console.log('\n Miner will mine!');
samCoin.minePendingTransaction('Miner Address');
console.log('\n My balance is ', samCoin.getBalanceOfAddress('Miner Address'));
