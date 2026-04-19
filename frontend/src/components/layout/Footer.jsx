import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await axios.post('http://localhost:5000/api/newsletter', { email });
      setStatus({ type: 'success', text: 'Welcome to the club!' });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setStatus({ type: 'error', text: 'Email is already subscribed.' });
      } else {
        setStatus({ type: 'error', text: 'An error occurred. Try again.' });
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-brand-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Join The Exclusive Club</span>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Subscribe to our Newsletter</h2>
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-8 max-w-md">
            Receive early access to new arrivals, exclusive gift sets, and insider-only offers.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col w-full max-w-md relative group">
            <div className="relative w-full">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-gray-600 focus:border-brand-accent text-white text-[10px] tracking-[0.2em] uppercase py-3 outline-none transition-colors"
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-accent transition-colors disabled:opacity-50"
              >
                <ArrowRight size={18} />
              </button>
            </div>
            
            {status && (
              <span className={`text-[10px] tracking-widest uppercase font-bold mt-4 ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {status.text}
              </span>
            )}
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex flex-col group mb-6">
              <span className="text-2xl font-serif tracking-[0.15em] text-white">
                PARFUM<span className="text-brand-accent italic">SHOP</span>
              </span>
              <span className="text-[0.5rem] font-sans tracking-[0.3em] text-brand-accent mt-1 uppercase font-bold">
                Premium Fragrances
              </span>
            </Link>
            <p className="text-gray-500 text-[10px] tracking-widest uppercase leading-relaxed">
              Curating the world's most exquisite and rare fragrances for those who demand the extraordinary.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white text-[11px] font-bold tracking-[0.3em] uppercase mb-6">The Boutiques</h3>
            <div className="flex flex-col space-y-4 text-[10px] text-gray-400 tracking-[0.2em] uppercase font-semibold">
              <Link to="/perfumes" className="hover:text-brand-accent transition-colors">All Fragrances</Link>
              <Link to="/new-arrivals" className="hover:text-brand-accent transition-colors">New Arrivals</Link>
              <Link to="/gift-sets" className="hover:text-brand-accent transition-colors">Gift Sets</Link>
              <Link to="/perfumes?category=Luxury" className="hover:text-brand-accent transition-colors">Luxury Brands</Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white text-[11px] font-bold tracking-[0.3em] uppercase mb-6">Client Care</h3>
            <div className="flex flex-col space-y-4 text-[10px] text-gray-400 tracking-[0.2em] uppercase font-semibold">
              <Link to="/contact" className="hover:text-brand-accent transition-colors">Contact & FAQ</Link>
              <Link to="/dashboard" className="hover:text-brand-accent transition-colors">Track Order</Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white text-[11px] font-bold tracking-[0.3em] uppercase mb-6">Follow Us</h3>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-brand-accent hover:-translate-y-1 transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-brand-accent hover:-translate-y-1 transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-brand-accent hover:-translate-y-1 transition-all duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-center items-center text-center gap-4">
          <p className="text-gray-600 text-[9px] tracking-[0.2em] uppercase font-bold">
            &copy; {new Date().getFullYear()} ParfumShop. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;