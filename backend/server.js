require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const { syncDatabase, Asset, Transfer, User, History, Buyback, DeviceType, Make, Settings } = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ============================================================
// ASSETS ROUTES
// ============================================================

app.get('/api/assets', async (req, res) => {
  try {
    const assets = await Asset.findAll({ order: [['created_at', 'DESC']] });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/assets/:id', async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/assets', async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/assets/:id', async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    await asset.update(req.body);
    res.json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/assets/:id', async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    await asset.destroy();
    res.json({ message: 'Asset deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// TRANSFERS ROUTES
// ============================================================

app.get('/api/transfers', async (req, res) => {
  try {
    const transfers = await Transfer.findAll({ order: [['created_at', 'DESC']] });
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/transfers', async (req, res) => {
  try {
    const transfer = await Transfer.create(req.body);
    res.status(201).json(transfer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================================
// HISTORY ROUTES
// ============================================================

app.get('/api/history', async (req, res) => {
  try {
    const history = await History.findAll({ order: [['timestamp', 'DESC']] });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/history', async (req, res) => {
  try {
    const entry = await History.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================================
// BUYBACKS ROUTES
// ============================================================

app.get('/api/buybacks', async (req, res) => {
  try {
    const buybacks = await Buyback.findAll({ order: [['created_at', 'DESC']] });
    res.json(buybacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/buybacks', async (req, res) => {
  try {
    const buyback = await Buyback.create(req.body);
    res.status(201).json(buyback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================================
// USERS ROUTES
// ============================================================

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================================
// DEVICE TYPES & MAKES ROUTES
// ============================================================

app.get('/api/device-types', async (req, res) => {
  try {
    const types = await DeviceType.findAll({ order: [['code', 'ASC']] });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/device-types', async (req, res) => {
  try {
    const type = await DeviceType.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/makes', async (req, res) => {
  try {
    const makes = await Make.findAll({ order: [['code', 'ASC']] });
    res.json(makes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/makes', async (req, res) => {
  try {
    const make = await Make.create(req.body);
    res.status(201).json(make);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================================
// SETTINGS ROUTES (for hierarchy, dropdown settings, etc.)
// ============================================================

app.get('/api/settings/:key', async (req, res) => {
  try {
    const setting = await Settings.findOne({ where: { key: req.params.key } });
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.json(setting.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings/:key', async (req, res) => {
  try {
    const [setting, created] = await Settings.findOrCreate({
      where: { key: req.params.key },
      defaults: { value: req.body }
    });
    if (!created) {
      await setting.update({ value: req.body });
    }
    res.json(setting.value);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Initialize database and start server
const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Database: ${process.env.DATABASE_URL.split('@')[1].split('/')[0]}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
