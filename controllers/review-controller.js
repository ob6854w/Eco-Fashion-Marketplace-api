const knex = require("knex")(require("../knexfile"));

exports.getAllReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required in the request params",
      });
    }

    const productReviews = await knex("reviews").where({
      product_id: productId,
    });

    res.status(200).json(productReviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};