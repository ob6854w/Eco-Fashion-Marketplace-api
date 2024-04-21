const knex = require("knex")(require("../knexfile"));

exports.getAllCartItemsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required in the request params",
      });
    }

    const userCartItems = await knex("carts").where({
      user_id: userId,
    })
    .select("carts.id","carts.quantity","carts.user_id", "carts.product_id", "products.name", "products.price", "products.image_url")
    .innerJoin("products", "carts.product_id", "products.id");

    res.status(200).json(userCartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity, isIncreament } = req.body;

    // Throw an error if `userId` OR `productId` is NOT passed in the request body
    if (userId === undefined || productId === undefined) {
      return res.status(400).json({
        message: "`userId`, and `productId` are required in the request body",
      });
    }

    // Throw an error if both `quantity` AND `isIncreament` is NOT passed in the request body
    if (quantity === undefined && isIncreament === undefined) {
      return res.status(400).json({
        message: "Either `quantity` or `isIncreament` is required",
      });
    }

    // Throw an error if `quantity` is passed in the request body BUT it's not a number or a postive number
    if (
      quantity !== undefined &&
      (typeof quantity !== "number" || quantity <= 0)
    ) {
      return res.status(400).json({
        message: "`quantity` must be a boolean or a postive number",
      });
    }

    // Throw an error if `isIncreament` is passed in the request body BUT it's not a boolean
    if (isIncreament !== undefined && typeof isIncreament !== "boolean") {
      return res.status(400).json({
        message: "`isIncreament` must be a boolean",
      });
    }

    const existingUserCartItem = (await knex("carts").where({
      user_id: userId,
      product_id: productId,
    }))[0];

    if (existingUserCartItem) {
      let localQuantityVar;

      if (quantity) {
        localQuantityVar = quantity;
      } else {
        localQuantityVar =
          isIncreament === false
            ? existingUserCartItem.quantity - 1
            : existingUserCartItem.quantity + 1;
      }

      await knex("carts")
        .where({
          id: existingUserCartItem.id,
        })
        .update({
          quantity: localQuantityVar
        });

      return res.status(200).json({
        message: "Cart item updated successfully",
      });
    }

    await knex("carts").insert({
      user_id: userId,
      product_id: productId,
      quantity: quantity,
    });

    res.status(201).json({
      message: "Cart item added successfully",
    });
  } catch (error) {
    if (error.message.includes("FOREIGN KEY (`product_id`)")) {
      return res.status(400).json({
        message: "`productId` is invalid or does not exist",
      });
    }

    if (error.message.includes("FOREIGN KEY (`user_id`)")) {
      return res.status(400).json({
        message: "`userId` is invalid or does not exist",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.deleteCartItem = async (req, res) => { 
  const { id } = req.params;
 
  if (!id) {
    return res.status(400).json({
      message: "Cart Item ID is required in the request params",
    });
  }

  const existingCartItem = (await knex("carts").where({ id }))[0];

  if (!existingCartItem) {
    return res.status(404).json({
      message: "Cart item does not exist",
    });
  }

  await knex("carts").where({ id }).delete();

  res.status(200).json({
    message: "Cart item deleted successfully",
  });
}
