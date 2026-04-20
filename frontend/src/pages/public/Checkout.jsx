import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const BACKEND_URL = "https://parfum-shop-seven.vercel.app";
  

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [shippingAddress, setShippingAddress] = useState({
    address: '', city: '', postalCode: '', country: 'Morocco'
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error('Please login first to complete your purchase.');
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          size: item.size,
          product: item._id 
        })),
        shippingAddress,
        paymentMethod: 'Cash on Delivery',
        totalPrice,
        user: userInfo._id 
      };
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`${BACKEND_URL}/api/orders`, orderData, config);

      if (data) {
        clearCart();
        toast.success('Order placed successfully!Thank you for shopping with us.');
        navigate('/dashboard'); 
      }
    } catch (err) {
      console.error("Server Error:", err.response?.data);
      alert('Error placing order. Please check the information and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-[#0a0a0a] border border-white/5 p-10 shadow-2xl">
          <h2 className="text-3xl font-serif text-white mb-8 italic uppercase tracking-wider">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Street Address</label>
                <input required type="text" className="bg-transparent border-b border-white/10 py-2 text-white outline-none focus:border-brand-accent transition-colors font-sans" onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">City</label>
                  <input required type="text" className="bg-transparent border-b border-white/10 py-2 text-white outline-none focus:border-brand-accent transition-colors" onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Postal Code</label>
                  <input required type="text" className="bg-transparent border-b border-white/10 py-2 text-white outline-none focus:border-brand-accent transition-colors" onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Country</label>
                <input required type="text" value="Morocco" disabled className="bg-transparent border-b border-white/10 py-2 text-gray-400 outline-none font-bold" />
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 font-bold">Payment Method</h3>
              <div className="flex items-center gap-4 p-5 bg-white/[0.02] border border-brand-accent/30 rounded-sm">
                <CreditCard size={18} className="text-brand-accent" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">Cash on Delivery</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-white text-black py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-brand-accent hover:text-black transition-all duration-500 shadow-xl">
              Complete Purchase
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0a0a0a] border border-white/5 p-10 shadow-2xl">
            <h3 className="text-xl font-serif text-white mb-8 italic text-center uppercase tracking-widest">Order Summary</h3>

            <div className="max-h-[350px] overflow-y-auto space-y-4 mb-8 pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 border-b border-white/5 pb-5">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-black flex items-center justify-center p-2 border border-white/5">
                      <img
                        src={item.image.startsWith('http') ? item.image : `${BACKEND_URL}${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-contain opacity-80"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-white font-bold">{item.name}</span>
                      <span className="text-[8px] text-brand-accent">Quantity: x{item.qty}</span>
                    </div>
                  </div>

                  <span className="text-white font-serif italic text-sm">
                    {(item.price * item.qty).toLocaleString()} MAD
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-500">
                <span>Subtotal</span>
                <span className="text-white">{totalPrice.toLocaleString()} MAD</span>
              </div>

              <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-500">
                <span>Shipping</span>
                <span className="text-brand-accent font-bold italic">Complimentary</span>
              </div>

              <div className="flex justify-between items-center pt-8 mt-4 border-t border-white/10">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-white underline decoration-brand-accent underline-offset-8">Grand Total</span>
                <span className="text-3xl font-serif text-white font-bold italic">{totalPrice.toLocaleString()} MAD</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/[0.02] p-6 flex flex-col items-center text-center gap-3 border border-white/5 hover:border-brand-accent/30 transition-colors">
              <ShieldCheck size={24} className="text-brand-accent" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Secure Transactions</span>
            </div>

            <div className="bg-white/[0.02] p-6 flex flex-col items-center text-center gap-3 border border-white/5 hover:border-brand-accent/30 transition-colors">
              <Truck size={24} className="text-brand-accent" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Morocco Express Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;