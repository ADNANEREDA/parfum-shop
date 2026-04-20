import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  
  const BACKEND_URL = "https://parfum-shop-seven.vercel.app";

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center pt-20 px-4">
        <ShoppingBag size={50} className="text-brand-accent/20 mb-8" />
        <h2 className="text-3xl font-serif text-white mb-4 italic">Your bag is empty</h2>
        <Link to="/perfumes" className="border border-brand-accent text-brand-accent px-12 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-white mb-16 italic text-center lg:text-left">
          Shopping Bag
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 w-full space-y-6">
            {cartItems.map((item) => (
              <div key={`${item._id}-${item.size}`} className="flex gap-6 bg-[#0a0a0a] p-6 border border-white/5 shadow-xl group">
                
                <div className="w-32 aspect-[3/4] overflow-hidden bg-[#111] flex items-center justify-center border border-white/5">
                  <img 
                    src={`${BACKEND_URL}${item.image}`} 
                    alt={item.name} 
                    className="w-full h-full object-contain opacity-90 transition-transform duration-500 group-hover:scale-110" 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Perfume'; }}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-brand-accent text-[9px] font-bold uppercase tracking-[0.4em]">{item.brand}</p>
                      <h3 className="text-xl font-serif text-white mt-1 italic">{item.name}</h3>
                      <p className="text-[10px] text-gray-500 uppercase mt-2 font-semibold">Volume: {item.size}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id, item.size)} 
                      className="text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                    <div className="flex items-center border border-white/10 bg-black/40">
                      <button 
                        onClick={() => item.qty > 1 && addToCart(item, -1, item.size)} 
                        className="p-3 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="px-4 text-[11px] font-bold text-white border-x border-white/5">
                        {item.qty}
                      </span>
                      <button 
                        onClick={() => addToCart(item, 1, item.size)} 
                        className="p-3 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    <p className="text-white font-serif text-lg leading-none italic">
                      {(item.price * item.qty).toLocaleString()} 
                      <span className="text-[9px] not-italic text-gray-500 ml-1">MAD</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[400px]">
            <div className="bg-[#0a0a0a] border border-white/10 p-10 sticky top-32">
              <h3 className="text-2xl font-serif text-white mb-10 italic">Order Summary</h3>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-gray-500 text-[10px] uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-brand-accent font-bold">Complimentary</span>
                </div>
              </div>

              <div className="flex justify-between text-white font-serif text-2xl py-10 border-t border-white/5">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold self-center">
                  Total
                </span>
                <span className="italic">
                  {subtotal.toLocaleString()} MAD
                </span>
              </div>

              <Link 
                to="/checkout" 
                className="w-full bg-white text-black py-5 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-brand-accent transition-all duration-500 shadow-xl"
              >
                Proceed to Checkout <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;