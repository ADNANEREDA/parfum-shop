const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
    res.status(401).json({ message: 'Non autorisé : Accès réservé aux administrateurs' });
  }
};

router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

router.get('/wishlist', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');

    if (user) {
      res.json(user.wishlist);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des favoris' });
  }
});

router.post('/wishlist', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { productId } = req.body;

    if (user) {
      const alreadyAdded = user.wishlist.find(
        (id) => id.toString() === productId
      );

      if (alreadyAdded) {
        user.wishlist = user.wishlist.filter(
          (id) => id.toString() !== productId
        );
      } else {
        user.wishlist.push(productId);
      }

      await user.save();

      const updatedUser = await User.findById(req.user._id).populate('wishlist');
      res.json(updatedUser.wishlist);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des favoris' });
  }
});

module.exports = router;