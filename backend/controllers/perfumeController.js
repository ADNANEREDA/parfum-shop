const Perfume = require('../models/Perfume');

// Fonction pour récupérer tous les parfums (Méthode GET)
const getPerfumes = async (req, res) => {
    try {
        const perfumes = await Perfume.find(); // Cherche tous les parfums dans MongoDB
        res.status(200).json(perfumes); // Renvoie les données au format JSON
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des parfums", error });
    }
};

// Fonction pour ajouter un nouveau parfum (Méthode POST)
const createPerfume = async (req, res) => {
    try {
        const newPerfume = new Perfume(req.body); // Crée un parfum avec les données envoyées
        const savedPerfume = await newPerfume.save(); // Sauvegarde dans MongoDB
        res.status(201).json(savedPerfume);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de l'ajout du parfum", error });
    }
};

module.exports = { getPerfumes, createPerfume };