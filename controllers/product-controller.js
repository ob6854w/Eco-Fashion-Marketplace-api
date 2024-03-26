const knex = require("knex")(require("../knexfile"));

//get all products
const index = async (_req, res) => {
  try {
    const data = await knex("products");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving products:${err}`);
  }
};

// get a single product
const findOne = async (req, res) => {
  try {
    const productFound = await knex("products").where({
      id: req.params.id,
    });
    if (productFound.length === 0) {
      return res.status(404).json({
        message: `Product with ID ${req.params.id} not found`,
      });
    }

    const productData = productFound[0];
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve product data for product with ID ${req.params.id}`,
    });
  }
};

module.exports = {
  index,
  findOne,
};
