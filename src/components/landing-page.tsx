import React from 'react';
import { Button } from './ui/button';
import { EcoFindsBrand } from './eco-finds-logo';
import { SocialFooter } from './social-footer';
import { Recycle, Globe, Users, TrendingUp, Heart, ShoppingBag } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (screen: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        background: 'linear-gradient(135deg, #CABA9C 0%, rgba(202, 186, 156, 0.9) 50%, #8A6240 100%)'
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(202, 186, 156, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <EcoFindsBrand logoSize="lg" textSize="lg" />
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => onNavigate('auth')}
              className="border-2 transition-all duration-200 hover:scale-105"
              style={{ borderColor: '#4D2D18', color: '#4D2D18', backgroundColor: 'transparent' }}
            >
              Login
            </Button>
            <Button
              onClick={() => onNavigate('auth')}
              className="transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#4D2D18', color: '#CABA9C' }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{ color: '#102320' }}>
            Give Items a{' '}
            <span 
              className="bg-gradient-to-r from-[#4D2D18] to-[#4C6444] bg-clip-text text-transparent"
            >
              Second Life
            </span>
          </h1>

          {/* Description */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl md:text-2xl mb-8 leading-relaxed" style={{ color: '#102320' }}>
              EcoFinds is your trusted marketplace for sustainable shopping. Buy and sell pre-loved treasures, 
              reduce waste, and help build a circular economy for a greener future.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col items-center p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="p-4 rounded-full mb-4" style={{ backgroundColor: '#4C6444' }}>
                  <Recycle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#102320' }}>Circular Economy</h3>
                <p className="text-center" style={{ color: '#102320' }}>Extend product lifecycles and reduce waste</p>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="p-4 rounded-full mb-4" style={{ backgroundColor: '#8A6240' }}>
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#102320' }}>Environmental Impact</h3>
                <p className="text-center" style={{ color: '#102320' }}>Track your positive impact on the planet</p>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="p-4 rounded-full mb-4" style={{ backgroundColor: '#4D2D18' }}>
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#102320' }}>Community Driven</h3>
                <p className="text-center" style={{ color: '#102320' }}>Connect with eco-conscious buyers and sellers</p>
              </div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              onClick={() => onNavigate('auth')}
              size="lg"
              className="px-12 py-6 text-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-3"
              style={{ backgroundColor: '#4D2D18', color: '#CABA9C' }}
            >
              <ShoppingBag className="h-6 w-6" />
              Start Selling
            </Button>
            <Button 
              onClick={() => onNavigate('auth')}
              variant="outline"
              size="lg"
              className="px-12 py-6 text-xl font-semibold border-3 transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-3"
              style={{ borderColor: '#4C6444', color: '#4C6444', backgroundColor: 'transparent' }}
            >
              <Heart className="h-6 w-6" />
              Browse Products
            </Button>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#4D2D18' }}>10K+</div>
              <div className="text-sm" style={{ color: '#102320' }}>Items Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#4C6444' }}>2.5T</div>
              <div className="text-sm" style={{ color: '#102320' }}>CO₂ Saved (kg)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#8A6240' }}>5K+</div>
              <div className="text-sm" style={{ color: '#102320' }}>Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#4D2D18' }}>50+</div>
              <div className="text-sm" style={{ color: '#102320' }}>Cities</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 backdrop-blur-sm" style={{ backgroundColor: 'rgba(16, 35, 32, 0.9)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ color: '#CABA9C' }}>
            Join the sustainable revolution. Every item has a story, give it a new chapter.
          </p>
        </div>
      </footer>
    </div>
  );
}