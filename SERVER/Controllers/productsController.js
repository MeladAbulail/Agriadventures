const { Products } = require('../Models/Tables');
const multer = require("multer");
const path = require("path");

//! Storage Image By Multer Start
let lastFileSequence = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "productsImages");
  },
  filename: (req, file, cb) => {
    lastFileSequence++;
    const newFileName = `${Date.now()}_${lastFileSequence}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  }
});

const addImage = multer({ storage: storage });
const imageProduct = addImage.single("image");


//! Add New Product Start
const addProduct = async (req, res) => {
  try {
    const { productName, description, price } = req.body;
    const imageProductName = req.file.filename;

    const newProduct = await Products.create({
      productName,
      description,
      price,
      imageProductName,
    });

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: newProduct.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while adding the product:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the product',
      error: error.message,
    });
  }
}


//! Update Product Start
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params; 
    const { productName, description, price } = req.body;

    //! Check if the product exists
    const existingProduct = await Products.findByPk(productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    //! Update the product details
    existingProduct.productName = productName;
    existingProduct.description = description;
    existingProduct.price = price;

    //! Check if a new image is uploaded
    if (req.file) {
      const newImageName = req.file.filename;
      existingProduct.imageProductName = newImageName;
    }

    //! Save the changes
    await existingProduct.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: existingProduct.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while updating the product:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the product',
      error: error.message,
    });
  }
}


//! Delete Product By Id Start
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    //! Check if the product exists
    const existingProduct = await Products.findByPk(productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    //! Soft delete the location_images
    await Products.update(
      { isDeleted: true },
      {
        where: { productId: productId },
      }
    );

    //! Save the changes
    await existingProduct.save();

    res.status(200).json({
      success: true,
      message: 'Product soft deleted successfully',
      product: existingProduct.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while soft deleting the product:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting the product',
      error: error.message,
    });
  }
}


const getProducts = async (req, res) => {
  try {
    //! Retrieve only products that haven't been soft deleted
    const products = await Products.findAll({
      where: {
        isDeleted: false,
      },
    });

    //! Map through the products to construct the image_url for each product
    const productsWithImageUrls = products.map(product => ({
      ...product.toJSON(),
      image_url: `http://localhost:4000/productsImages/${product.imageProductName}`,
    }));

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products: productsWithImageUrls,
    });
  } catch (error) {
    console.error('An error occurred while fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching products',
      error: error.message,
    });
  }
}


const getProductById = async (req, res) => {
  const productId = req.params.productId; 
  try {

    //! Check If Product Existing
    const existingProduct = await Products.findOne({ where: { productId: productId } });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    } else {
      const image_url = `http://localhost:4000/productsImages/${existingProduct.imageProductName}`;
      const product = await Products.findByPk(productId);

      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        product: {
          ...product.toJSON(),
          image_url: image_url,
        },
      });
    }
  } catch (error) {
    console.error('An Error Occurred While Fetching Product:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Product',
      error: error.message,
    });
  }
};


module.exports = {
  addProduct,
  imageProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById
}

