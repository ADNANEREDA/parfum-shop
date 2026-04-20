import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'; 
import ProductCard from '../../components/layout/ProductCard'; 
import SkeletonCard from '../../components/common/SkeletonCard'; 
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'; 

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleCount, setVisibleCount] = useState(8); 

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category'); 
  const searchQuery = searchParams.get('search') || '';
  const sortOption = searchParams.get('sort') || '';

  useEffect(() => {
    setVisibleCount(8);
  }, [categoryFilter, searchQuery, sortOption]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://parfum-shop-seven.vercel.app/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Impossible de charger la collection.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (newFilter) => {
    const params = new URLSearchParams(searchParams);
    if (newFilter === 'all') params.delete('category');
    else params.set('category', newFilter);
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) params.set('search', e.target.value);
    else params.delete('search');
    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) params.set('sort', e.target.value);
    else params.delete('sort');
    setSearchParams(params);
  };

  let processedProducts = [...products];

  if (categoryFilter) {
    processedProducts = processedProducts.filter((product) => {
      if (categoryFilter === 'women' && product.gender !== 'Femme') return false;
      if (categoryFilter === 'men' && product.gender !== 'Homme') return false;
      if (categoryFilter === 'unisex' && product.gender !== 'Unisexe') return false;
      if (categoryFilter === 'luxury' && product.isFeatured !== true) return false;
      return true;
    });
  }

  if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    processedProducts = processedProducts.filter((product) => 
      product.name.toLowerCase().includes(lowerCaseQuery) || 
      product.brand.toLowerCase().includes(lowerCaseQuery)
    );
  }

  if (sortOption === 'price_asc') {
    processedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price_desc') {
    processedProducts.sort((a, b) => b.price - a.price);
  }

  const displayedProducts = processedProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 8); 
  };

  const filterButtons = [
    { id: 'all', label: 'All Fragrances' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'unisex', label: 'Unisex' },
    { id: 'luxury', label: 'Luxury Brands' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-brand-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
            {categoryFilter ? `${categoryFilter} Collection` : 'Discover your ideal fragrance'}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 italic">Your fragrance, your signature</h1>
          <div className="w-20 h-[1px] bg-brand-accent/40"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 border-b border-white/10 pb-6">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or brand..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-transparent border-b border-white/20 text-white placeholder-gray-600 text-sm py-2 pl-8 pr-4 focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <SlidersHorizontal size={16} className="text-gray-500" />
            <select 
              value={sortOption}
              onChange={handleSortChange}
              className="bg-transparent border border-white/20 text-white text-xs uppercase tracking-widest p-2 focus:outline-none focus:border-brand-accent cursor-pointer appearance-none pr-8"
            >
              <option value="" className="bg-[#111] text-white">Sort By: Recommended</option>
              <option value="price_asc" className="bg-[#111] text-white">Price: Low to High</option>
              <option value="price_desc" className="bg-[#111] text-white">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filterButtons.map((btn) => {
            const isActive = categoryFilter === btn.id || (!categoryFilter && btn.id === 'all');
            return (
              <button
                key={btn.id}
                onClick={() => handleCategoryClick(btn.id)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border ${
                  isActive 
                    ? 'border-brand-accent text-brand-accent bg-brand-accent/5' 
                    : 'border-white/10 text-gray-500 hover:border-white/40 hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {error ? (
          <div className="text-center mt-20 text-red-500 font-serif italic text-xl">
            {error}
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {displayedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {processedProducts.length === 0 && (
              <div className="text-center mt-32">
                <Search size={40} className="mx-auto text-white/10 mb-4" />
                <p className="text-gray-500 font-serif italic text-xl">
                  No fragrances found matching your criteria.
                </p>
                <button 
                  onClick={() => setSearchParams({})} 
                  className="mt-6 text-brand-accent text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {visibleCount < processedProducts.length && (
              <div className="mt-16 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Discover More</span>
                  <ChevronDown size={20} className="animate-bounce" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Catalog;