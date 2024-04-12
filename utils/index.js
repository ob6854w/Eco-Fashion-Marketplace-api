const {
  SCRAPE_API_BASE_URL,
  SCRAPE_API_CATEGORY_LIST,
} = require("../constants");
const axios = require("axios");

exports.initialCountObj = (minId, maxId) => {
  const countObj = {};

  for (let id = minId; id <= maxId; id++) {
    countObj[id] = 0;
  }

  return countObj;
};

const getRandomArrayIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};
exports.getRandomArrayIndex = getRandomArrayIndex;

exports.fetchScrapeAPIResource = async (path, responseDataKey) => {
  const { data } = await axios.get(`${SCRAPE_API_BASE_URL}${path}`);

  return data[responseDataKey];
};

// Recursive function to get a random key from an object
const getCountedId = (obj_counted, maxCount) => {
  const key_countedId_random =
    Object.keys(obj_counted)[
      getRandomArrayIndex(Object.keys(obj_counted))
    ];

  if (obj_counted[key_countedId_random] >= maxCount) {
    return getCountedId(obj_counted); // Recursive case
  }

  obj_counted[key_countedId_random] += 1;
  return key_countedId_random; // Base case
};
exports.getCountedId = getCountedId;
