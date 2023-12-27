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
        where: { productId: productId }
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

//! get Products Pagination
const getProductsPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 5;

    const products = await Products.findAll({
      where: {
        isDeleted: false,
        ViewTheProduct: true,
      },
      order: [['productId', 'ASC']],
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
    });

    const totalItems = await Products.count({
      where: {
        isDeleted: false,
        ViewTheProduct: true,
      },
    });

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      products,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('An error occurred while fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching products',
      error: error.message,
    });
  }
};



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
const getAllProducts = async (req, res) => {
  const products = await Products.findAll({
    where: {
      isDeleted: false
    },
    order: [['createdAt', 'ASC']],
  })

  const productsConfirm = await Products.findAll({
    where: {
      isDeleted: false,
      ViewTheProduct: true
    },
    order: [['createdAt', 'ASC']],
  }); 

  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Not Products Found",
    });
  } else {

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products: products,
      productsConfirm: productsConfirm.map(product => product.productId),
    });
  }
}

//! Get All Products Accourding ViewTheProduct
const getAllProductsForHomePage = async (req, res) => {
  const products = await Products.findAll({
    where: {
      isDeleted: false, ViewTheProduct: true
    },
    order: [['createdAt', 'ASC']],
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
      products: products,
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
      { ViewTheProduct: true },
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

//! Update View The Product
const notViewTheProduct = async (req, res) => {
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
      { ViewTheProduct: false },
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

//! Get Product Count
const getProductCount = async (req, res) => {
  try {
    const allproductsCount = await Products.count({
      where: {
        isDeleted: false,
        ViewTheProduct: true,
      },
    });

    const productsAwaitingApprovalCount = await Products.count({
      where: {
        isDeleted: false,
        ViewTheProduct: false,
      },
    });

    const productsDairyCount = await Products.count({
      where: {
        isDeleted: false,
        category: "Dairy",
      },
    });

    const productsCropSeedsCount = await Products.count({
      where: {
        isDeleted: false,
        category: "CropSeeds",
      },
    });

    const productsFarmEquipmentsCount = await Products.count({
      where: {
        isDeleted: false,
        category: "FarmEquipments",
      },
    });

    const productsFertilizersCount = await Products.count({
      where: {
        isDeleted: false,
        category: "Fertilizers",
      },
    });

    res.status(200).json({
      success: true,
      message: 'Product count retrieved successfully',
      allproductsCount,
      productsAwaitingApprovalCount,
      productsDairyCount,
      productsCropSeedsCount,
      productsFarmEquipmentsCount,
      productsFertilizersCount,
    });
  } catch (error) {
    console.error('An error occurred while fetching product count:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching product count',
      error: error.message,
    });
  }
};

const getAllProductsNotView = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: {
        isDeleted: false,
        ViewTheProduct: false,
      },
      order: [['createdAt', 'ASC']],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "products retrieved successfully",
      products: products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsPagination,
  getProductById,
  viewTheProduct,
  getAllProducts,
  getProductCount,
  notViewTheProduct,
  getAllProductsForHomePage,
  getAllProductsNotView
}


