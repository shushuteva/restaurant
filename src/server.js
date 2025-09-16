const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const DB_FILE = path.join(__dirname, 'data', 'db.json');

// Ensure db.json exists and has required arrays
function ensureDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({
      users: [],
      cart: [],
      orders: [],
      feedback: [],
      restaurants: []
    }, null, 2));
  }
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  if (!db.users) db.users = [];
  if (!db.cart) db.cart = [];
  if (!db.orders) db.orders = [];
  if (!db.feedback) db.feedback = [];
  if (!db.restaurants) db.restaurants = [];
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}
ensureDB();

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// USERS
app.get('/users', (req, res) => {
  const db = readDB();
  res.json(db.users);
});
app.post('/users', (req, res) => {
  const db = readDB();
  const user = req.body;
  if (db.users.some(u => u.email === user.email)) {
    return res.status(400).json({ error: 'Email already registered.' });
  }
  db.users.push(user);
  writeDB(db);
  res.status(201).json({ message: 'Registration successful.' });
});

// CART
app.get('/cart', (req, res) => {
  const db = readDB();
  res.json(db.cart);
});
app.post('/cart', (req, res) => {
  const db = readDB();
  const cart = req.body;
  db.cart = cart;
  writeDB(db);
  res.status(200).json({ message: 'Cart updated.' });
});

// ORDERS
app.get('/orders', (req, res) => {
  const db = readDB();
  res.json(db.orders);
});
app.post('/orders', (req, res) => {
  const db = readDB();
  const order = req.body;
  db.orders.push(order);
  writeDB(db);
  res.status(201).json({ message: 'Order placed.' });
});

// FEEDBACK
app.post('/feedback', (req, res) => {
  const db = readDB();
  const feedback = req.body;
  db.feedback.push(feedback);
  writeDB(db);
  res.status(201).json({ message: 'Feedback submitted.' });
});

// RESTAURANTS
app.get('/restaurants', (req, res) => {
  const db = readDB();
  res.json(db.restaurants);
});

// RESTAURANT MENU
app.get('/restaurants/:id/menu', (req, res) => {
  const db = readDB();
  const dishes = db.dishes.filter(d => String(d.restaurantId) === req.params.id);
  if (!dishes) return res.status(404).json({ error: 'Restaurant not found.' });
  res.json(dishes || []);
});

// RESTAURANT REVIEWS
app.get('/restaurants/:id/reviews', (req, res) => {
  const db = readDB();
  const restaurant = db.restaurants.find(r => String(r.id) === req.params.id);
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' });
  res.json(restaurant.reviews || []);
});
app.post('/restaurants/:id/reviews', (req, res) => {
  const db = readDB();
  const restaurant = db.restaurants.find(r => String(r.id) === req.params.id);
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' });
  if (!restaurant.reviews) restaurant.reviews = [];
  restaurant.reviews.push(req.body);
  writeDB(db);
  res.status(201).json({ message: 'Review submitted.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});