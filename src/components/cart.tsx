import React, { useState, useEffect } from 'react';
import { Navigation } from './navigation';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import type { User, CartItem, Purchase } from '../App';

interface CartProps {
  onNavigate: (screen: string) => void;
  currentUser: User | null;
}

export function Cart({ onNavigate, currentUser }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const allCartItems = JSON.parse(localStorage.getItem('ecofinds_cart') || '[]');
      const userCartItems = allCartItems.filter((item: CartItem) => item.userId === currentUser.id);
      setCartItems(userCartItems);
    }
  }, [currentUser]);

  const updateCartInStorage = (updatedItems: CartItem[]) => {
    const allCartItems = JSON.parse(localStorage.getItem('ecofinds_cart') || '[]');
    const otherUsersItems = allCartItems.filter((item: CartItem) => item.userId !== currentUser?.id);
    const newCartItems = [...otherUsersItems, ...updatedItems];
    localStorage.setItem('ecofinds_cart', JSON.stringify(newCartItems));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    updateCartInStorage(updatedItems);
  };

  const removeItem = (productId: string) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedItems);
    updateCartInStorage(updatedItems);
    toast.success('Item removed from cart');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (!currentUser || cartItems.length === 0) return;

    setIsProcessing(true);

    // Simulate purchase processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create purchase record
    const purchase: Purchase = {
      id: Date.now().toString(),
      products: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        price: item.price,
        image: item.image,
        sellerId: item.sellerId,
        createdAt: item.createdAt
      })),
      total: calculateTotal(),
      date: new Date().toISOString(),
      userId: currentUser.id
    };

    // Save purchase to localStorage
    const purchases = JSON.parse(localStorage.getItem('ecofinds_purchases') || '[]');
    purchases.push(purchase);
    localStorage.setItem('ecofinds_purchases', JSON.stringify(purchases));

    // Clear cart
    setCartItems([]);
    updateCartInStorage([]);

    setIsProcessing(false);
    toast.success('Purchase completed successfully!');
    onNavigate('purchases');
  };

  const handleLogout = () => {
    localStorage.removeItem('ecofinds_user');
    onNavigate('auth');
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0">
      <Navigation 
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        currentScreen="cart"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8 text-gray-900">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg mb-2 text-gray-900">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some eco-friendly products to get started</p>
              <Button onClick={() => onNavigate('feed')}>
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-24 h-24 flex-shrink-0">
                        <ImageWithFallback
                          src={item.image || ''}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg mb-1 text-gray-900">{item.title}</h3>
                        <Badge variant="secondary" className="mb-2">
                          {item.category}
                        </Badge>
                        <p className="text-lg bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">₹{item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl mb-4 text-gray-900">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.title} × {item.quantity}
                        </span>
                        <span className="text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg mb-6">
                    <span className="text-gray-900">Total</span>
                    <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">₹{calculateTotal().toFixed(2)}</span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : 'Complete Purchase'}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => onNavigate('feed')}
                    className="w-full mt-3"
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}