import React, { useState, useEffect } from 'react';
import { Navigation } from './navigation';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { StatsCard } from './stats-card';
import { SocialFooter } from './social-footer';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Plus, Edit2, Trash2, Eye, TrendingUp, DollarSign, Calendar, Recycle, TreePine, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import type { User, Product } from '../App';

interface MyListingsProps {
  onNavigate: (screen: string, product?: Product) => void;
  currentUser: User | null;
}

export function MyListings({ onNavigate, currentUser }: MyListingsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  
  // Calculate stats
  const totalListings = myProducts.length;
  const totalValue = myProducts.reduce((sum, product) => sum + product.price, 0);
  const avgDaysListed = myProducts.length > 0 ? 
    Math.round(myProducts.reduce((sum, product) => {
      const daysListed = Math.floor((Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      return sum + daysListed;
    }, 0) / myProducts.length) : 0;
  
  // Environmental impact calculations
  const itemsGivenNewLife = totalListings;
  const co2Saved = totalListings * 2.1; // Estimate 2.1kg CO2 saved per item
  const wasteDiverted = totalListings * 0.5; // Estimate 0.5kg waste diverted per item

  useEffect(() => {
    const savedProducts = localStorage.getItem('ecofinds_products');
    if (savedProducts) {
      const allProducts = JSON.parse(savedProducts);
      setProducts(allProducts);
      
      // Filter products by current user
      if (currentUser) {
        const userProducts = allProducts.filter((p: Product) => p.sellerId === currentUser.id);
        setMyProducts(userProducts);
      }
    }
  }, [currentUser]);

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    setMyProducts(updatedProducts.filter(p => p.sellerId === currentUser?.id));
    localStorage.setItem('ecofinds_products', JSON.stringify(updatedProducts));
    toast.success('Product deleted successfully');
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
        currentScreen="my-listings"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#102320' }}>My Listings</h1>
            <p className="text-lg" style={{ color: '#4D2D18' }}>Manage your sustainable marketplace listings</p>
          </div>
          <Button 
            onClick={() => onNavigate('add-product')}
            className="flex items-center gap-2 px-6 py-3 text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#4D2D18', color: '#CABA9C' }}
          >
            <Plus className="h-5 w-5" />
            List New Item
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Listings"
            value={totalListings}
            icon={<Eye className="h-6 w-6 text-white" />}
            iconBgColor="#4C6444"
            description="Active items in marketplace"
          />
          <StatsCard
            title="Total Value"
            value={`₹${totalValue.toFixed(2)}`}
            icon={<DollarSign className="h-6 w-6 text-white" />}
            iconBgColor="#4D2D18"
            description="Combined listing value (INR)"
          />
          <StatsCard
            title="Avg. Days Listed"
            value={avgDaysListed}
            icon={<Calendar className="h-6 w-6 text-white" />}
            iconBgColor="#8A6240"
            description="Average time in marketplace"
          />
        </div>



        {/* Products Grid */}
        {myProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#4C6444' }}>
                <Plus className="h-10 w-10" style={{ color: '#CABA9C' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#102320' }}>No products yet</h3>
              <p className="text-lg mb-8" style={{ color: '#4D2D18' }}>Start selling by adding your first sustainable product</p>
              <Button 
                onClick={() => onNavigate('add-product')}
                className="px-8 py-3 text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#4D2D18', color: '#CABA9C' }}
              >
                Add Your First Product
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myProducts.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', border: '1px solid rgba(16, 35, 32, 0.1)' }}
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
                    <Badge 
                      className="absolute top-3 left-3 px-3 py-1 rounded-full"
                      style={{ backgroundColor: '#4D2D18', color: '#CABA9C' }}
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 line-clamp-2" style={{ color: '#102320' }}>{product.title}</h3>
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: '#4D2D18' }}>{product.description}</p>
                    <Badge 
                      variant="secondary" 
                      className="mb-3 px-3 py-1 rounded-full"
                      style={{ backgroundColor: '#4C6444', color: '#CABA9C' }}
                    >
                      {product.category}
                    </Badge>
                    <p className="text-2xl font-bold mb-4" style={{ color: '#4D2D18' }}>
                      ₹{product.price.toFixed(2)}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate('product-detail', product)}
                        className="flex-1 flex items-center gap-2 border-2 transition-all duration-200 hover:scale-105"
                        style={{ borderColor: '#4C6444', color: '#4C6444' }}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate('add-product', product)}
                        className="flex-1 flex items-center gap-2 border-2 transition-all duration-200 hover:scale-105"
                        style={{ borderColor: '#8A6240', color: '#8A6240' }}
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${product.title}"? This action cannot be undone.`)) {
                            handleDelete(product.id);
                          }
                        }}
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

      {/* Environmental Impact Footer */}
      <footer className="mt-16 py-12" style={{ backgroundColor: '#102320' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#CABA9C' }}>
              Your Environmental Impact
            </h3>
            <p className="text-lg" style={{ color: '#8A6240' }}>
              Track the positive change you're making for our planet
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'rgba(76, 100, 68, 0.1)' }}>
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full" style={{ backgroundColor: '#4C6444' }}>
                  <Recycle className="h-8 w-8" style={{ color: '#CABA9C' }} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-2" style={{ color: '#CABA9C' }}>{itemsGivenNewLife}</p>
              <p className="text-lg" style={{ color: '#8A6240' }}>Items Given New Life</p>
              <p className="text-sm mt-2" style={{ color: '#4C6444' }}>
                Every item sold extends its lifecycle and reduces waste
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'rgba(138, 98, 64, 0.1)' }}>
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full" style={{ backgroundColor: '#8A6240' }}>
                  <TreePine className="h-8 w-8" style={{ color: '#CABA9C' }} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-2" style={{ color: '#CABA9C' }}>{co2Saved.toFixed(1)} kg</p>
              <p className="text-lg" style={{ color: '#8A6240' }}>CO₂ Emissions Saved</p>
              <p className="text-sm mt-2" style={{ color: '#4C6444' }}>
                Equivalent to driving {(co2Saved * 2.31).toFixed(0)} fewer miles
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'rgba(77, 45, 24, 0.1)' }}>
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full" style={{ backgroundColor: '#4D2D18' }}>
                  <Globe className="h-8 w-8" style={{ color: '#CABA9C' }} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-2" style={{ color: '#CABA9C' }}>{wasteDiverted.toFixed(1)} kg</p>
              <p className="text-lg" style={{ color: '#8A6240' }}>Waste Diverted</p>
              <p className="text-sm mt-2" style={{ color: '#4C6444' }}>
                Kept out of landfills and given a second purpose
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12 p-6 rounded-xl" style={{ backgroundColor: 'rgba(202, 186, 156, 0.1)' }}>
            <p className="text-xl italic" style={{ color: '#CABA9C' }}>
              🌱 Thank you for contributing to a more sustainable future!
            </p>
            <p className="mt-2" style={{ color: '#8A6240' }}>
              Together, we're building a circular economy that benefits everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}