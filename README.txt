FOODIE EXPRESS - ONLINE FOOD ORDERING SYSTEM

Requirements:
- Node.js LTS and npm
- MongoDB Community Server running locally OR a MongoDB Atlas connection string

1. BACKEND
Open Command Prompt in the server folder:
  cd path\to\foodie-express\server
  npm install
  node server.js

The .env file uses:
  MONGO_URI=mongodb://127.0.0.1:27017/foodOrderingDB
  PORT=5000

If using MongoDB Atlas, replace MONGO_URI in server/.env with your Atlas connection string.
Keep credentials private.

2. FRONTEND
Open a SECOND Command Prompt in the client folder:
  cd path\to\foodie-express\client
  npm install
  npm run dev

Open the local URL printed by Vite, usually http://localhost:5173.

3. TEST
- Menu should show six sample foods after the backend connects to an empty database.
- Search and category filters should work.
- Add food to cart and adjust quantity.
- Enter customer name, phone, and address, then place an order.
- Recent orders should show the saved order.

If `mongod` is not recognized, MongoDB may not be installed or its bin folder is not on PATH. Start MongoDB from Windows Services or use MongoDB Atlas.

This is an academic demonstration; it has no authentication or online payment gateway.
