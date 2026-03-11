const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

const perfumeRoutes = require('./routes/perfumeRoutes');
app.use('/api/perfumes', perfumeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Le serveur tourne sur le port ${PORT}`);
});