const knex = require("knex")(require("../knexfile"));

//get all brands
const index = async (_req, res) => {
  try {
    const data = await knex("brands");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving brands:${err}`);
  }
};

// get a single brand
const findOne = async (req, res) => {
  try {
    const brandFound = await knex("brands").where({
      id: req.params.id,
    });
    if (brandFound.length === 0) {
      return res.status(404).json({
        message: `Brand with ID ${req.params.id} not found`,
      });
    }

    const brandsData = brandFound[0];
    res.status(200).json(brandsData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve brand data for brand with ID ${req.params.id}`,
    });
  }
};

module.exports = {
  index,
  findOne,
};
