const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true }, // Added userName
  contactNumber: { type: String, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
