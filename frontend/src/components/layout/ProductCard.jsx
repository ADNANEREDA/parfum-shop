import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const active = isInWishlist(product._id);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `http://localhost:5000${cleanPath}`;
  };

  return (
    <div className="group relative bg-[#050505] border border-white/5 hover:border-brand-accent/40 transition-all duration-700 overflow-hidden flex flex-col h-full shadow-2xl">
      
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
        <Link to={`/product/${product._id}`} className="absolute inset-0 z-0">
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80" 
          />
        </Link>
        
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="bg-brand-accent text-black text-[7px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm shadow-xl">
            {product.gender}
          </span>
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-4 right-4 z-50 p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:scale-110 transition-all duration-300 shadow-xl group/heart cursor-pointer pointer-events-auto"
        >
          <Heart 
            size={14} 
            className={`${active ? 'fill-red-500 text-red-500' : 'fill-transparent text-white/70 group-hover/heart:text-white'} transition-colors duration-300`} 
          />
        </button>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 translate-y-4 group-hover:translate-y-0 z-40 pointer-events-none">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1, '100ml');
            }}
            className="flex items-center gap-2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] px-7 py-3.5 hover:bg-brand-accent transition-colors shadow-2xl z-50 relative pointer-events-auto cursor-pointer"
          >
            <ShoppingBag size={14} /> Add to Bag
          </button>

          <Link 
            to={`/product/${product._id}`} 
            className="flex items-center gap-2 text-white/80 text-[9px] font-medium uppercase tracking-[0.3em] hover:text-white transition-colors z-50 relative pointer-events-auto cursor-pointer"
          >
            <Eye size={14} /> Quick View
          </Link>
        </div>
      </div>

      <div className="p-6 text-center flex-grow flex flex-col justify-between border-t border-white/5 relative z-10 pointer-events-none">
        <div>
          <p className="text-brand-accent text-[9px] font-bold tracking-[0.5em] uppercase mb-3">{product.brand}</p>
          <Link to={`/product/${product._id}`} className="pointer-events-auto">
            <h2 className="text-white text-xl font-serif mb-2 tracking-tight hover:text-brand-accent transition-colors">{product.name}</h2>
          </Link>
          <p className="text-gray-500 text-[10px] italic font-sans mb-4 line-clamp-1">{product.category}</p>
        </div>
        <div>
          <span className="text-white font-sans text-lg tracking-wider">
            {product.price?.toLocaleString()} <span className="text-[10px] text-brand-accent ml-1">MAD</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;