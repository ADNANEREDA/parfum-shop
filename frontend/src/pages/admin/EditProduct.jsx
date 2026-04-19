import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: 0,
    image: '',
    category: 'Parfum',
    gender: 'Unisexe',
    countInStock: 0,
    description: '',
    sizes: ['50ml', '100ml'],
    isFeatured: false,
    freeShipping: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setFormData({
          name: data.name,
          brand: data.brand,
          price: data.price,
          image: data.image,
          category: data.category,
          gender: data.gender,
          countInStock: data.countInStock,
          description: data.description,
          sizes: data.sizes || ['50ml', '100ml'],
          isFeatured: data.isFeatured || false,
          freeShipping: data.freeShipping !== undefined ? data.freeShipping : true
        });
        setFetching(false);
      } catch (err) {
        console.error(err);
        setError('Erreur lors de la récupération du parfum');
        setFetching(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('http://localhost:5000/api/upload', formDataUpload, config);

      const formattedPath = data.replace(/\\/g, '/');
      const finalPath = formattedPath.startsWith('/') ? formattedPath : `/${formattedPath}`;

      setFormData({ ...formData, image: finalPath });
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
      toast.error('Image upload failed. Please try again.');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`http://localhost:5000/api/products/${productId}`, formData, config);

      toast.success('Fragrance updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Erreur lors de la modification');
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `http://localhost:5000${cleanPath}`;
  };

  if (fetching) return <div className="min-h-screen bg-[#050505] text-white flex justify-center items-center">Loading Fragrance Data...</div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 font-sans">
      <div className="max-w-3xl mx-auto">

        <Link to="/admin/dashboard" className="text-gray-500 hover:text-brand-accent flex items-center gap-2 mb-8 text-[10px] uppercase tracking-widest font-bold transition-colors">
          <ArrowLeft size={14} /> Back to Command Center
        </Link>

        <div className="mb-10 border-b border-white/10 pb-6">
          <span className="text-brand-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block flex items-center gap-2">
            <Sparkles size={14} /> Edit Fragrance
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-white italic">Update {formData.name}</h1>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 mb-6 text-sm">{error}</div>}

        <form onSubmit={submitHandler} className="bg-[#0a0a0a] border border-white/5 p-8 shadow-2xl space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Fragrance Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 text-white pb-2 focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Brand</label>
              <input type="text" name="brand" required value={formData.brand} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 text-white pb-2 focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Price (MAD)</label>
              <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 text-white pb-2 focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Stock Count</label>
              <input type="number" name="countInStock" required value={formData.countInStock} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 text-white pb-2 focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-[#0a0a0a] border-b border-white/20 text-white pb-2 focus:outline-none focus:border-brand-accent transition-colors">
                <option value="Homme">Men</option>
                <option value="Femme">Women</option>
                <option value="Unisexe">Unisex</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Change Image (Optional)</label>
            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/10 p-4 rounded-sm">
              <div className="w-16 h-16 bg-black border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                {formData.image ? (
                  <img src={getImageUrl(formData.image)} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[8px] text-gray-600 uppercase text-center">No Image</span>
                )}
              </div>

              <div className="flex-1">
                <input type="file" onChange={uploadFileHandler} className="block w-full text-xs text-gray-400 file:mr-4 file:py-1.5 file:px-4 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:bg-brand-accent file:text-black hover:file:bg-white transition-colors cursor-pointer" />
                {uploading && <span className="text-brand-accent text-[10px] font-bold uppercase mt-2 block animate-pulse">Uploading Image...</span>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Description</label>
            <textarea name="description" required value={formData.description} onChange={handleChange} rows="4" className="w-full bg-transparent border border-white/20 text-white p-4 focus:outline-none focus:border-brand-accent transition-colors text-sm"></textarea>
          </div>

          <div className="flex gap-8 pt-4 border-t border-white/5">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="accent-brand-accent w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-white transition-colors">Bestseller / Featured</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" name="freeShipping" checked={formData.freeShipping} onChange={handleChange} className="accent-brand-accent w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-white transition-colors">Free Shipping</span>
            </label>
          </div>

          <div className="pt-6">
            <button type="submit" disabled={loading} className="w-full bg-brand-accent text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors flex justify-center items-center gap-2">
              {loading ? 'Updating...' : <><Save size={16} /> Update Fragrance</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;