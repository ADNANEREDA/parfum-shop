const mongoose = require('mongoose');

// On définit la structure d'un parfum
const perfumeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true // Le nom est obligatoire
    },
    brand: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    size: { 
        type: Number, // en ml (ex: 50, 100)
        required: true 
    },
    category: { 
        type: String, // ex: Boisé, Floral, Oriental...
        required: true 
    },
    imageUrl: { 
        type: String, // Le lien vers la photo du parfum
        required: true 
    }
}, {
    timestamps: true // Ajoute automatiquement la date de création et de modification
});

// On exporte le modèle pour pouvoir l'utiliser ailleurs
module.exports = mongoose.model('Perfume', perfumeSchema);