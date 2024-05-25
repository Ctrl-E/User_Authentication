var CoinKey = require("coinkey");
const SHA256 = require("crypto-js/sha256");

function calculateSHA256(input) {
  const hash = SHA256(input);
  return hash.toString();
}

function generateAddress(key) {
  try {
    const privateKeyHex = calculateSHA256(key);
    var btc = new CoinKey(new Buffer.from(privateKeyHex, "hex"));
    var ltc = new CoinKey(new Buffer.from(privateKeyHex, "hex"), {
      private: 0xb0,
      public: 0x30,
    });
    return [ltc.publicAddress, btc.publicAddress, privateKeyHex];
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = {
  generateAddress,
};
