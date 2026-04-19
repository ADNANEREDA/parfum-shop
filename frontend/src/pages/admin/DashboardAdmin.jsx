import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Award,
  Box,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

const DashboardAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState('overview');
  
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const fetchDashboardData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      const [ordersRes, usersRes, productsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/orders', config),
        axios.get('http://localhost:5000/api/users', config).catch(() => ({ data: [] })),
        axios.get('http://localhost:5000/api/products')
      ]);

      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors du chargement des données", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [navigate]);

  const deliverHandler = async (orderId) => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.put(`http://localhost:5000/api/orders/${orderId}/deliver`, {}, config);
        fetchDashboardData(); 
        toast.success('Order marked as delivered');
      } catch (err) {
        alert('Erreur lors de la mise à jour');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Es-tu sûr de vouloir supprimer ce parfum définitivement ?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        toast.success('Fragrance permanently removed');
        fetchDashboardData(); 
      } catch (err) {
        alert(err.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath; 
    
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `http://localhost:5000${cleanPath}`; 
  };

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const totalOrders = orders.length;
  const activeClients = users.length;
  const totalProducts = products.length;

  const productSales = {};
  orders.forEach(order => {
    order.orderItems.forEach(item => {
      if (productSales[item.name]) {
        productSales[item.name] += item.qty;
      } else {
        productSales[item.name] = item.qty;
      }
    });
  });
  
  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto animate-pulse">
          
          <div className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
            <div>
              <div className="h-3 w-32 bg-brand-accent/20 rounded mb-4"></div>
              <div className="h-10 w-64 bg-white/10 rounded"></div>
            </div>
            <div className="text-right flex flex-col items-end">
               <div className="h-2 w-20 bg-white/10 rounded mb-2"></div>
               <div className="h-4 w-16 bg-brand-accent/20 rounded"></div>
            </div>
          </div>

          <div className="flex gap-8 mb-8 border-b border-white/10 pb-4">
             <div className="h-3 w-20 bg-brand-accent/30 rounded"></div>
             <div className="h-3 w-24 bg-white/5 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 h-32 flex flex-col justify-center">
                <div className="h-2 w-20 bg-white/10 rounded mb-4"></div>
                <div className="h-8 w-32 bg-white/5 rounded"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 h-[400px] p-6">
               <div className="h-5 w-48 bg-white/10 rounded mb-8"></div>
               <div className="space-y-6">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="h-4 w-full bg-white/5 rounded"></div>
                 ))}
               </div>
            </div>
            <div className="bg-[#0a0a0a] border border-white/5 h-[400px] p-6">
               <div className="h-5 w-32 bg-brand-accent/20 rounded mb-8"></div>
               <div className="space-y-6">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="flex gap-4 items-center">
                     <div className="h-8 w-8 rounded-full bg-brand-accent/10 shrink-0"></div>
                     <div className="h-4 w-full bg-white/5 rounded"></div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <span className="text-brand-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block flex items-center gap-2">
              <TrendingUp size={14} /> Executive Overview
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-white italic">Business Intelligence</h1>
          </div>
          <div className="text-right">
             <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Connected as</p>
             <p className="text-brand-accent text-sm font-serif italic">{userInfo.firstName || 'Admin'}</p>
          </div>
        </div>

        <div className="flex gap-8 mb-8 border-b border-white/10">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`pb-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'overview' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            className={`pb-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'products' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500 hover:text-white'}`}
          >
            Products Catalog
          </button>
        </div>

        {activeTab === 'overview' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-[#0a0a0a] border border-white/5 p-6 hover:border-brand-accent/40 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp size={60} className="text-brand-accent" />
                </div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Total Revenue</p>
                <p className="text-3xl font-serif text-white">{totalRevenue.toLocaleString()} <span className="text-brand-accent text-sm">MAD</span></p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-6 hover:border-brand-accent/40 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShoppingCart size={60} className="text-brand-accent" />
                </div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Total Orders</p>
                <p className="text-3xl font-serif text-white">{totalOrders}</p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-6 hover:border-brand-accent/40 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Users size={60} className="text-brand-accent" />
                </div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Active Clients</p>
                <p className="text-3xl font-serif text-white">{activeClients}</p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-6 hover:border-brand-accent/40 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Box size={60} className="text-brand-accent" />
                </div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Products in Catalog</p>
                <p className="text-3xl font-serif text-white">{totalProducts}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                  <h2 className="text-lg font-serif text-white italic">Recent Transactions</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-white border-collapse">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold">Order ID</th>
                        <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold">Client</th>
                        <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold">Total</th>
                        <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold">Status</th>
                        <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 10).map((order) => (
                        <tr key={order._id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                          <td className="p-4 text-[10px] text-gray-400 font-mono">{order._id.substring(0, 8)}</td>
                          <td className="p-4 text-xs font-semibold">{order.user ? order.user.firstName : 'Guest'}</td>
                          <td className="p-4 text-xs font-serif text-brand-accent">{order.totalPrice.toLocaleString()} MAD</td>
                          <td className="p-4">
                            {order.isDelivered ? (
                              <span className="inline-flex items-center gap-1 text-green-400 text-[8px] uppercase font-bold tracking-wider">
                                <CheckCircle size={10} /> Delivered
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-orange-400 text-[8px] uppercase font-bold tracking-wider">
                                <Clock size={10} /> Pending
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {!order.isDelivered && (
                              <button 
                                onClick={() => deliverHandler(order._id)}
                                className="bg-white text-black px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors"
                              >
                                Ship
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 shadow-2xl p-6 flex flex-col">
                <h2 className="text-lg font-serif text-white italic mb-6 flex items-center gap-2">
                  <Award size={18} className="text-brand-accent" /> Bestsellers
                </h2>
                {topProducts.length > 0 ? (
                  <div className="space-y-4 flex-grow overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-brand-accent/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center font-serif font-bold">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="text-sm text-white font-serif">{product[0]}</p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{product[1]} Unités vendues</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs italic">Aucune vente enregistrée pour le moment.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[#0a0a0a] border border-white/5 shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
              <h2 className="text-lg font-serif text-white italic">Fragrance Collection</h2>
              
              <button 
                onClick={() => navigate('/admin/product/new')}
                className="bg-brand-accent text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
              >
                <Plus size={14} /> Add New Fragrance
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-white border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold">Image</th>
                    <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold">Name</th>
                    <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold">Brand</th>
                    <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold">Price</th>
                    <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold">Stock</th>
                    <th className="p-4 text-[9px] uppercase tracking-widest text-gray-500 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                      <td className="p-4">
                        <img src={getImageUrl(product.image)} alt={product.name} className="w-12 h-12 object-cover rounded-sm grayscale hover:grayscale-0 transition-all" />
                      </td>
                      <td className="p-4 text-xs font-semibold">{product.name}</td>
                      <td className="p-4 text-[10px] text-gray-400 uppercase tracking-wider">{product.brand}</td>
                      <td className="p-4 text-xs font-serif text-brand-accent">{product.price} MAD</td>
                      <td className="p-4 text-xs">
                        {product.countInStock > 0 ? (
                          <span className="text-green-400 font-bold">{product.countInStock}</span>
                        ) : (
                          <span className="text-red-500 font-bold uppercase text-[9px] tracking-wider">Out of Stock</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-4">
                        <button 
                            onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                             className="text-gray-500 hover:text-brand-accent transition-colors inline-block">
                               <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => deleteHandler(product._id)}
                          className="text-gray-500 hover:text-red-500 transition-colors inline-block"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;