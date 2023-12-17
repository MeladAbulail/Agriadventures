const { Cart, Products } = require("../Models/Tables");

//! Add Product To Cart
// cartController.js

const addProductToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.body.productId;

    // Get product details
    const product = await Products.findOne({
      where: { productId: productId, isDeleted: false },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Check if the product is already in the user's cart
    const existingCartItem = await Cart.findOne({
      where: { userId: userId, productId: productId, isDeleted: false },
    });

    if (existingCartItem) {
      // Update the quantity and total price
      existingCartItem.quantity += 1;
      existingCartItem.totalPrice = existingCartItem.quantity * parseFloat(product.price);

      await existingCartItem.save();
    } else {
      // Add a new item to the cart
      await Cart.create({
        userId: userId,
        productId: productId,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl, 
        productName: product.productName,
        category: product.category
      });
    }

    return res.status(200).json({ success: true, message: "Product added to cart successfully." });
  } catch (error) {
    console.error("An error occurred while adding the product to the cart:", error);
    res.status(500).json({ error: "Failed to add the product to the cart." });
  }
};


//! Soft Delete From Cart
const softDeleteFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId; 

    // Check if the cart item exists
    const cartItem = await Cart.findOne({
      where: { cartId: cartId, isDeleted: false },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    // Perform the soft delete by updating the isDeleted flag
    cartItem.isDeleted = true;

    // Save the changes
    await cartItem.save();

    return res.status(200).json({ success: true, message: "Item deleted from cart successfully." });
  } catch (error) {
    console.error("An error occurred while soft deleting from cart:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//! Soft Delete From Cart According userId
const softDeleteFromCartByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find all cart items for the user that are not soft deleted
    const cartItems = await Cart.findAll({
      where: { userId: userId, isDeleted: false },
    });

    // Check if any cart items are found
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ error: "Cart items not found." });
    }

    // Loop through each cart item and perform the soft delete
    for (const cartItem of cartItems) {
      cartItem.isDeleted = true;
      await cartItem.save();
    }

    return res.status(200).json({ success: true, message: "Items deleted from cart successfully." });
  } catch (error) {
    console.error("An error occurred while soft deleting from cart:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


//! Update Cart Item
const updateCartItem = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    // Check if the cart item exists
    const cartItem = await Cart.findByPk(cartId);

    // Validate the cart item
    if (!cartItem || cartItem.isDeleted) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    // Update quantity
    const { quantity } = req.body;
    console.log(quantity)

    // Validate quantity
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity." });
    }

    cartItem.quantity = quantity;

    // Save the changes
    await cartItem.save();

    // Respond with success message
    return res.status(200).json({ message: "Cart item updated successfully." });

  } catch (error) {
    console.error("An error occurred while updating the cart item:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};



//! Get All Cart Items
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve cart items for the user
    const cartItems = await Cart.findAll({
      where: { userId: userId, isDeleted: false },
      include: [Products], // Assuming there is an association between Cart and Products
    });

    // If there are no cart items, you can return an empty array or a specific message
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ error: "No items found in the cart." });
    }

    // Map the cart items to a format suitable for response
    const formattedCartItems = cartItems.map((cartItem) => {
      return {
        cartItemId: cartItem.cartId, // Assuming you want to return a cartItemId
        productId: cartItem.productId,
        productName: cartItem.Product.productName, // Assuming there is an association between Cart and Products
        price: cartItem.price,
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Cart items retrieved successfully.",
      cartItems: formattedCartItems,
    });
  } catch (error) {
    console.error("An error occurred while getting cart items:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//! Get All Item According UserId
const getCartItemsByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve cart items for the specified user
    const cartItems = await Cart.findAll({
      where: { userId: userId, isDeleted: false },
      order: [['cartId', 'ASC']],
    });

    // If there are no cart items, you can return an empty array or a specific message
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ error: "No items found in the cart for the specified user." });
    }

    // Map the cart items to a format suitable for response
    const cartItemsWithImageUrls = cartItems.map((cartItem) => {
      const plainItem = cartItem.get({ plain: true }); // Use get method to convert to plain object
      return {
        cartId: plainItem.cartId,
        userId: plainItem.userId,
        productId: plainItem.productId,
        price: plainItem.price,
        quantity: plainItem.quantity,
        category: plainItem.category,
        productName: plainItem.productName,
        imageUrl: plainItem.imageUrl, 
      };
    });

    return res.status(200).json({
      success: true,
      message: "Cart items retrieved successfully.",
      cartItems: cartItemsWithImageUrls,
    });
  } catch (error) {
    console.error("An error occurred while getting cart items:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};



module.exports = {
  addProductToCart,
  softDeleteFromCart,
  updateCartItem,
  getCartItems,
  getCartItemsByUserId,
  softDeleteFromCartByUserId
};
