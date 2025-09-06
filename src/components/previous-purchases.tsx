import React, { useState, useEffect } from 'react';
import { Navigation } from './navigation';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Package, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User, Purchase } from '../App';

interface PreviousPurchasesProps {
  onNavigate: (screen: string) => void;
  currentUser: User | null;
}

export function PreviousPurchases({ onNavigate, currentUser }: PreviousPurchasesProps) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    if (currentUser) {
      const allPurchases = JSON.parse(localStorage.getItem('ecofinds_purchases') || '[]');
      const userPurchases = allPurchases
        .filter((purchase: Purchase) => purchase.userId === currentUser.id)
        .sort((a: Purchase, b: Purchase) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPurchases(userPurchases);
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('ecofinds_user');
    onNavigate('auth');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0">
      <Navigation 
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        currentScreen="purchases"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8 text-gray-900">Previous Purchases</h1>

        {purchases.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg mb-2 text-gray-900">No purchases yet</h3>
              <p className="text-gray-500 mb-6">Your purchase history will appear here</p>
              <Button onClick={() => onNavigate('feed')}>
                Start Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{purchase.id}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(purchase.date)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">${purchase.total.toFixed(2)}</p>
                      <Badge variant="secondary">
                        {purchase.products.length} item{purchase.products.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchase.products.map((product, index) => (
                      <div key={`${purchase.id}-${product.id}-${index}`}>
                        <div className="flex gap-4">
                          <div className="w-16 h-16 flex-shrink-0">
                            <ImageWithFallback
                              src={product.image || ''}
                              alt={product.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base mb-1 text-gray-900">{product.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        {index < purchase.products.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <span className="text-gray-600">Total paid</span>
                    <span className="text-lg bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">${purchase.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}