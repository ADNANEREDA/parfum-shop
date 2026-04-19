const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id || decoded._id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  } else {
    res.status(401).json({ message: 'Non autorisé, aucun token fourni' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Non autorisé : Accès Admin requis' });
  }
};

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Parfum non trouvé' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Format ID invalide' });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      image,
      category,
      gender,
      sizes,
      countInStock,
      isFeatured,
      freeShipping
    } = req.body;

    const product = new Product({
      name,
      brand,
      description,
      price,
      image,
      category,
      gender,
      sizes,
      countInStock,
      isFeatured,
      freeShipping
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création", error: error.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      image,
      category,
      gender,
      sizes,
      countInStock,
      isFeatured,
      freeShipping
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.brand = brand || product.brand;
      product.description = description || product.description;
      product.price = price || product.price;
      product.image = image || product.image;
      product.category = category || product.category;
      product.gender = gender || product.gender;
      product.sizes = sizes || product.sizes;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.freeShipping = freeShipping !== undefined ? freeShipping : product.freeShipping;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Parfum non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Parfum supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Parfum non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
  }
});

module.exports = router;