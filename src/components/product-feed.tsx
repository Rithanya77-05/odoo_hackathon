import React, { useState, useEffect } from 'react';
import { Navigation } from './navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { SocialFooter } from './social-footer';
import { Search, Plus, Heart, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User, Product } from '../App';
import { CATEGORIES } from '../App';

interface ProductFeedProps {
  onNavigate: (screen: string, product?: Product) => void;
  currentUser: User | null;
}

export function ProductFeed({ onNavigate, currentUser }: ProductFeedProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [wishlistedItems, setWishlistedItems] = useState<string[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('ecofinds_wishlist');
    if (savedWishlist) {
      setWishlistedItems(JSON.parse(savedWishlist));
    }

    // Load products from localStorage
    const savedProducts = localStorage.getItem('ecofinds_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with 5 products per category (40 total products)
      const sampleProducts: Product[] = [
        // Electronics (5 products)
        {
          id: '1',
          title: 'Vintage Computer Terminal',
          description: 'Classic computer terminal from the 80s, fully functional and restored',
          category: 'Electronics',
          price: 12499,
          image: 'https://images.unsplash.com/photo-1693921289604-aa37858636e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller',
          createdAt: new Date().toISOString(),
          rating: 4.5,
          isWishlisted: false
        },
        {
          id: '2',
          title: 'Antique Film Camera',
          description: 'Beautiful vintage film camera in excellent condition, perfect for photography enthusiasts',
          category: 'Electronics',
          price: 7499,
          image: 'https://images.unsplash.com/photo-1633345136287-23889e21db00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-2',
          createdAt: new Date().toISOString(),
          rating: 4.8,
          isWishlisted: false
        },
        {
          id: '3',
          title: 'Classic Radio Set',
          description: 'Restored vintage radio with amazing sound quality, a true collector\'s piece',
          category: 'Electronics',
          price: 10500,
          image: 'https://images.unsplash.com/photo-1721120072373-067e50e32944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-3',
          createdAt: new Date().toISOString(),
          rating: 4.2,
          isWishlisted: false
        },
        {
          id: '4',
          title: 'Vintage Turntable',
          description: 'High-quality vintage turntable for vinyl enthusiasts, recently serviced',
          category: 'Electronics',
          price: 24999,
          image: 'https://images.unsplash.com/photo-1716072912080-0550a8945c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-4',
          createdAt: new Date().toISOString(),
          rating: 4.9,
          isWishlisted: false
        },
        {
          id: '5',
          title: 'Retro Headphones',
          description: 'Vintage-style headphones with modern audio quality, perfect condition',
          category: 'Electronics',
          price: 5400,
          image: 'https://images.unsplash.com/photo-1739764574592-1dcd5d978a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-5',
          createdAt: new Date().toISOString(),
          rating: 4.6,
          isWishlisted: false
        },
        // Home & Garden (5 products)
        {
          id: '6',
          title: 'Antique Wooden Chair',
          description: 'Beautiful handcrafted wooden chair with intricate details, perfect for any home',
          category: 'Home & Garden',
          price: 14600,
          image: 'https://images.unsplash.com/photo-1636152691887-75e33f4d2cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-6',
          createdAt: new Date().toISOString(),
          rating: 4.7,
          isWishlisted: false
        },
        {
          id: '7',
          title: 'Vintage Planter Set',
          description: 'Charming antique planters perfect for indoor gardening and home decoration',
          category: 'Home & Garden',
          price: 3850,
          image: 'https://images.unsplash.com/photo-1644419306509-bd379c9ac127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-7',
          createdAt: new Date().toISOString(),
          rating: 4.3,
          isWishlisted: false
        },
        {
          id: '8',
          title: 'Classic Kitchenware Set',
          description: 'Vintage copper kitchenware set, functional and beautifully aged',
          category: 'Home & Garden',
          price: 7950,
          image: 'https://images.unsplash.com/photo-1716757025960-2ea58b6d5860?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-8',
          createdAt: new Date().toISOString(),
          rating: 4.4,
          isWishlisted: false
        },
        {
          id: '9',
          title: 'Rustic Garden Bench',
          description: 'Weather-resistant wooden garden bench with vintage charm',
          category: 'Home & Garden',
          price: 8999,
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-9',
          createdAt: new Date().toISOString(),
          rating: 4.1,
          isWishlisted: false
        },
        {
          id: '10',
          title: 'Vintage Watering Can',
          description: 'Charming metal watering can with patina, perfect for garden enthusiasts',
          category: 'Home & Garden',
          price: 2850,
          image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-10',
          createdAt: new Date().toISOString(),
          rating: 4.0,
          isWishlisted: false
        },
        // Fashion (5 products) 
        {
          id: '11',
          title: 'Vintage Leather Jacket',
          description: 'Classic leather jacket from the 90s, well-maintained with authentic patina',
          category: 'Fashion',
          price: 15999,
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-11',
          createdAt: new Date().toISOString(),
          rating: 4.8,
          isWishlisted: false
        },
        {
          id: '12',
          title: 'Retro Sunglasses',
          description: 'Stylish vintage sunglasses with UV protection, excellent condition',
          category: 'Fashion',
          price: 3200,
          image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-12',
          createdAt: new Date().toISOString(),
          rating: 4.5,
          isWishlisted: false
        },
        {
          id: '13',
          title: 'Vintage Silk Scarf',
          description: 'Elegant silk scarf with unique pattern, perfect for any occasion',
          category: 'Fashion',
          price: 2890,
          image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-13',
          createdAt: new Date().toISOString(),
          rating: 4.6,
          isWishlisted: false
        },
        {
          id: '14',
          title: 'Classic Denim Jacket',
          description: 'Timeless denim jacket with perfect fade and comfortable fit',
          category: 'Fashion',
          price: 4500,
          image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-14',
          createdAt: new Date().toISOString(),
          rating: 4.4,
          isWishlisted: false
        },
        {
          id: '15',
          title: 'Vintage Handbag',
          description: 'Elegant vintage handbag with timeless design and quality craftsmanship',
          category: 'Fashion',
          price: 6750,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-15',
          createdAt: new Date().toISOString(),
          rating: 4.7,
          isWishlisted: false
        },
        // Books (5 products)
        {
          id: '16',
          title: 'Classic Literature Collection',
          description: 'Beautiful hardcover collection of classic novels in excellent condition',
          category: 'Books',
          price: 8900,
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-16',
          createdAt: new Date().toISOString(),
          rating: 4.9,
          isWishlisted: false
        },
        {
          id: '17',
          title: 'Vintage Photography Books',
          description: 'Rare collection of photography books with stunning visuals',
          category: 'Books',
          price: 5600,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-17',
          createdAt: new Date().toISOString(),
          rating: 4.6,
          isWishlisted: false
        },
        {
          id: '18',
          title: 'Art History Encyclopedia',
          description: 'Comprehensive art history encyclopedia with beautiful illustrations',
          category: 'Books',
          price: 3400,
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-18',
          createdAt: new Date().toISOString(),
          rating: 4.3,
          isWishlisted: false
        },
        {
          id: '19',
          title: 'Vintage Cookbook Collection',
          description: 'Traditional cookbooks with authentic recipes and cooking techniques',
          category: 'Books',
          price: 2750,
          image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-19',
          createdAt: new Date().toISOString(),
          rating: 4.2,
          isWishlisted: false
        },
        {
          id: '20',
          title: 'Philosophy Classics Set',
          description: 'Complete set of philosophical works by renowned thinkers',
          category: 'Books',
          price: 6800,
          image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-20',
          createdAt: new Date().toISOString(),
          rating: 4.8,
          isWishlisted: false
        },
        // Sports (5 products)
        {
          id: '21',
          title: 'Vintage Cricket Bat',
          description: 'Classic willow cricket bat with excellent balance and feel',
          category: 'Sports',
          price: 4500,
          image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-21',
          createdAt: new Date().toISOString(),
          rating: 4.5,
          isWishlisted: false
        },
        {
          id: '22',
          title: 'Retro Tennis Racket',
          description: 'Classic wooden tennis racket in great condition, perfect for collectors',
          category: 'Sports',
          price: 3200,
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-22',
          createdAt: new Date().toISOString(),
          rating: 4.3,
          isWishlisted: false
        },
        {
          id: '23',
          title: 'Vintage Football',
          description: 'Classic leather football with authentic vintage feel',
          category: 'Sports',
          price: 1800,
          image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-23',
          createdAt: new Date().toISOString(),
          rating: 4.1,
          isWishlisted: false
        },
        {
          id: '24',
          title: 'Classic Golf Clubs Set',
          description: 'Vintage golf clubs set with leather bag, well-maintained',
          category: 'Sports',
          price: 12500,
          image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-24',
          createdAt: new Date().toISOString(),
          rating: 4.7,
          isWishlisted: false
        },
        {
          id: '25',
          title: 'Vintage Boxing Gloves',
          description: 'Classic leather boxing gloves with authentic vintage appeal',
          category: 'Sports',
          price: 2900,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-25',
          createdAt: new Date().toISOString(),
          rating: 4.4,
          isWishlisted: false
        },
        // Beauty (5 products)
        {
          id: '26',
          title: 'Vintage Perfume Bottles',
          description: 'Beautiful collection of vintage perfume bottles, perfect for display',
          category: 'Beauty',
          price: 6500,
          image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-26',
          createdAt: new Date().toISOString(),
          rating: 4.6,
          isWishlisted: false
        },
        {
          id: '27',
          title: 'Antique Hand Mirror',
          description: 'Ornate hand mirror with detailed metalwork, functional and decorative',
          category: 'Beauty',
          price: 3800,
          image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-27',
          createdAt: new Date().toISOString(),
          rating: 4.4,
          isWishlisted: false
        },
        {
          id: '28',
          title: 'Vintage Makeup Compact',
          description: 'Elegant vintage makeup compact with intricate design',
          category: 'Beauty',
          price: 2200,
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-28',
          createdAt: new Date().toISOString(),
          rating: 4.1,
          isWishlisted: false
        },
        {
          id: '29',
          title: 'Classic Jewelry Box',
          description: 'Wooden jewelry box with velvet interior, perfect for organizing accessories',
          category: 'Beauty',
          price: 4100,
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-29',
          createdAt: new Date().toISOString(),
          rating: 4.7,
          isWishlisted: false
        },
        {
          id: '30',
          title: 'Vintage Hair Accessories',
          description: 'Collection of vintage hair pins and accessories in excellent condition',
          category: 'Beauty',
          price: 1850,
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-30',
          createdAt: new Date().toISOString(),
          rating: 4.2,
          isWishlisted: false
        },
        // Toys (5 products)
        {
          id: '31',
          title: 'Vintage Wooden Train Set',
          description: 'Classic wooden train set with multiple cars, perfect for children',
          category: 'Toys',
          price: 5600,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-31',
          createdAt: new Date().toISOString(),
          rating: 4.8,
          isWishlisted: false
        },
        {
          id: '32',
          title: 'Antique Rocking Horse',
          description: 'Beautiful handcrafted rocking horse with intricate details',
          category: 'Toys',
          price: 8900,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-32',
          createdAt: new Date().toISOString(),
          rating: 4.9,
          isWishlisted: false
        },
        {
          id: '33',
          title: 'Vintage Board Game Collection',
          description: 'Classic board games in excellent condition, perfect for family fun',
          category: 'Toys',
          price: 3400,
          image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-33',
          createdAt: new Date().toISOString(),
          rating: 4.5,
          isWishlisted: false
        },
        {
          id: '34',
          title: 'Classic Building Blocks',
          description: 'Traditional wooden building blocks set, great for creativity',
          category: 'Toys',
          price: 2100,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-34',
          createdAt: new Date().toISOString(),
          rating: 4.3,
          isWishlisted: false
        },
        {
          id: '35',
          title: 'Vintage Doll Collection',
          description: 'Beautiful vintage dolls with original clothing and accessories',
          category: 'Toys',
          price: 7200,
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-35',
          createdAt: new Date().toISOString(),
          rating: 4.6,
          isWishlisted: false
        },
        // Automotive (5 products)
        {
          id: '36',
          title: 'Vintage Car Parts',
          description: 'Authentic vintage car parts for classic automobile restoration',
          category: 'Automotive',
          price: 15000,
          image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-36',
          createdAt: new Date().toISOString(),
          rating: 4.7,
          isWishlisted: false
        },
        {
          id: '37',
          title: 'Classic Motorcycle Helmet',
          description: 'Vintage motorcycle helmet with authentic retro styling',
          category: 'Automotive',
          price: 4500,
          image: 'https://images.unsplash.com/photo-1558618666-3fbd6c4fbdb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-37',
          createdAt: new Date().toISOString(),
          rating: 4.4,
          isWishlisted: false
        },
        {
          id: '38',
          title: 'Antique Car Badge Collection',
          description: 'Rare collection of vintage car badges and emblems',
          category: 'Automotive',
          price: 6800,
          image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-38',
          createdAt: new Date().toISOString(),
          rating: 4.6,
          isWishlisted: false
        },
        {
          id: '39',
          title: 'Vintage Tool Set',
          description: 'Complete set of vintage automotive tools in original case',
          category: 'Automotive',
          price: 8200,
          image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-39',
          createdAt: new Date().toISOString(),
          rating: 4.8,
          isWishlisted: false
        },
        {
          id: '40',
          title: 'Classic Steering Wheel',
          description: 'Authentic vintage steering wheel from classic automobile',
          category: 'Automotive',
          price: 9500,
          image: 'https://images.unsplash.com/photo-1558618666-3fbd6c4fbdb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
          sellerId: 'demo-seller-40',
          createdAt: new Date().toISOString(),
          rating: 4.5,
          isWishlisted: false
        }
      ];
      setProducts(sampleProducts);
      localStorage.setItem('ecofinds_products', JSON.stringify(sampleProducts));
    }
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleLogout = () => {
    localStorage.removeItem('ecofinds_user');
    onNavigate('auth');
  };

  const toggleWishlist = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedWishlist = wishlistedItems.includes(productId)
      ? wishlistedItems.filter(id => id !== productId)
      : [...wishlistedItems, productId];
    
    setWishlistedItems(updatedWishlist);
    localStorage.setItem('ecofinds_wishlist', JSON.stringify(updatedWishlist));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0">
      <Navigation 
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        currentScreen="feed"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#102320' }}>
              Discover Sustainable <span style={{ color: '#4D2D18' }}>Treasures</span>
            </h1>
            <p className="text-lg md:text-xl" style={{ color: '#4D2D18' }}>
              Browse eco-friendly marketplace items in Indian Rupees (₹)
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#102320' }} />
              <Input
                placeholder="Search pre-loved treasures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 shadow-md"
                style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 border-0 shadow-md" style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Sorting Buttons */}
            <div className="flex gap-2">
              {[
                { key: 'newest', label: 'Newest' },
                { key: 'price-low', label: 'Price: Low' },
                { key: 'price-high', label: 'Price: High' }
              ].map((sort) => (
                <Button
                  key={sort.key}
                  variant={sortBy === sort.key ? "default" : "outline"}
                  onClick={() => setSortBy(sort.key)}
                  className="px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                  style={sortBy === sort.key ? 
                    { backgroundColor: '#4D2D18', color: '#CABA9C', border: 'none' } :
                    { borderColor: '#4C6444', color: '#4C6444', backgroundColor: 'transparent' }
                  }
                >
                  {sort.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products found</p>
            <Button onClick={() => onNavigate('add-product')}>
              Add the first product
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 shadow-lg overflow-hidden"
                style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', border: '1px solid rgba(16, 35, 32, 0.1)' }}
                onClick={() => onNavigate('product-detail', product)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.image || ''}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {/* Wishlist Heart */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 p-2 rounded-full transition-all duration-200 hover:scale-110"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)'
                      }}
                      onClick={(e) => toggleWishlist(product.id, e)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          wishlistedItems.includes(product.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 line-clamp-2" style={{ color: '#102320' }}>{product.title}</h3>
                    
                    {/* Star Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-sm ml-1" style={{ color: '#4D2D18' }}>
                          ({product.rating})
                        </span>
                      </div>
                    )}
                    
                    <Badge 
                      variant="secondary" 
                      className="mb-3 px-3 py-1 rounded-full"
                      style={{ backgroundColor: '#4C6444', color: '#CABA9C' }}
                    >
                      {product.category}
                    </Badge>
                    <p className="text-2xl font-bold" style={{ color: '#4D2D18' }}>
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <SocialFooter />
    </div>
  );
}