import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/landing-page';
import { AuthScreen } from './components/auth-screen';
import { Dashboard } from './components/dashboard';
import { ProductFeed } from './components/product-feed';
import { AddProduct } from './components/add-product';
import { MyListings } from './components/my-listings';
import { ProductDetail } from './components/product-detail';
import { Cart } from './components/cart';
import { PreviousPurchases } from './components/previous-purchases';
import { Wishlist } from './components/wishlist';
import { Toaster } from './components/ui/sonner';

export interface User {
  id: string;
  email: string;
  username: string;
  profileImage?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image?: string;
  sellerId: string;
  createdAt: string;
  rating?: number;
  isWishlisted?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  userId?: string;
}

export interface Purchase {
  id: string;
  products: Product[];
  total: number;
  date: string;
  userId: string;
}

type Screen = 'landing' | 'auth' | 'dashboard' | 'feed' | 'add-product' | 'my-listings' | 'product-detail' | 'cart' | 'purchases' | 'wishlist';

const CATEGORIES = ['Electronics', 'Home & Garden', 'Fashion', 'Books', 'Sports', 'Beauty', 'Toys', 'Automotive'];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Initialize user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('ecofinds_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentScreen('feed');
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('ecofinds_user', JSON.stringify(user));
    setCurrentScreen('feed');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ecofinds_user');
    setCurrentScreen('auth');
  };

  const handleNavigate = (screen: Screen, product?: Product) => {
    setCurrentScreen(screen);
    if (product) {
      if (screen === 'product-detail') {
        setSelectedProduct(product);
      } else if (screen === 'add-product') {
        setEditingProduct(product);
      }
    } else {
      setSelectedProduct(null);
      setEditingProduct(null);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthScreen onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard user={currentUser} onNavigate={handleNavigate} onUpdateUser={setCurrentUser} />;
      case 'feed':
        return <ProductFeed onNavigate={handleNavigate} currentUser={currentUser} />;
      case 'add-product':
        return <AddProduct onNavigate={handleNavigate} currentUser={currentUser} editingProduct={editingProduct} />;
      case 'my-listings':
        return <MyListings onNavigate={handleNavigate} currentUser={currentUser} />;
      case 'product-detail':
        return <ProductDetail product={selectedProduct} onNavigate={handleNavigate} currentUser={currentUser} />;
      case 'cart':
        return <Cart onNavigate={handleNavigate} currentUser={currentUser} />;
      case 'purchases':
        return <PreviousPurchases onNavigate={handleNavigate} currentUser={currentUser} />;
      case 'wishlist':
        return <Wishlist onNavigate={handleNavigate} currentUser={currentUser} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #CABA9C 0%, rgba(202, 186, 156, 0.8) 50%, #8A6240 100%)' }}>
      {renderScreen()}
      <Toaster />
    </div>
  );
}

export { CATEGORIES };