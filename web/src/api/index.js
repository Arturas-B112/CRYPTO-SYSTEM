import axios from 'axios';

export const getAllCoins = (currency) =>
  axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
  );

export const getTrendingCoins = (currency) =>
  axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
  );

export const getSingleCoin = (id) =>
  axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);

export const getSingleCoinHistory = (id, days = 365, currency) =>
  axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  );

export const postUserSelectedCoin = (body) =>
  axios.post('http://localhost:8080/selected', body);

export const postUserSearchedCoin = (body) =>
  axios.post('http://localhost:8080/searched', body);
