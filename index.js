const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
const nodemailerUser = process.env.NODEMAILER_USER;
const nodemailerPass = process.env.NODEMAILER_PASS;

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongoURI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
