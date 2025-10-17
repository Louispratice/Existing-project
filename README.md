# Implementation Guide: Minimal Fixes + Product CRUD

Please follow this guide to fix env vars, enable JSON parsing, correct the Product model, and scaffold Product CRUD endpoints. Text me if you have any questions.

## Prerequisites
- Node.js 18+
- Install deps: `npm install`
- Add `dotenv`: `npm i dotenv`
- Ensure secrets are ignored: add `.env` to `.gitignore`

## 1) Configure Environment Variables
Create a `.env` file at the project root:
```
MONGODB_URI=<your mongodb uri>
PORT=3000
```

## 2) Enable JSON Parsing & Env in `index.js`
Replace the top and server sections of `index.js` with:
```js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Basic health route
app.get('/', (req, res) => res.send('Hello from node API'));

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });
```

## 3) Fix the Product Model (`models/product.model.js`)
Replace the file content with:
```js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0, default: 0 },
  price: { type: Number, required: true, min: 0, default: 0 },
  image: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
```

## 4) Scaffold Product CRUD Routes
Create `routes/product.routes.js`:
```js
const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try { const product = await Product.create(req.body); res.status(201).json(product); }
  catch (err) { res.status(400).json({ error: err.message }); }
});

// List with pagination/filter/sort
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', q, minPrice, maxPrice } = req.query;
    const filter = {};
    if (q) filter.name = new RegExp(q, 'i');
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const data = await Product.find(filter)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);
    res.json({ data, page: Number(page), total });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get one
router.get('/:id', async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch { res.status(400).json({ error: 'Invalid id' }); }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const item = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const item = await Product.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch { res.status(400).json({ error: 'Invalid id' }); }
});

module.exports = router;
```

## 5) Register Routes in `index.js`
Add near the top-level setup:
```js
const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);
```

## 6) Run & Test
- Dev: `npm run dev`
- Create: `curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d "{\"name\":\"Phone\",\"quantity\":10,\"price\":199.99}"`
- List: `curl "http://localhost:3000/api/products?page=1&limit=10&q=phone&minPrice=100"`
- Get: `curl http://localhost:3000/api/products/<id>`
- Update: `curl -X PUT http://localhost:3000/api/products/<id> -H "Content-Type: application/json" -d "{\"price\":299.99}"`
- Delete: `curl -X DELETE http://localhost:3000/api/products/<id>`
