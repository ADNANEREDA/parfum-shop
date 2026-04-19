
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Dashboard from './pages/public/DashboardUser';
import Catalog from './pages/public/Catalog'; 
import ProductDetails from './pages/shop/ProductDetails';
import Wishlist from './pages/public/Wishlist';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Cart from './pages/public/Cart';
import Checkout from './pages/public/Checkout';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import NewArrivals from './pages/public/NewArrivals';
import GiftSets from './pages/public/GiftSets';
import Contact from './pages/public/Contact';
import Footer from './components/layout/Footer';
import NotFound from './pages/public/NotFound';
import ScrollToTop from './components/common/ScrollToTop';
import { Toaster } from 'react-hot-toast';



const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Toaster 
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              // Style des notifications
              style: {
                background: '#0a0a0a', 
                color: '#fff',         
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '0px',   
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                padding: '16px 24px',
              },
              success: {
                iconTheme: {
                  primary: '#D4AF37', 
                  secondary: '#000',
                },
              },
            }}
          />
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/perfumes" element={<Catalog />} /> 
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/gift-sets" element={<GiftSets />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/product/new" element={<AddProduct />} />
              <Route path="/admin/product/:id/edit" element={<EditProduct />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin/dashboard" element={<DashboardAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Ces pages sont réservées à l'authentification */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;