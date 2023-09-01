import axios from 'axios';

export const getAllCoins = (currency) =>
  axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
  );
