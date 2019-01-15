class block {
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
    ).toString;
  }

  mineBlock(difficulty) {}
}
