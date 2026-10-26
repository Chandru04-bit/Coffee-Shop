export const CATEGORIES = [
  { id: 'all', label: 'All Coffee' },
  { id: 'macchiato', label: 'Macchiato' },
  { id: 'latte', label: 'Latte' },
  { id: 'americano', label: 'Americano' }
];

export const COFFEE_PRODUCTS = [
  {
    id: 'caffe-mocha',
    name: 'Caffe Mocha',
    category: 'latte',
    subCategory: 'Deep Foam',
    rating: 4.8,
    reviewCount: 230,
    price: 4.53,
    description: 'A caffe mocha, also called mocaccino, is a chocolate-flavoured variant of a caffe latte. Other commonly used spellings are mochaccino and also mochachino. Made with premium espresso, rich chocolate syrup, and silky steamed milk topped with fine foam.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    bannerFeatured: true,
    roastLevel: 'Medium Roast',
    milkOptions: ['Oat Milk', 'Whole Milk', 'Almond Milk'],
    sizes: {
      S: 4.03,
      M: 4.53,
      L: 5.03
    }
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    category: 'latte',
    subCategory: 'Espresso',
    rating: 4.9,
    reviewCount: 420,
    price: 3.53,
    description: 'A flat white is an espresso drink consisting of espresso with microfoam. It is comparable to a latte, but smaller in volume and with microfoam, having a higher proportion of coffee to milk and a velvety texture.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    bannerFeatured: false,
    roastLevel: 'Dark Roast',
    milkOptions: ['Whole Milk', 'Oat Milk'],
    sizes: {
      S: 3.10,
      M: 3.53,
      L: 4.10
    }
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'macchiato',
    subCategory: 'Rich & Sweet',
    rating: 4.9,
    reviewCount: 310,
    price: 4.99,
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle for an oh-so-sweet finish. A signature favorite of coffee lovers around the world.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80',
    bannerFeatured: false,
    roastLevel: 'Medium Roast',
    milkOptions: ['Whole Milk', 'Oat Milk', 'Soy Milk'],
    sizes: {
      S: 4.49,
      M: 4.99,
      L: 5.49
    }
  },
  {
    id: 'caffe-latte',
    name: 'Caffe Latte',
    category: 'latte',
    subCategory: 'Steamed Milk',
    rating: 4.7,
    reviewCount: 185,
    price: 4.20,
    description: 'Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm beverage that brings calm and delight to every sip.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    bannerFeatured: false,
    roastLevel: 'Light-Medium',
    milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk'],
    sizes: {
      S: 3.70,
      M: 4.20,
      L: 4.70
    }
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'americano',
    subCategory: 'Rich Blend',
    rating: 4.6,
    reviewCount: 142,
    price: 3.20,
    description: 'Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance. Prepared with freshly ground Arabica beans.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    bannerFeatured: false,
    roastLevel: 'Dark Roast',
    milkOptions: ['None (Black)', 'Splash of Cream'],
    sizes: {
      S: 2.80,
      M: 3.20,
      L: 3.60
    }
  },
  {
    id: 'hazelnut-macchiato',
    name: 'Hazelnut Macchiato',
    category: 'macchiato',
    subCategory: 'Nutty Aroma',
    rating: 4.8,
    reviewCount: 198,
    price: 4.75,
    description: 'Espresso poured gently over steamed milk infused with roasted hazelnut syrup, finished with a subtle hazelnut crunch drizzle. Warm, fragrant and exceptionally cozy.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    bannerFeatured: false,
    roastLevel: 'Medium Roast',
    milkOptions: ['Whole Milk', 'Oat Milk'],
    sizes: {
      S: 4.25,
      M: 4.75,
      L: 5.25
    }
  },
  {
    id: 'iced-americano',
    name: 'Iced Americano',
    category: 'americano',
    subCategory: 'Cold Brew Style',
    rating: 4.8,
    reviewCount: 260,
    price: 3.60,
    description: 'Bold espresso poured over crystal-clear chilled ice and cold filtered water. Crisp, refreshing, and the ultimate clean caffeine boost for sunny afternoons.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    bannerFeatured: false,
    roastLevel: 'Dark Roast',
    milkOptions: ['None (Black)', 'Splash of Oat Milk'],
    sizes: {
      S: 3.10,
      M: 3.60,
      L: 4.10
    }
  },
  {
    id: 'vanilla-latte',
    name: 'Vanilla Latte',
    category: 'latte',
    subCategory: 'Sweet Bean',
    rating: 4.7,
    reviewCount: 215,
    price: 4.40,
    description: 'Rich full-bodied espresso blended with pure Madagascar vanilla extract and steamed milk, capped with delicate microfoam for a sweet, uplifting taste.',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=800&q=80',
    bannerFeatured: false,
    roastLevel: 'Medium Roast',
    milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk'],
    sizes: {
      S: 3.90,
      M: 4.40,
      L: 4.90
    }
  }
];

export const COURIER_INFO = {
  name: 'Johan Bleas',
  role: 'Personal Courier',
  phone: '+1 (555) 234-8921',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  vehicle: 'Honda Scoopy • B 6412 KPG',
  rating: 4.9,
  deliveries: 1240
};

export const INITIAL_ADDRESS = {
  title: 'Jl. Kpg Sutoyo No. 620',
  subtitle: 'Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai',
  city: 'Bilzen, Tanjungbalai',
  postalCode: '21321',
  note: 'Leave package at front porch or ring doorbell twice.'
};

export const PROMO_CODES = [
  {
    code: 'BOGO2026',
    title: 'Buy 1 Get 1 FREE',
    discountAmount: 1.00,
    minSpend: 4.00,
    description: 'Special promotion: $1.00 instant deduction on your coffee order!'
  },
  {
    code: 'COZYDEAL',
    title: 'Cozy Morning 20% OFF',
    discountAmount: 1.50,
    minSpend: 6.00,
    description: 'Save $1.50 on orders above $6.00'
  }
];
