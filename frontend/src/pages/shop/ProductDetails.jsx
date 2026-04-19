import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, ChevronLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/products/${id}`);
        setProduct(data);
        if(data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération du produit:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-brand-accent italic tracking-widest animate-pulse">Loading...</div>;
  if (!product) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Product Not Found</div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/perfumes" className="flex items-center gap-2 text-brand-accent text-[10px] uppercase tracking-widest mb-12 hover:opacity-70 transition-opacity">
          <ChevronLeft size={14} /> Back to Collection
        </Link>

        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
          <div className="w-full md:w-1/2 bg-white/[0.02] border border-white/5 p-12 flex items-center justify-center min-h-[400px] group shadow-2xl relative overflow-hidden">
            {product.isFeatured && (
              <span className="absolute top-4 left-4 border border-brand-accent text-brand-accent text-[8px] px-3 py-1 uppercase tracking-[0.2em] font-bold">
                Exclusive
              </span>
            )}

            <img 
              src={`${BACKEND_URL}${product.image}`} 
              alt={product.name} 
              className="w-full h-auto max-h-[500px] object-contain transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Image+Not+Found'; }}
            />
          </div>

          <div className="flex-1 text-white space-y-8">
            <div>
              <span className="text-brand-accent text-xs tracking-[0.4em] uppercase font-bold">{product.brand}</span>
              <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-4 italic leading-tight">{product.name}</h1>
              <p className="text-2xl font-light text-gray-300 italic">{product.price?.toLocaleString()} MAD</p>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">Select Volume</h3>
              <div className="flex gap-3">
                {product.sizes?.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-8 py-3 border text-[10px] tracking-widest uppercase transition-all duration-300 font-bold ${
                      selectedSize === size 
                        ? 'border-brand-accent text-brand-accent bg-brand-accent/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                        : 'border-white/10 text-gray-500 hover:border-white/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-8">
              <h3 className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">The Fragrance</h3>
              <p className="text-gray-400 leading-relaxed font-sans text-sm tracking-wide">{product.description}</p>
            </div>

            <button 
              onClick={() => addToCart(product, 1, selectedSize)}
              disabled={product.countInStock === 0}
              className={`w-full py-5 uppercase text-[11px] font-bold tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-3 shadow-xl ${
                product.countInStock === 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-brand-accent hover:text-black hover:shadow-brand-accent/20'
              }`}
            >
              <ShoppingBag size={16} /> 
              {product.countInStock === 0 ? 'Sold Out' : `Add to Bag — ${selectedSize}`}
            </button>

            <div className="grid grid-cols-2 gap-4 py-8 border-t border-white/5">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase text-gray-500 tracking-widest font-bold">Availability</span>
                <span className={`text-[10px] font-bold uppercase ${product.countInStock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.countInStock > 0 ? `In Stock` : 'Currently Unavailable'}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase text-gray-500 tracking-widest font-bold">Shipping</span>
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest italic">
                  Free Express Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;