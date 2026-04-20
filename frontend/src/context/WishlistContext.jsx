import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userInfo && userInfo.token) {
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.get('https://parfum-shop-seven.vercel.app/api/users/wishlist', config);
          setWishlistItems(data);
        } catch (error) {
          console.error("Erreur lors du chargement de la wishlist:", error);
        }
      } else {
        const saved = localStorage.getItem('parfum_wishlist_guest');
        if (saved) setWishlistItems(JSON.parse(saved));
      }
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    const isExist = wishlistItems.find((item) => item._id === product._id);
    let newWishlist;

    if (isExist) {
      newWishlist = wishlistItems.filter((item) => item._id !== product._id);
    } else {
      newWishlist = [...wishlistItems, product];
      toast.success('Added to wishlist!');
    }

    setWishlistItems(newWishlist);

    if (userInfo && userInfo.token) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.post(
          'https://parfum-shop-seven.vercel.app/api/users/wishlist',
          { productId: product._id },
          config
        );
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de la wishlist:", error);
      }
    } else {
      localStorage.setItem('parfum_wishlist_guest', JSON.stringify(newWishlist));
    }
  };

  const isInWishlist = (id) => wishlistItems.some((item) => item._id === id);

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);