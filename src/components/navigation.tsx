import React from 'react';
import { Button } from './ui/button';
import { User, Home, Plus, Package, ShoppingCart, History, LogOut, Heart } from 'lucide-react';
import { EcoFindsBrand } from './eco-finds-logo';
import type { User as UserType } from '../App';

interface NavigationProps {
  currentUser: UserType | null;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  currentScreen?: string;
}

export function Navigation({ currentUser, onNavigate, onLogout, currentScreen }: NavigationProps) {
  const navItems = [
    { key: 'feed', label: 'Home', icon: Home },
    { key: 'add-product', label: 'Add Product', icon: Plus },
    { key: 'my-listings', label: 'My Listings', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
    { key: 'cart', label: 'Cart', icon: ShoppingCart },
    { key: 'purchases', label: 'Purchases', icon: History },
    { key: 'dashboard', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: 'rgba(202, 186, 156, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(16, 35, 32, 0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('feed')}
          >
            <EcoFindsBrand logoSize="md" textSize="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={currentScreen === key ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(key)}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                style={currentScreen === key ? 
                  { backgroundColor: '#4D2D18', color: '#CABA9C', border: 'none' } :
                  { color: '#102320', backgroundColor: 'transparent' }
                }
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline">{label}</span>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
              style={{ color: '#d32f2f', backgroundColor: 'transparent' }}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
              style={{ color: '#102320', backgroundColor: 'transparent' }}
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 shadow-lg" style={{ backgroundColor: 'rgba(250, 240, 230, 0.95)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(109, 76, 65, 0.1)' }}>
        <div className="grid grid-cols-7 gap-1 p-2">
          {navItems.map(({ key, icon: Icon }) => (
            <Button
              key={key}
              variant={currentScreen === key ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate(key)}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}