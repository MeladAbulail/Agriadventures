const { Orders } = require('../Models/Tables'); 

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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

const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { totalPrice, orderStatus } = req.body;

  try {
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({
      totalPrice,
      orderStatus,
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
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

    // Check if there are any orders for the specified userId
    if (userOrders.length === 0) {
      return res.status(404).json({ error: 'No orders found for the specified userId' });
    }

    // Return the orders for the specified userId
    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  addNewOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId
};
