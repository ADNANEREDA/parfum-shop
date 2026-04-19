import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const storageKey = userInfo ? `parfum_cart_${userInfo._id}` : 'parfum_cart_guest';

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(storageKey);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey]);

  const addToCart = (product, quantity = 1, size = '100ml') => {
    setCartItems((prevItems) => {
      const exists = prevItems.find(item => item._id === product._id && item.size === size);
      
      if (exists) {
        return prevItems.map(item => 
          (item._id === product._id && item.size === size) 
          ? { ...item, qty: item.qty + quantity } 
          : item
        );
      }
      return [...prevItems, { ...product, qty: quantity, size }];
    });
    toast.success(`${product.name} added to your bag`);
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter(item => !(item._id === id && item.size === size)));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);