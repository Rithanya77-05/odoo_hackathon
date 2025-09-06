import React, { useState, useEffect } from 'react';
import { Navigation } from './navigation';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { SocialFooter } from './social-footer';
import { Heart, Star, ShoppingCart, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import type { User, Product } from '../App';

interface WishlistProps {
  onNavigate: (screen: string, product?: Product) => void;
  currentUser: User | null;
}

export function Wishlist({ onNavigate, currentUser }: WishlistProps) {
  const [wishlistedItems, setWishlistedItems] = useState<string[]>([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('ecofinds_wishlist');
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
      setWishlistedItems(wishlist);

      // Load all products and filter wishlisted ones
      const savedProducts = localStorage.getItem('ecofinds_products');
      if (savedProducts) {
        const allProducts = JSON.parse(savedProducts);
        const filteredProducts = allProducts.filter((product: Product) => 
          wishlist.includes(product.id)
        );
        setWishlistedProducts(filteredProducts);
      }
    }
  }, []);

  const removeFromWishlist = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedWishlist = wishlistedItems.filter(id => id !== productId);
    const updatedProducts = wishlistedProducts.filter(product => product.id !== productId);
    
    setWishlistedItems(updatedWishlist);
    setWishlistedProducts(updatedProducts);
    localStorage.setItem('ecofinds_wishlist', JSON.stringify(updatedWishlist));
    toast.success('Removed from wishlist');
  };

  const addToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!currentUser) {
      toast.error('Please login to add items to cart');
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem('ecofinds_cart') || '[]');
    const existingItem = cartItems.find((item: any) => item.id === product.id && item.userId === currentUser.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
        userId: currentUser.id
      });
    }
    
    localStorage.setItem('ecofinds_cart', JSON.stringify(cartItems));
    toast.success('Added to cart');
  };

  const handleLogout = () => {
    localStorage.removeItem('ecofinds_user');
    onNavigate('auth');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.floor(rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0">
      <Navigation 
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        currentScreen="wishlist"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#102320' }}>
            My <span style={{ color: '#4D2D18' }}>Wishlist</span>
          </h1>
          <p className="text-lg md:text-xl" style={{ color: '#4D2D18' }}>
            Your saved sustainable treasures
          </p>
        </div>

        {/* Wishlist Grid */}
        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#4C6444' }}>
                <Heart className="h-10 w-10" style={{ color: '#CABA9C' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#102320' }}>Your wishlist is empty</h3>
              <p className="text-lg mb-8" style={{ color: '#4D2D18' }}>Start exploring and save items you love</p>
              <Button 
                onClick={() => onNavigate('feed')}
                className="px-8 py-3 text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#4D2D18', color: '#CABA9C' }}
              >
                Browse Products
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 overflow-hidden"
                style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', border: '1px solid rgba(16, 35, 32, 0.1)' }}
                onClick={() => onNavigate('product-detail', product)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={product.image || ''}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    
                    {/* Wishlist button */}
                    <Button
                      size="sm"
                      className="absolute top-3 right-3 w-10 h-10 rounded-full p-0 transition-all duration-200 hover:scale-110"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#d32f2f' }}
                      onClick={(e) => removeFromWishlist(product.id, e)}
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                    
                    {/* Rating */}
                    {product.rating && (
                      <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                        <div className="flex">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm font-medium ml-1">{product.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 line-clamp-2" style={{ color: '#102320' }}>
                      {product.title}
                    </h3>
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: '#4D2D18' }}>
                      {product.description}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className="mb-3 px-3 py-1 rounded-full"
                      style={{ backgroundColor: '#4C6444', color: '#CABA9C' }}
                    >
                      {product.category}
                    </Badge>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-2xl font-bold" style={{ color: '#4D2D18' }}>
                        ₹{product.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => addToCart(product, e)}
                        className="flex-1 flex items-center gap-2 transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: '#4C6444', color: '#CABA9C', border: 'none' }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => removeFromWishlist(product.id, e)}
                        className="flex items-center gap-2 border-2 transition-all duration-200 hover:scale-105"
                        style={{ borderColor: '#d32f2f', color: '#d32f2f' }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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