import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import boosmen from '../../assets/images/boss-pour-homme.png';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration!');
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-brand-dark">
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img 
          src={boosmen}
          alt="Exclusive Perfume Collection" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 relative">
        <Link to="/" className="absolute top-8 right-8 text-white hover:text-brand-accent text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300">
          ✕ Close
        </Link>

        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Create Account</h2>
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase mb-12 font-sans">
            Join our exclusive world of fragrances.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 mb-8 text-center tracking-widest uppercase font-bold">
              {error}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative group">
                <svg className="absolute left-0 top-0.5 w-4 h-4 text-white/40 peer-focus:text-brand-accent transition-colors duration-300 z-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <input 
                  type="text" id="firstName" required placeholder="First Name"
                  value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 pl-7 pb-3 text-white placeholder-transparent focus:outline-none focus:border-brand-accent peer text-sm font-sans transition-colors relative z-20" 
                />
                <label htmlFor="firstName" className="absolute left-0 -top-5 text-[10px] tracking-[0.2em] uppercase text-white/50 transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-0 peer-placeholder-shown:left-7 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-[10px] peer-focus:text-brand-accent cursor-text z-0">
                  First Name
                </label>
              </div>

              <div className="relative group">
                <svg className="absolute left-0 top-0.5 w-4 h-4 text-white/40 peer-focus:text-brand-accent transition-colors duration-300 z-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <input 
                  type="text" id="lastName" required placeholder="Last Name"
                  value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 pl-7 pb-3 text-white placeholder-transparent focus:outline-none focus:border-brand-accent peer text-sm font-sans transition-colors relative z-20" 
                />
                <label htmlFor="lastName" className="absolute left-0 -top-5 text-[10px] tracking-[0.2em] uppercase text-white/50 transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-0 peer-placeholder-shown:left-7 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-[10px] peer-focus:text-brand-accent cursor-text z-0">
                  Last Name
                </label>
              </div>
            </div>

            <div className="relative group">
              <svg className="absolute left-0 top-0.5 w-4 h-4 text-white/40 peer-focus:text-brand-accent transition-colors duration-300 z-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <input 
                type="email" id="emailRegister" required placeholder="Email Address"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pl-7 pb-3 text-white placeholder-transparent focus:outline-none focus:border-brand-accent peer text-sm font-sans transition-colors relative z-20" 
              />
              <label htmlFor="emailRegister" className="absolute left-0 -top-5 text-[10px] tracking-[0.2em] uppercase text-white/50 transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-0 peer-placeholder-shown:left-7 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-[10px] peer-focus:text-brand-accent cursor-text z-0">
                Email Address
              </label>
            </div>

            <div className="relative group">
              <svg className="absolute left-0 top-0.5 w-4 h-4 text-white/40 peer-focus:text-brand-accent transition-colors duration-300 z-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <input 
                type="password" id="passwordRegister" required placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pl-7 pb-3 text-white placeholder-transparent focus:outline-none focus:border-brand-accent peer text-sm font-sans transition-colors relative z-20" 
              />
              <label htmlFor="passwordRegister" className="absolute left-0 -top-5 text-[10px] tracking-[0.2em] uppercase text-white/50 transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-0 peer-placeholder-shown:left-7 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-[10px] peer-focus:text-brand-accent cursor-text z-0">
                Password
              </label>
            </div>

            <div className="relative group">
              <svg className="absolute left-0 top-0.5 w-4 h-4 text-white/40 peer-focus:text-brand-accent transition-colors duration-300 z-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <input 
                type="password" id="confirmPassword" required placeholder="Confirm Password"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pl-7 pb-3 text-white placeholder-transparent focus:outline-none focus:border-brand-accent peer text-sm font-sans transition-colors relative z-20" 
              />
              <label htmlFor="confirmPassword" className="absolute left-0 -top-5 text-[10px] tracking-[0.2em] uppercase text-white/50 transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-0 peer-placeholder-shown:left-7 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-[10px] peer-focus:text-brand-accent cursor-text z-0">
                Confirm Password
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-brand-accent text-brand-dark py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-colors duration-500 mt-8"
            >
              Create Account
            </button>
          </form>

          <div className="mt-12 text-center text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold">
            Already a member? 
            <Link to="/login" className="text-white hover:text-brand-accent transition-colors ml-3 border-b border-white/30 hover:border-brand-accent pb-1">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;