const { Cart, Products } = require("../Models/Tables");
const multer = require('multer');
const path = require('path');

// Storage Image By Multer Start
let lastFileSequence = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'activitieImages');
  },
  filename: (req, file, cb) => {
    lastFileSequence++;
    const newFileName = `${Date.now()}_${lastFileSequence}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const addImage = multer({ storage: storage });
const imageItem = addImage.single('image');

//! Add Product To Cart
const addProductToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.productId;

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
      const newCartItem = await Cart.create({
        userId: userId,
        productId: productId,
        price: product.price,
        quantity: 1,
        totalPrice: parseFloat(product.price),
      });
    }

    return res.status(200).json({ success: true, message: "Product added to cart successfully." });
  } catch (error) {
    console.error("An error occurred while adding product to cart:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//! Soft Delete From Cart
const softDeleteFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItemId = req.params.cartItemId; // Assuming you have a parameter for the cart item ID

    // Check if the cart item exists
    const cartItem = await Cart.findOne({
      where: { userId: userId, cartId: cartItemId, isDeleted: false },
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

//! Update Cart Item
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItemId = req.params.cartItemId; // Assuming you have a parameter for the cart item ID

    // Check if the cart item exists
    const cartItem = await Cart.findOne({
      where: { userId: userId, cartId: cartItemId, isDeleted: false },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    // Update quantity and total price based on the request body
    const { quantity } = req.body;

    if (quantity && typeof quantity === "number" && quantity > 0) {
      cartItem.quantity = quantity;
      cartItem.totalPrice = quantity * parseFloat(cartItem.price);

      // Save the changes
      await cartItem.save();

      return res.status(200).json({ success: true, message: "Cart item updated successfully." });
    } else {
      return res.status(400).json({ error: "Invalid quantity value." });
    }
  } catch (error) {
    console.error("An error occurred while updating the cart item:", error);
    res.status(500).json({ error: "Internal server error." });
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
    const userId = req.params.userId;

    // Retrieve cart items for the specified user
    const cartItems = await Cart.findAll({
      where: { userId: userId, isDeleted: false },
      include: [Products], // Assuming there is an association between Cart and Products
    });

    // If there are no cart items, you can return an empty array or a specific message
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ error: "No items found in the cart for the specified user." });
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

module.exports = {
  getCartItemsByUserId,
};



module.exports = {
  addProductToCart,
  softDeleteFromCart,
  updateCartItem,
  getCartItems,
  getCartItemsByUserId
};
