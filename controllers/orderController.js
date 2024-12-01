const Order = require("../models/Order");

// Save an order to the database
const createOrder = async (req, res) => {
  try {
    const { groupedItems, grandTotal, userName } = req.body; // Accept userName

    // Prepare orders for database insertion
    const orders = Object.entries(groupedItems).map(([contactNumber, details]) => ({
      userName, // Add userName
      contactNumber,
      items: details.items.map((item) => ({
        itemName: item.itemName,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: details.totalPrice,
    }));

    // Save all orders
    await Order.insertMany(orders);

    res.status(201).json({ message: "Orders saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving orders", error });
  }
};

const getOrdersByUserName = async (req, res) => {
  try {
    const { userName } = req.query;
    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }

    const orders = await Order.find({ userName }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

module.exports = { createOrder, getOrdersByUserName };



