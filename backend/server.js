const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js');

// Connexion à la base de données
connectDB();

// CRÉATION DE L'APP 
const app = express();
app.use(express.json());
app.use(cors());

// LES ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// LIGNE UPLOAD 
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});