
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const foods = [
  { id: 1, name: "Veg Burger", category: "Fast Food", description: "Crispy vegetable patty with lettuce", price: 120 },
  { id: 2, name: "Margherita Pizza", category: "Pizza", description: "Cheese, tomato and basil", price: 249 },
  { id: 3, name: "Paneer Wrap", category: "Indian", description: "Spiced paneer wrapped in flatbread", price: 160 },
  { id: 4, name: "Veg Biryani", category: "Indian", description: "Rice with vegetables and spices", price: 180 },
  { id: 5, name: "French Fries", category: "Sides", description: "Golden crispy fries", price: 90 },
  { id: 6, name: "Chocolate Brownie", category: "Dessert", description: "Rich chocolate brownie", price: 100 }
];

let orders = [];
let nextOrderId = 1;

app.get("/", (req, res) => {
  res.send("Foodie Express API is running!");
});

app.get("/api/foods", (req, res) => {
  res.json(foods);
});

app.get("/api/orders", (req, res) => {
  res.json(orders.slice(0, 50));
});

app.post("/api/orders", (req, res) => {
  const { customerName, phone, address, items } = req.body;

  if (!customerName?.trim() || !phone?.trim() || !address?.trim()) {
    return res.status(400).json({
      message: "Please enter your name, phone and address."
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "Your cart is empty."
    });
  }

  const orderItems = [];

  for (const item of items) {
    const food = foods.find(f => f.id === Number(item.foodId));
    const quantity = Number(item.quantity);

    if (!food || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
      return res.status(400).json({
        message: "Invalid food item or quantity."
      });
    }

    orderItems.push({
      foodId: food.id,
      name: food.name,
      price: food.price,
      quantity
    });
  }

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const order = {
    id: nextOrderId++,
    customerName: customerName.trim(),
    phone: phone.trim(),
    address: address.trim(),
    items: orderItems,
    total,
    status: "Received",
    createdAt: new Date().toISOString()
  };

  orders.unshift(order);
  res.status(201).json(order);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Foodie Express server running at http://localhost:${PORT}`);
});
