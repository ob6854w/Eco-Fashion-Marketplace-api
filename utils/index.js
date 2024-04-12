const { SCRAPE_API_BASE_URL, SCRAPE_API_CATEGORY_LIST } = require('../constants');
const axios = require('axios');

exports.initialBrandsCount = () => {
  const brandsCount = {};

  for (let brandId = 1; brandId <= 10; brandId++) {
    brandsCount[brandId] = 0;
  }

  return brandsCount;
};

exports.getRandomArrayIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

exports.fetchScrapeAPIResource = async (path, responseDataKey) => {
  const { data } = await axios.get(`${SCRAPE_API_BASE_URL}${path}`);

  return data[responseDataKey];
};
