import React from 'react';
import { Navigation } from './navigation';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import type { User, Product, CartItem } from '../App';

interface ProductDetailProps {
  product: Product | null;
  onNavigate: (screen: string) => void;
  currentUser: User | null;
}

export function ProductDetail({ product, onNavigate, currentUser }: ProductDetailProps) {
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-4 text-gray-900">Product not found</h2>
          <Button onClick={() => onNavigate('feed')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error('Please log in to add items to cart');
      return;
    }

    // Get existing cart items
    const cartItems = JSON.parse(localStorage.getItem('ecofinds_cart') || '[]');
    const existingItem = cartItems.find((item: CartItem) => 
      item.id === product.id && item.userId === currentUser.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newCartItem: CartItem = {
        ...product,
        quantity: 1,
        userId: currentUser.id
      };
      cartItems.push(newCartItem);
    }

    localStorage.setItem('ecofinds_cart', JSON.stringify(cartItems));
    toast.success('Added to cart!');
  };

  const handleLogout = () => {
    localStorage.removeItem('ecofinds_user');
    onNavigate('auth');
  };

  const isOwnProduct = currentUser?.id === product.sellerId;

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0">
      <Navigation 
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        currentScreen="product-detail"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('feed')}
          className="mb-6 -ml-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <ImageWithFallback
              src={product.image || ''}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl mb-4 text-gray-900 text-[32px]">{product.title}</h1>
              <p className="text-4xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">₹{product.price.toFixed(2)}</p>
            </div>

            <div>
              <h2 className="text-xl mb-3 text-gray-900">Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg mb-3 text-gray-900">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-900">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Listed:</span>
                    <span className="text-gray-900">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Product ID:</span>
                    <span className="text-gray-900 font-mono text-xs">{product.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {isOwnProduct ? (
                <div className="flex-1 text-center py-4">
                  <p className="text-gray-500 mb-2">This is your product</p>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('my-listings')}
                    className="w-full"
                  >
                    Manage in My Listings
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('cart')}
                    size="lg"
                  >
                    View Cart
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}