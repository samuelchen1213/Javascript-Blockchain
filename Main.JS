// ? Utilizes SHA256 hash function from crypto.JS
const SHA256 = require('crypto-js/sha256');

// * -------------------------------------- Creation of Block ---------------------------------------
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index; // Where in the chain it is located
        this.timestamp = timestamp;
        this.data = data;
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

// * --------------------------------- Creation of Blockchain ---------------------------------------
class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
        this.difficulty = 4;
    }

    // First block in the blockchain
    createGenesis() {
        return new Block(0, '01/15/19', 'Genesis Block', 0);
    }

    // Returns newest block
    latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Adds a new block to the chain
    addBlock(newBlock) {
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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
let SamCoin = new Blockchain();

console.log('Mining Block 1...');
SamCoin.addBlock(new Block(1, '1/15/2019', { amount: 5 }));
console.log('Mining Block 2...');
SamCoin.addBlock(new Block(2, '1/16/2019', { amount: 11 }));
