import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import women from '../../assets/images/boss_women.png';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null);     

    try {
      const { data } = await axios.post('https://parfum-shop-seven.vercel.app/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      
      if (data.isAdmin) {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/dashboard'); 
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-brand-dark">
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img 
          src={women} 
          alt="Luxury Perfume" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 relative">
        <Link to="/" className="absolute top-8 right-8 text-white hover:text-brand-accent text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300">
          ✕ Close
        </Link>

        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase mb-12 font-sans">
            Sign in to your exclusive account.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 mb-8 text-center tracking-widest uppercase font-bold">
              {error}
            </div>
          )}

          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="relative group">
              <svg className="absolute left-0 bottom-3.5 w-4 h-4 text-white/40 peer-focus:text-brand-accent transition-colors duration-300 z-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>

              <input 
                type="email" 
                id="email" 
                required 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pl-7 pb-3 text-white placeholder-transparent focus:outline-none focus:border-brand-accent peer text-sm font-sans transition-colors relative z-20" 
              />

              <label htmlFor="email" className="absolute left-0 -top-5 text-[10px] tracking-[0.2em] uppercase text-white/50 transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-0 peer-placeholder-shown:left-7 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-[10px] peer-focus:text-brand-accent cursor-text z-0">
                Email Address
              </label>
            </div>

            <div className="relative group">
              <svg className="absolute left-0 bottom-3.5 w-4 h-4 text-white/40 peer-focus:text-brand-accent transition-colors duration-300 z-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                required 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pl-7 pr-8 pb-3 text-white placeholder-transparent focus:outline-none focus:border-brand-accent peer text-sm font-sans transition-colors relative z-20" 
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 bottom-3.5 text-gray-500 hover:text-brand-accent transition-colors z-30 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              <label htmlFor="password" className="absolute left-0 -top-5 text-[10px] tracking-[0.2em] uppercase text-white/50 transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-0 peer-placeholder-shown:left-7 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-[10px] peer-focus:text-brand-accent cursor-text z-0">
                Password
              </label>
            </div>

            <div className="flex justify-end mt-2">
              <Link to="/forgot-password" className="text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-brand-accent transition-colors font-bold">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="w-full bg-brand-accent text-brand-dark py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-colors duration-500 mt-4"
            >
              Sign In
            </button>
          </form>

          <div className="mt-16 text-center text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold">
            Don't have an account? 
            <Link to="/register" className="text-white hover:text-brand-accent transition-colors ml-3 border-b border-white/30 hover:border-brand-accent pb-1">
              Create One
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;