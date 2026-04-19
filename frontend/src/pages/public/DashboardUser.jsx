import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Package, Clock, LogOut, Heart } from 'lucide-react';

const DashboardUser = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) {
      setUser(storedUser);
      fetchOrders(storedUser._id);
      fetchWishlist(storedUser.token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchOrders = async (userId) => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/orders/myorders/${userId}`);
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWishlist = async (token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const { data } = await axios.get(`${BACKEND_URL}/api/users/wishlist`, config);
      setWishlist(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems'); 
    window.location.href = '/login';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <span className="text-brand-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Client Portal</span>
            <h1 className="text-3xl md:text-5xl font-serif text-white italic tracking-tighter">
              Welcome back, {user.firstName || user.name} {user.lastName}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="text-red-400/70 hover:text-red-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          <aside className="lg:col-span-1 bg-white/[0.02] border border-white/5 p-8 h-fit">
            <h2 className="text-xl font-serif text-white mb-6 italic">Profile</h2>

            <div className="space-y-6">
              <div>
                <p className="text-white/40 text-[9px] uppercase tracking-widest mb-1">Email</p>
                <p className="text-white text-sm break-all">{user.email}</p>
              </div>

              <div>
                <p className="text-white/40 text-[9px] uppercase tracking-widest mb-1">Status</p>
                <p className="text-brand-accent text-[10px] uppercase font-bold">
                  {user.isAdmin ? 'Admin Member' : 'Platinum Client'}
                </p>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-16">

            <section>
              <h2 className="text-xl font-serif text-white mb-6 italic">Order History</h2>

              {loading ? (
                <p className="text-brand-accent animate-pulse italic">Retrieving your data...</p>
              ) : orders.length === 0 ? (
                <div className="p-20 border border-white/5 text-center bg-white/[0.01]">
                  <Package size={40} className="mx-auto text-white/10 mb-4" />
                  <p className="text-gray-500 uppercase tracking-widest text-[10px]">No orders found yet.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="bg-white/[0.02] border border-white/5 p-6 mb-6 hover:border-brand-accent/30 transition-all">

                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[9px] text-white/30 uppercase tracking-widest">
                        Order ID: {order._id}
                      </span>

                      <span className={`text-[8px] px-3 py-1 uppercase font-bold tracking-wider ${
                        order.isDelivered
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-brand-accent/10 text-brand-accent'
                      }`}>
                        {order.isDelivered ? 'Delivered' : 'In Preparation'}
                      </span>
                    </div>

                    <div className="flex gap-4 mb-6 overflow-x-auto pb-2 custom-scrollbar">
                      {order.orderItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="w-14 h-20 shrink-0 bg-black border border-white/5 flex items-center justify-center overflow-hidden"
                        >
                          <img
                            src={item.image?.startsWith('http') ? item.image : `${BACKEND_URL}${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-contain opacity-80"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Fragrance';
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-white/40">
                        <Clock size={12} />
                        <span className="text-[10px] tracking-widest">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-white font-serif text-lg italic">
                        {order.totalPrice.toLocaleString()} MAD
                      </p>
                    </div>
                  </div>
                ))
              )}
            </section>

            <section>
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-serif text-white italic">My Wishlist</h2>

                <Link
                  to="/perfumes"
                  className="text-brand-accent text-[9px] uppercase tracking-[0.3em] font-bold hover:text-white transition-colors"
                >
                  Explore Catalog
                </Link>
              </div>

              {loading ? (
                <p className="text-brand-accent animate-pulse italic">Loading your favorites...</p>
              ) : wishlist.length === 0 ? (
                <div className="p-16 border border-white/5 text-center bg-white/[0.01]">
                  <Heart size={30} className="mx-auto text-white/10 mb-4" />
                  <p className="text-gray-500 uppercase tracking-widest text-[10px]">
                    Your wishlist is currently empty.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div key={item._id} className="bg-white/[0.02] border border-white/5 overflow-hidden group">

                      <div className="aspect-[4/5] bg-black p-4 overflow-hidden relative flex items-center justify-center">
                        <img
                          src={item.image?.startsWith('http') ? item.image : `${BACKEND_URL}${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 opacity-90"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=Fragrance';
                          }}
                        />
                      </div>

                      <div className="p-5 text-center border-t border-white/5">
                        <p className="text-brand-accent text-[8px] font-bold tracking-[0.3em] uppercase mb-1">
                          {item.brand}
                        </p>

                        <h3 className="text-white text-sm font-serif truncate italic">
                          {item.name}
                        </h3>

                        <p className="text-white/60 text-[10px] mt-2 font-sans tracking-widest">
                          {item.price?.toLocaleString()} MAD
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;