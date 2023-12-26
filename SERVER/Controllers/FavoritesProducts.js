const { FavoritesProducts, Products } = require('../Models/Tables');

//! Add New Favorites Products 
const addFavoritesProducts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.productId; 

    if (!userId) {
      return res.status(401).json({ success: false, message: "You must log in first" });
    }

    const checkFavorityExistButMakeSoftDelete = await FavoritesProducts.findOne({
      where: {
        userId: userId, productId: productId
      }
    })

    if(checkFavorityExistButMakeSoftDelete) {
      await FavoritesProducts.update(
        { isDeleted: false },
        { where: { userId: userId, productId: productId } }
      );
    } else {
      const newFavoritesproductId = await FavoritesProducts.create({
        userId,
        productId,
      });
      res.status(201).json({
        success: true,
        message: 'Favorites Product added successfully',
        FavoritesProducts: newFavoritesproductId.toJSON(),
      });
    }

  } catch (error) {
    console.error('An error occurred while adding the Favorites Products:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the Products',
      error: error.message,
    });
  }
};

//! Get Favorites productIds By User Id
const getFavoritesProductsByUserId = async (req, res) => {
  const userId = req.user.userId;

  try {
    const userFavoritesProducts = await FavoritesProducts.findAll({
      where: {
        userId: userId, isDeleted: false
      },
    });

    if (userFavoritesProducts.length === 0) {
      return res.status(404).json({ error: 'No Favorites productIds found for the specified userId' });
    }

    const products = await Promise.all(
      userFavoritesProducts.map(async (product) => {
        const productsData = await Products.findByPk(product.productId);
        return productsData;
      })
    );

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//! Get Favorites Locations By Product Id
const getFavoritesProductByProductId = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.productId; 

  try {
    const userFavoritesProduct = await FavoritesProducts.findAll({
      where: {
        userId: userId, productId: productId, isDeleted: false
      },
    });

    res.status(200).json(
      userFavoritesProduct
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//! Soft delete Favorites productIds by ID 
const deleteFavoritesProductsByProductsId = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.productId; 

    //! Check if the favorites ProductsId exists
    const existingFavoritesProducts = await FavoritesProducts.findOne({
      where: {
        userId: userId, productId: productId
      }
    });

    if (!existingFavoritesProducts) {
      return res.status(404).json({
        success: false,
        message: 'favorites product not found',
      });
    }

    //! Soft delete the Favorites productIds
    await FavoritesProducts.update(
      { isDeleted: true },
      { where: { productId: productId } }
    );

    //! Save the changes
    await existingFavoritesProducts.save();

    res.status(200).json({
      success: true,
      message: 'Favorites productIds soft deleted successfully',
      FavoritesProducts: existingFavoritesProducts.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while soft deleting the Favorites products:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting the Favorites products',
      error: error.message,
    });
  }
};

module.exports = {
  addFavoritesProducts,
  getFavoritesProductsByUserId,
  deleteFavoritesProductsByProductsId,
  getFavoritesProductByProductId
};