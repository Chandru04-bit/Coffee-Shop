import React, { createContext, useContext, useState, useEffect } from 'react';
import { COFFEE_PRODUCTS, INITIAL_ADDRESS, PROMO_CODES, COURIER_INFO } from '../data/coffeeData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('coffee_favorites');
      return saved ? JSON.parse(saved) : ['caffe-mocha', 'caramel-macchiato'];
    } catch {
      return ['caffe-mocha', 'caramel-macchiato'];
    }
  });

  // Cart: initial item matches Figma Order Screen (Caffe Mocha, M size, 1 qty, $4.53)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('coffee_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    const defaultProduct = COFFEE_PRODUCTS[0];
    return [
      {
        coffeeId: defaultProduct.id,
        name: defaultProduct.name,
        subCategory: defaultProduct.subCategory,
        image: defaultProduct.image,
        size: 'M',
        price: defaultProduct.sizes.M,
        quantity: 1
      }
    ];
  });

  // Search & Categories
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Delivery / Order Settings
  const [deliveryType, setDeliveryType] = useState('deliver'); // 'deliver' or 'pickup'
  const [address, setAddress] = useState(INITIAL_ADDRESS);
  const [appliedPromo, setAppliedPromo] = useState(PROMO_CODES[0]); // BOGO discount by default
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'wallet'
  const [walletBalance, setWalletBalance] = useState(24.50);

  // Active placed order for delivery tracking
  const [activeOrder, setActiveOrder] = useState(() => {
    return {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      items: [
        {
          coffeeId: 'caffe-mocha',
          name: 'Caffe Mocha',
          subCategory: 'Deep Foam',
          image: COFFEE_PRODUCTS[0].image,
          size: 'M',
          price: 4.53,
          quantity: 1
        }
      ],
      total: 4.53,
      deliveryType: 'deliver',
      address: INITIAL_ADDRESS,
      courier: COURIER_INFO,
      status: 'on_the_way', // 'confirmed', 'brewing', 'on_the_way', 'delivered'
      createdAt: new Date().toISOString(),
      etaMinutes: 10
    };
  });

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('coffee_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Sync cart
  useEffect(() => {
    try {
      localStorage.setItem('coffee_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const toggleFavorite = (coffeeId) => {
    setFavorites(prev => {
      const exists = prev.includes(coffeeId);
      const next = exists ? prev.filter(id => id !== coffeeId) : [...prev, coffeeId];
      showToast(exists ? 'Removed from Favorites' : 'Added to Favorites ❤️', 'favorite');
      return next;
    });
  };

  const isFavorite = (coffeeId) => favorites.includes(coffeeId);

  const addToCart = (coffee, size = 'M', quantity = 1) => {
    const unitPrice = coffee.sizes ? coffee.sizes[size] : coffee.price;
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.coffeeId === coffee.id && item.size === size);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            coffeeId: coffee.id,
            name: coffee.name,
            subCategory: coffee.subCategory,
            image: coffee.image,
            size,
            price: unitPrice,
            quantity
          }
        ];
      }
    });
    showToast(`Added ${quantity}x ${coffee.name} (${size}) to cart!`, 'cart');
  };

  const updateCartQuantity = (index, delta) => {
    setCart(prev => {
      const next = [...prev];
      const target = next[index];
      if (!target) return prev;
      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        next.splice(index, 1);
        showToast('Item removed from cart', 'info');
      } else {
        next[index] = { ...target, quantity: newQty };
      }
      return next;
    });
  };

  const removeCartItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = deliveryType === 'deliver' ? (subtotal > 0 ? 1.00 : 0) : 0;
  const discount = appliedPromo && subtotal >= appliedPromo.minSpend ? appliedPromo.discountAmount : 0;
  const finalTotal = Math.max(0, subtotal + deliveryFee - discount);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Place order
  const placeOrder = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty! Please add coffee first.', 'error');
      return null;
    }

    if (paymentMethod === 'wallet' && walletBalance < finalTotal) {
      showToast('Insufficient wallet balance!', 'error');
      return null;
    }

    if (paymentMethod === 'wallet') {
      setWalletBalance(prev => +(prev - finalTotal).toFixed(2));
    }

    const newOrder = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      subtotal: +subtotal.toFixed(2),
      deliveryFee: +deliveryFee.toFixed(2),
      discount: +discount.toFixed(2),
      total: +finalTotal.toFixed(2),
      deliveryType,
      address,
      courier: COURIER_INFO,
      status: 'on_the_way',
      createdAt: new Date().toISOString(),
      etaMinutes: 10
    };

    setActiveOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        cart,
        addToCart,
        updateCartQuantity,
        removeCartItem,
        clearCart,
        subtotal,
        deliveryFee,
        discount,
        finalTotal,
        totalItemsCount,
        deliveryType,
        setDeliveryType,
        address,
        setAddress,
        appliedPromo,
        setAppliedPromo,
        paymentMethod,
        setPaymentMethod,
        walletBalance,
        activeOrder,
        setActiveOrder,
        placeOrder,
        toast,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
