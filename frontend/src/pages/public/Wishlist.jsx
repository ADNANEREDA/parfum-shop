import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/layout/ProductCard';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 text-center lg:text-left">
          <span className="text-brand-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">
            Your Favorites
          </span>
          <h1 className="text-5xl font-serif text-white italic">The Wishlist</h1>
          <div className="w-20 h-[1px] bg-brand-accent/30 mt-6 hidden lg:block"></div>
        </div>

        {/* CONTENT */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-4 border border-white/5 bg-[#0a0a0a] shadow-2xl">
            <Heart size={50} className="text-white/10 mb-8" />
            <h2 className="text-2xl font-serif text-white mb-4 italic">No favorites yet</h2>
            <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] text-center max-w-sm leading-relaxed mb-8">
              Discover our collection and save your signature scents here.
            </p>
            <a 
              href="/perfumes" 
              className="border border-brand-accent text-brand-accent px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-black transition-all duration-500"
            >
              Explore Collection
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {wishlistItems.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;