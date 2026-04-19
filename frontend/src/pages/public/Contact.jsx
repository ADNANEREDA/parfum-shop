import { useState } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronUp, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      question: "Are your fragrances 100% authentic?",
      answer: "Absolutely. We guarantee that all our products are 100% original, sourced directly from authorized luxury distributors."
    },
    {
      question: "What are your shipping times and costs?",
      answer: "We offer free shipping on all orders over 500 MAD. Standard delivery takes 2 to 4 business days anywhere in Morocco."
    },
    {
      question: "Can I return a perfume or gift set?",
      answer: "Yes, we accept returns within 14 days of delivery, provided the item is unopened, sealed in its original packaging, and unused."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you can track its status at any time by logging into your account and visiting the 'Dashboard' section."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await axios.post('http://localhost:5000/api/contact', formData);

      setStatus({ type: 'success', text: 'Message sent successfully! Our team will contact you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">We are here for you</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 italic">Client Services</h1>
          <div className="w-16 h-[1px] bg-brand-accent/40 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="text-2xl font-serif text-white italic mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left focus:outline-none group"
                  >
                    <span className={`text-xs md:text-sm tracking-[0.1em] font-sans uppercase transition-colors ${openFaq === index ? 'text-brand-accent' : 'text-gray-300 group-hover:text-white'}`}>
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp size={16} className="text-brand-accent ml-4 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-500 group-hover:text-white ml-4 flex-shrink-0 transition-colors" />
                    )}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-400 text-xs leading-relaxed font-sans tracking-wider">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 space-y-6">
              <div className="flex items-center gap-4 text-gray-400">
                <Phone size={18} className="text-brand-accent" />
                <span className="text-xs tracking-widest font-sans uppercase">+212 6 00 00 00 00</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <Mail size={18} className="text-brand-accent" />
                <span className="text-xs tracking-widest font-sans uppercase">contact@parfumshop.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <MapPin size={18} className="text-brand-accent" />
                <span className="text-xs tracking-widest font-sans uppercase">Casablanca, Morocco</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] p-8 md:p-12 border border-white/5 shadow-2xl">
            <h2 className="text-2xl font-serif text-white italic mb-2">Send us a message</h2>
            <p className="text-gray-500 text-[10px] tracking-widest uppercase mb-6">Our team will reply within 24 hours.</p>

            {status && (
              <div className={`mb-6 p-4 text-xs tracking-widest uppercase font-bold text-center border ${status.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
                {status.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-600 focus:border-brand-accent text-white text-xs tracking-widest uppercase py-2 outline-none transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute left-0 top-2 text-gray-500 text-xs tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-brand-accent peer-valid:-top-4 peer-valid:text-[9px]">Full Name</label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-600 focus:border-brand-accent text-white text-xs tracking-widest uppercase py-2 outline-none transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="absolute left-0 top-2 text-gray-500 text-xs tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-brand-accent peer-valid:-top-4 peer-valid:text-[9px]">Email Address</label>
                </div>
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-600 focus:border-brand-accent text-white text-xs tracking-widest uppercase py-2 outline-none transition-colors peer"
                  placeholder=" "
                />
                <label htmlFor="subject" className="absolute left-0 top-2 text-gray-500 text-xs tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-brand-accent peer-valid:-top-4 peer-valid:text-[9px]">Subject</label>
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-600 focus:border-brand-accent text-white text-xs tracking-widest uppercase py-2 outline-none transition-colors peer resize-none"
                  placeholder=" "
                ></textarea>
                <label htmlFor="message" className="absolute left-0 top-2 text-gray-500 text-xs tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-brand-accent peer-valid:-top-4 peer-valid:text-[9px]">Your Message</label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold tracking-[0.3em] uppercase text-xs py-4 hover:bg-brand-accent transition-colors duration-300 mt-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;