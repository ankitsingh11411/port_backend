const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

const cors = require('cors');

dotenv.config();

const app = express();

const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: ['https://port-frontend-one.vercel.app', 'http://localhost:5174'],
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('API running!');
});
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = app;
