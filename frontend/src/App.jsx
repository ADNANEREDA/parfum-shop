import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/perfumes')
      .then((response) => {
        setPerfumes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des parfums :", error);
      });
  }, []);

  return (
    // Arrière-plan de la page et marges
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Titre principal */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
          Ma Boutique de Parfums 🌟
        </h1>

        {/* Affichage conditionnel : Chargement ou Liste */}
        {perfumes.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-xl text-gray-500 font-medium animate-pulse">
              Chargement des parfums...
            </p>
          </div>
        ) : (
          /* Grille responsive : 1 col (mobile), 2 (tablette), 3 ou 4 (PC) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            
            {perfumes.map((perfume) => (
              /* Carte du parfum */
              <div 
                key={perfume._id} 
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Zone de l'image */}
                <div className="h-56 w-full bg-gray-200 overflow-hidden">
                  <img 
                    src={perfume.imageUrl} 
                    alt={perfume.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    // Si l'image ne charge pas, on met une image par défaut
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=Parfum' }} 
                  />
                </div>

                {/* Contenu de la carte */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{perfume.name}</h2>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">
                      {perfume.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 font-semibold mb-4 uppercase tracking-wider">
                    {perfume.brand}
                  </p>
                  
                  {/* flex-grow pousse le prix vers le bas même si la description est courte */}
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    {perfume.description}
                  </p>
                  
                  {/* Ligne du bas : Prix et Contenance */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-2xl font-black text-gray-900">{perfume.price} €</span>
                    <span className="text-sm font-medium text-gray-500">{perfume.size} ml</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default App;