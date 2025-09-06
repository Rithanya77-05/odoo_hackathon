import React, { useState, useRef } from 'react';
import { Navigation } from './navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Edit2, Save, X, User, Mail, Calendar, Package, ShoppingCart, History, Upload, Camera } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User } from '../App';

interface DashboardProps {
  user: User | null;
  onNavigate: (screen: string) => void;
  onUpdateUser: (user: User) => void;
}

export function Dashboard({ user, onNavigate, onUpdateUser }: DashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profileImage: user?.profileImage || ''
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...editForm
    };

    // Update in localStorage
    localStorage.setItem('ecofinds_user', JSON.stringify(updatedUser));
    
    // Update users list
    const users = JSON.parse(localStorage.getItem('ecofinds_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...editForm };
      localStorage.setItem('ecofinds_users', JSON.stringify(users));
    }

    onUpdateUser(updatedUser);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm({
      username: user?.username || '',
      email: user?.email || '',
      profileImage: user?.profileImage || ''
    });
    setIsEditing(false);
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditForm(prev => ({ ...prev, profileImage: result }));
        toast.success('Profile image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ecofinds_user');
    onNavigate('auth');
  };

  // Get user stats
  const getStats = () => {
    if (!user) return { listings: 0, cartItems: 0, purchases: 0 };

    const products = JSON.parse(localStorage.getItem('ecofinds_products') || '[]');
    const cartItems = JSON.parse(localStorage.getItem('ecofinds_cart') || '[]');
    const purchases = JSON.parse(localStorage.getItem('ecofinds_purchases') || '[]');

    return {
      listings: products.filter((p: any) => p.sellerId === user.id).length,
      cartItems: cartItems.filter((item: any) => item.userId === user.id).length,
      purchases: purchases.filter((p: any) => p.userId === user.id).length
    };
  };

  const stats = getStats();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0">
      <Navigation 
        currentUser={user}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        currentScreen="dashboard"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8" style={{ color: '#102320' }}>Profile Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', border: '1px solid rgba(16, 35, 32, 0.1)' }}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Profile Information</CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={isEditing ? editForm.profileImage : user?.profileImage} />
                      <AvatarFallback className="text-lg" style={{ backgroundColor: '#4C6444', color: '#CABA9C' }}>
                        {(isEditing ? editForm.username : user?.username || 'U').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {!isEditing && (
                      <div>
                        <p className="font-medium" style={{ color: '#102320' }}>{user?.username}</p>
                        <p className="text-sm" style={{ color: '#4D2D18' }}>{user?.email}</p>
                      </div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="flex-1 w-full">
                      <Label htmlFor="profile-image-upload" className="block mb-3">Profile Image</Label>
                      
                      {/* Drag and Drop Area */}
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
                          dragActive ? 'border-[#4C6444] bg-[rgba(76,100,68,0.1)]' : 'border-[#8A6240] hover:border-[#4C6444] hover:bg-[rgba(76,100,68,0.05)]'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-3 rounded-full" style={{ backgroundColor: '#4C6444' }}>
                            <Upload className="h-6 w-6" style={{ color: '#CABA9C' }} />
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: '#102320' }}>
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm" style={{ color: '#4D2D18' }}>
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                        id="profile-image-upload"
                      />
                      
                      {/* URL Input as Alternative */}
                      <div className="mt-4">
                        <Label htmlFor="profile-image-url" className="text-sm" style={{ color: '#4D2D18' }}>
                          Or enter image URL
                        </Label>
                        <Input
                          id="profile-image-url"
                          placeholder="https://example.com/image.jpg"
                          value={editForm.profileImage}
                          onChange={(e) => setEditForm(prev => ({ ...prev, profileImage: e.target.value }))}
                          className="mt-2"
                          style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      value={editForm.username}
                      onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                      style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 rounded-md" style={{ backgroundColor: 'rgba(138, 98, 64, 0.2)' }}>
                      <User className="h-4 w-4" style={{ color: '#4C6444' }} />
                      <span style={{ color: '#102320' }}>{user?.username}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 rounded-md" style={{ backgroundColor: 'rgba(138, 98, 64, 0.2)' }}>
                      <Mail className="h-4 w-4" style={{ color: '#4C6444' }} />
                      <span style={{ color: '#102320' }}>{user?.email}</span>
                    </div>
                  )}
                </div>

                {/* User ID */}
                <div className="space-y-2">
                  <Label>User ID</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <span className="text-sm text-gray-500 font-mono">{user.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'rgba(76, 100, 68, 0.1)' }}
                  onClick={() => onNavigate('my-listings')}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2" style={{ backgroundColor: '#4C6444' }}>
                      <Package className="h-4 w-4" style={{ color: '#CABA9C' }} />
                    </div>
                    <span style={{ color: '#102320' }}>My Listings</span>
                  </div>
                  <Badge variant="secondary" style={{ backgroundColor: '#8A6240', color: '#CABA9C' }}>{stats.listings}</Badge>
                </div>

                <div 
                  className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'rgba(138, 98, 64, 0.1)' }}
                  onClick={() => onNavigate('cart')}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2" style={{ backgroundColor: '#8A6240' }}>
                      <ShoppingCart className="h-4 w-4" style={{ color: '#CABA9C' }} />
                    </div>
                    <span style={{ color: '#102320' }}>Cart Items</span>
                  </div>
                  <Badge variant="secondary" style={{ backgroundColor: '#4C6444', color: '#CABA9C' }}>{stats.cartItems}</Badge>
                </div>

                <div 
                  className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'rgba(77, 45, 24, 0.1)' }}
                  onClick={() => onNavigate('purchases')}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2" style={{ backgroundColor: '#4D2D18' }}>
                      <History className="h-4 w-4" style={{ color: '#CABA9C' }} />
                    </div>
                    <span style={{ color: '#102320' }}>Purchases</span>
                  </div>
                  <Badge variant="secondary" style={{ backgroundColor: '#4C6444', color: '#CABA9C' }}>{stats.purchases}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  onClick={() => onNavigate('add-product')}
                >
                  Add New Product
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('feed')}
                >
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}