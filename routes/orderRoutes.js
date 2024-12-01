const express = require("express");
const { createOrder, getOrdersByUserName } = require("../controllers/orderController");

const router = express.Router();

// Create an order
router.post("/orders", createOrder);

// Get orders by username
router.get("/orders", getOrdersByUserName);

module.exports = router;
