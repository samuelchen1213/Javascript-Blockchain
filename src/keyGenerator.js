// Public and private key generator
const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // Bitcoin Wallet Algorithm

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log('Private Key:\n', privateKey);

console.log('Public Key:\n', publicKey);
