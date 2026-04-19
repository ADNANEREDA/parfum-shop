import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/layout/ProductCard'; 

const GiftSets = () => {
  const [giftSets, setGiftSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGiftSets = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        
        const sets = data.filter(product => product.category === 'Coffret' || product.category === 'Gift Set');
        
        setGiftSets(sets);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchGiftSets();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-brand-accent italic tracking-[0.3em] animate-pulse">CHARGEMENT...</div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 flex flex-col items-center">
          <span className="text-brand-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4">The Art of Gifting</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 italic">Exclusive Gift Sets</h1>
          <div className="w-20 h-[1px] bg-brand-accent/40"></div>
          <p className="mt-8 text-gray-400 font-sans tracking-widest text-xs uppercase">Curated collections for unforgettable moments</p>
        </div>

        {giftSets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {giftSets.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-20 flex flex-col items-center gap-4">
            <p className="text-gray-500 font-serif italic text-xl">Our luxury gift sets are currently being prepared.</p>
            <p className="text-brand-accent text-xs tracking-widest uppercase">Check back soon.</p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default GiftSets;