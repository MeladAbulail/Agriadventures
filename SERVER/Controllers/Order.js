const { Orders } = require('../Models/Tables'); 

//! Get All Orders Pagination
const getOrdersPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 5;
    const allOrders = await Orders.findAll({
      where: {
        isDeleted: false,
      },
      order: [['orderId', 'ASC']],
    });

    const orders = await Orders.findAndCountAll({
      where: {
        isDeleted: false,
      },
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      order: [['createdAt', 'ASC']],
    });

    const ordersReceived = await Orders.findAll({
      where: {
        isDeleted: false,
        ordersReceived: true
      }
    }); 

    const totalPages = Math.ceil(orders.count / itemsPerPage);

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      orders: orders.rows,
      totalFqa: orders.count,
      totalPages,
      currentPage: page,
      ordersReceived: ordersReceived.map(order => order.orderId),
    });
  } catch (error) {
    console.error('An error occurred while fetching Orders:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Orders',
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addNewOrder = async (req, res) => {
  const { userId, totalPrice, orderStatus } = req.body;

  try {
    const newOrder = await Orders.create({
      userId,
      totalPrice,
      orderStatus,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateOrderReceived = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const existingOrder = await Orders.findByPk(orderId);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    existingOrder.ordersReceived = true;
    await existingOrder.save();
    console.log('Order Received updated successfully');
    res.status(200).json({
      success: true,
      message: 'Order Received updated successfully',
      Message: existingOrder.toJSON(),
    });
  } catch (error) {
    console.error('Error updating Order Received:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the Order Received',
      error: error.message,
    });
  }
};

const updateOrderNotReceived = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const existingOrder = await Orders.findByPk(orderId);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    existingOrder.ordersReceived = false;
    await existingOrder.save();
    console.log('Order Not Received updated successfully');
    res.status(200).json({
      success: true,
      message: 'Order Not Received updated successfully',
      Message: existingOrder.toJSON(),
    });
  } catch (error) {
    console.error('Error updating Order Not Received:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the Order Not Received',
      error: error.message,
    });
  }
};


const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ isDeleted: true });

    res.json({ message: 'Order soft deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//! 
const getOrdersByUserId = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Find all orders where userId matches
    const userOrders = await Orders.findAll({
      where: {
        userId: userId,
      },
    });


    if (userOrders.length === 0) {
      return res.status(404).json({ error: 'No orders found for the specified userId' });
    }


    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//! Get Orders Count
const getOrdersCount = async (req, res) => {
  try {

    const allOrdersCount = await Orders.count({
      where: {
        isDeleted: false,
      },
    });

    const receivedOrdersCount = await Orders.count({
      where: {
        isDeleted: false,
        ordersReceived: true
      },
    });

    const notReceivedOrdersCount = await Orders.count({
      where: {
        isDeleted: false,
        ordersReceived: false
      },
    });

    res.status(200).json({
      success: true,
      message: 'Orders Count retrieved successfully',
      allOrdersCount,
      receivedOrdersCount,
      notReceivedOrdersCount
    });
  } catch (error) {
    console.error('An error occurred while fetching Orders Count:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Orders Count',
      error: error.message,
    });
  }
};

module.exports = {
  getOrdersPagination,
  getOrderById,
  addNewOrder,
  updateOrderReceived,
  updateOrderNotReceived,
  deleteOrder,
  getOrdersByUserId,
  getOrdersCount
};
