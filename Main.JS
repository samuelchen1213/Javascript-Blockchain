const SHA256 = require('crypto-js/sha256');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()];
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
    newBlock.hash = newBlock.calculateHash();
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

class Block {
  constructor(timestamp, data) {
    this.index = 0; // Where in the chain it is located
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = 0;
    this.hash = this.calculateHash();
    this.nonce = 0; // Used for mining mechanism in the blockchain
  }

  // calculateHash() takes every piece of data from the block, therefore tampering would result in different hash
  calculateHash() {
    return SHA256(
      // Utilizes SHA256 hash function from crypto.JS
      this.index + this.timestamp + this.data + this.nonce + this.previousHash
    ).toString();
  }

  mineBlock(difficulty) {}
}

// Test Blockchain
let jsChain = new Blockchain();
jsChain.addBlock(new Block('12/25/2017', { amount: 5 }));
jsChain.addBlock(new Block('12/26/2017', { amount: 10 }));

console.log(JSON.stringify(jsChain, null, 4));
console.log('Is blockchain valid? ' + jsChain.checkValid());
