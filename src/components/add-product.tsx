import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, ImagePlus, Upload, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User, Product } from '../App';
import { CATEGORIES } from '../App';

interface AddProductProps {
  onNavigate: (screen: string) => void;
  currentUser: User | null;
  editingProduct?: Product | null;
}

export function AddProduct({ onNavigate, currentUser, editingProduct }: AddProductProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setDescription(editingProduct.description);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price.toString());
      setImage(editingProduct.image || '');
      setPreviewUrl(editingProduct.image || '');
    }
  }, [editingProduct]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImage(''); // Clear any existing image URL
      toast.success('Image uploaded successfully!');
    } else {
      toast.error('Please upload an image file');
    }
  };

  const removeImage = () => {
    setUploadedFile(null);
    setPreviewUrl('');
    setImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    // Validate that an image is uploaded
    if (!uploadedFile && !image) {
      toast.error('Please upload a product image');
      return;
    }

    setIsLoading(true);

    // Convert uploaded file to data URL for storage
    let imageData = image;
    if (uploadedFile) {
      imageData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(uploadedFile);
      });
    }

    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      title,
      description,
      category,
      price: parseFloat(price),
      image: imageData || undefined,
      sellerId: currentUser.id,
      createdAt: editingProduct?.createdAt || new Date().toISOString()
    };

    // Save to localStorage
    const products = JSON.parse(localStorage.getItem('ecofinds_products') || '[]');
    
    if (editingProduct) {
      const index = products.findIndex((p: Product) => p.id === editingProduct.id);
      if (index !== -1) {
        products[index] = productData;
      }
      toast.success('Product updated successfully!');
    } else {
      products.push(productData);
      toast.success('Product added successfully!');
    }

    localStorage.setItem('ecofinds_products', JSON.stringify(products));

    setIsLoading(false);
    onNavigate('my-listings');
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
        currentScreen="add-product"
      />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('my-listings')}
            className="mb-4 -ml-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Listings
          </Button>
          <h1 className="text-3xl" style={{ color: '#102320' }}>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>

        <Card className="border-0 shadow-lg" style={{ backgroundColor: 'rgba(202, 186, 156, 0.9)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#102320' }}>{editingProduct ? 'Update Product Details' : 'Product Details'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" style={{ color: '#102320' }}>Product Title</Label>
                <Input
                  id="title"
                  placeholder="Enter product title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-0 shadow-md"
                  style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" style={{ color: '#102320' }}>Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="border-0 shadow-md" style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" style={{ color: '#102320' }}>Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="border-0 shadow-md"
                  style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" style={{ color: '#102320' }}>Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-0 shadow-md"
                  style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                  required
                />
              </div>

              {/* Drag and Drop Image Upload */}
              <div className="space-y-2">
                <Label className="text-lg font-semibold" style={{ color: '#102320' }}>
                  Product Image <span style={{ color: '#d32f2f' }}>*</span>
                </Label>
                <p className="text-sm" style={{ color: '#4D2D18' }}>
                  Upload a high-quality image of your product
                </p>
                
                {/* Drag and Drop Zone */}
                <div
                  className={`relative border-3 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer hover:shadow-2xl min-h-[300px] flex items-center justify-center ${
                    dragActive 
                      ? 'border-primary bg-primary/5 scale-105 shadow-2xl' 
                      : 'border-gray-300 hover:border-gray-400 hover:scale-102'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  style={{ 
                    borderColor: dragActive ? '#4C6444' : 'rgba(16, 35, 32, 0.4)',
                    backgroundColor: dragActive ? 'rgba(76, 100, 68, 0.2)' : 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    borderWidth: '3px'
                  }}
                >
                  {previewUrl ? (
                    <div className="relative group">
                      <img
                        src={previewUrl}
                        alt="Product preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            className="shadow-lg"
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Replace
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeImage}
                            className="shadow-lg"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="flex justify-center mb-6">
                        <div className="p-8 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl" style={{ backgroundColor: '#4C6444' }}>
                          <Upload className="h-12 w-12" style={{ color: '#CABA9C' }} />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3" style={{ color: '#102320' }}>
                        Add Product Image
                      </h3>
                      <p className="text-lg mb-2" style={{ color: '#4D2D18' }}>
                        Drag and drop your image here
                      </p>
                      <p className="text-sm mb-6" style={{ color: '#8A6240' }}>
                        or click below to browse files
                      </p>
                      <p className="text-xs mb-6" style={{ color: '#4C6444' }}>
                        Supports JPG, PNG, GIF up to 10MB
                      </p>
                      <Button
                        type="button"
                        size="lg"
                        className="px-10 py-4 text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 font-semibold"
                        style={{ 
                          borderColor: '#4C6444', 
                          color: '#CABA9C', 
                          backgroundColor: '#4C6444',
                          fontWeight: '600'
                        }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImagePlus className="h-6 w-6 mr-3" />
                        Browse Files
                      </Button>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>


              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate('my-listings')}
                  className="flex-1 transition-all duration-200 hover:scale-105"
                  style={{ borderColor: '#8A6240', color: '#8A6240' }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="flex-1 transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#4D2D18', color: '#CABA9C', border: 'none' }}
                >
                  {isLoading 
                    ? (editingProduct ? 'Updating...' : 'Adding...') 
                    : (editingProduct ? 'Update Product' : 'Add Product')
                  }
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}