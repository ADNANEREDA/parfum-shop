import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, ShoppingBag, Search, Menu, X, User as UserIcon, LayoutDashboard } from 'lucide-react';
import logoIcon from '../../assets/images/logos/logo-parfum.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems.length;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarBg = "bg-black/95 backdrop-blur-md shadow-2xl border-b border-white/10";
  const headerHeight = isScrolled ? "h-16" : "h-20 md:h-24";
  const hoverColor = "hover:text-brand-accent";
  const badgeColor = "bg-brand-accent text-black font-bold";

  return (
    <header className="w-full sticky top-0 z-50">
      
      <div className="bg-brand-dark text-brand-light text-[8px] md:text-[10px] py-1.5 md:py-2 uppercase tracking-[0.2em] font-medium overflow-hidden whitespace-nowrap">
        <div className="animate-marquee">
          <span className="mx-4 md:mx-8">Welcome to ParfumShop</span>
          <span className="mx-4 md:mx-8">Free shipping over 500 MAD</span>
          <span className="mx-4 md:mx-8"> Free Express Delivery </span>
          <span className="mx-4 md:mx-8"> Discover Your Signature Scent </span>
          <span className="mx-4 md:mx-8"> Your Signature Starts Here </span>
          <span className="mx-4 md:mx-8"> A World of Unique Fragrances </span>
        </div>
      </div>

      <div className={`${navbarBg} transition-all duration-500 relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center ${headerHeight} transition-all duration-500`}>
            
            <div className="flex-1 flex items-center justify-start gap-4">
              <button 
                className="md:hidden text-white hover:text-brand-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <Link to="/" className="group hidden sm:flex items-center">
                <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                   <img src={logoIcon} alt="Logo" className="w-full h-full object-contain drop-shadow-xl" /> 
                </div>
              </Link>
            </div>

            <div className="flex-[2] md:flex-1 flex justify-center">
              <Link to="/" className="flex flex-col items-center group text-center">
                <span className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif tracking-[0.1em] md:tracking-[0.15em] text-white group-hover:scale-105 transition-all duration-500`}>
                  PARFUM<span className="text-brand-accent italic">SHOP</span>
                </span>
                <span className="hidden md:block text-[0.6rem] font-sans tracking-[0.3em] text-brand-accent mt-1 uppercase font-bold">Premium Fragrances</span>
              </Link>
            </div>

            <div className={`flex-1 flex justify-end items-center space-x-4 md:space-x-6 text-[10px] md:text-xs font-semibold tracking-widest text-white uppercase font-sans`}>
              <Link to="/perfumes" className={`${hoverColor} transition-colors`}>
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </Link>

              {user ? (
                <Link to={user.isAdmin ? "/admin/dashboard" : "/dashboard"} className={`flex items-center gap-2 ${hoverColor} transition-colors`}>
                   <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${user.isAdmin ? 'bg-red-500' : 'bg-brand-accent'}`}></div>
                   <span className="hidden md:inline-block font-serif italic text-[11px] tracking-[0.2em]">{user.firstName || user.name}</span>
                   <UserIcon className="w-4 h-4 md:hidden" />
                </Link>
              ) : (
                <Link to="/login" className={`${hoverColor} transition-colors`}>
                  <span className="hidden md:inline-block border-b border-transparent hover:border-brand-accent transition-all">Login</span>
                  <UserIcon className="w-4 h-4 md:hidden" />
                </Link>
              )}

              <Link to="/wishlist" className="relative group">
                  <Heart className={`w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-y-0.5 ${wishlistCount > 0 ? 'fill-brand-accent text-brand-accent' : ''}`} />
                  {wishlistCount > 0 && (
                    <span className={`absolute -top-2 -right-2 ${badgeColor} text-[7px] md:text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center`}>
                      {wishlistCount}
                    </span>
                  )}
              </Link>
              
              <Link to="/cart" className={`flex items-center gap-1.5 group ${hoverColor} transition-colors`}>
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-y-0.5" />
                  {cartCount > 0 && (
                    <span className={`absolute -top-2 -right-2 ${badgeColor} rounded-full w-3.5 h-3.5 flex items-center justify-center text-[7px] md:text-[8px]`}>
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:block tracking-[0.3em]">Bag</span>
              </Link>
            </div>
          </div>
        </div>

        <div className={`md:hidden absolute top-full left-0 w-full bg-black/98 backdrop-blur-2xl border-b border-white/10 transition-all duration-500 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[100vh] opacity-100 py-10' : 'max-h-0 opacity-0 py-0'}`}>
          <nav className="flex flex-col items-center space-y-8 text-[12px] font-bold tracking-[0.4em] text-gray-300 uppercase font-sans">
            
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-accent">Home</Link>
            <Link to="/perfumes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-accent">Catalog</Link>
            <Link to="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-accent">New Arrivals</Link>
            
            {user && (
              <div className="w-2/3 flex flex-col items-center gap-6 pt-6 border-t border-white/10">
                <Link 
                  to={user.isAdmin ? "/admin/dashboard" : "/dashboard"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brand-accent flex items-center gap-3 bg-brand-accent/5 px-6 py-3 border border-brand-accent/20 w-full justify-center"
                >
                  <LayoutDashboard size={14} /> {user.isAdmin ? "Admin Panel" : "My Account"}
                </Link>
              </div>
            )}

            {!user && (
               <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-white border border-white/20 px-8 py-3">Login / Register</Link>
            )}

            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] text-gray-500">Contact Services</Link>
          </nav>
        </div>

        <nav className={`hidden md:flex justify-center space-x-12 pb-5 text-[11px] font-bold tracking-[0.2em] text-gray-300 uppercase font-sans`}>
          <Link to="/" className={`${hoverColor} transition-colors`}>Home</Link>
          <Link to="/perfumes" className={`${hoverColor} transition-colors`}>Catalog</Link>
          <Link to="/new-arrivals" className={`${hoverColor} transition-colors`}>New Arrivals</Link>
          <Link to="/gift-sets" className={`${hoverColor} transition-colors`}>Gift Sets</Link>
          <Link to="/contact" className={`${hoverColor} transition-colors`}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;