const express = require('express');
const router = express.Router();
const { getPerfumes, createPerfume } = require('../controllers/perfumeController');

// Quand on fait une requête GET sur cette route, on lance getPerfumes
router.get('/', getPerfumes);

// Quand on fait une requête POST sur cette route, on lance createPerfume
router.post('/', createPerfume);

module.exports = router;