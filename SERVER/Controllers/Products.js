const { Products } = require('../Models/Tables');

//! Add New Product Start
const addProduct = async (req, res) => {
  try {
    const { productName, description, price, category, owner, phone, email } = req.body;
    const imageUrl = res.locals.site;

    const newProduct = await Products.create({
      productName,
      description,
      price,
      imageUrl,
      category,
      owner,
      phone,
      email
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
      const newImageName = res.locals.site;
      existingProduct.imageUrl = newImageName;
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
    const productId = req.params.productId;

    //! Check if the product exists
    const existingProduct = await Products.findByPk(productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    //! Soft delete the Product_images
    await Products.update(
      { isDeleted: true },
      {
        where: { ViewThePlace: false, isDeleted: false }
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
        isDeleted: false, ViewThePlace: true
      },
    });

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products: products,
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
      const product = await Products.findByPk(productId);

      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        product: product,
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

//! Get All Products Accourding ViewTheProduct
const getProductsByViewThePlace = async (req, res) => {
  const products = await Products.findAll({
    where: {
      ViewThePlace: false, isDeleted: false
    }
  })

  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Not Products Found",
    });
  } else {

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products: products
    });
  }
}

//! Update View The Product
const viewTheProduct = async (req, res) => {
  try {
    const productId = req.params.productId; 

    //! Check if the Product exists
    const product = await Products.findByPk(productId);

    if (!productId) {
      return res.status(404).json({
        success: false,
        message: 'productId not found',
      });
    }

    //! Soft delete the Product
    await Products.update(
      { ViewThePlace: true },
      { where: { productId: productId } }
    );

    //! Save the changes
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product soft deleted successfully',
      product: product.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while soft deleting the Product:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting the Product',
      error: error.message,
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  viewTheProduct,
  getProductsByViewThePlace
}


