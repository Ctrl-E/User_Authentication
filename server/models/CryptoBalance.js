const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function getCryptoBalance(network , address) {
try{
  const response = await axios.get(`https://api.blockcypher.com/v1/${network.toLowerCase()}/main/addrs/${address}/balance/`);
      // Assuming the API response structure contains a 'balance' field
      const balance = await response;
      return balance.data.total_received;
      
  } catch (error) {
      console.error('Error fetching cryptocurrency balance:', error.message);
      throw error; // You might want to handle the error appropriately based on your application's needs
  }
}

async function fetchCryptoData(address) {
  try {
      const data = await getCryptoBalance(address);
      console.log(data);
      return data

  } catch (error) {
      console.error('Error:', error.message);
  }
}

module.exports = {
  fetchCryptoData,
  getCryptoBalance
};
