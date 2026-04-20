import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/layout/ProductCard'; 

const NewArrivals = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const { data } = await axios.get('https://parfum-shop-seven.vercel.app/api/products');
        
        const newProducts = data.reverse().slice(0, 8); 
        
        setLatestProducts(newProducts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-brand-accent italic tracking-[0.3em] animate-pulse">CHARGEMENT...</div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20 flex flex-col items-center">
          <span className="text-brand-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Just Dropped</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 italic">New Arrivals</h1>
          <div className="w-20 h-[1px] bg-brand-accent/40"></div>
          <p className="mt-8 text-gray-400 font-sans tracking-widest text-xs uppercase">Be the first to wear our latest masterpieces</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {latestProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default NewArrivals;