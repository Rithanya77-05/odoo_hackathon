import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { EcoFindsBrand } from './eco-finds-logo';
import { toast } from 'sonner@2.0.3';
import type { User } from '../App';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - check localStorage for existing users
    const users = JSON.parse(localStorage.getItem('ecofinds_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
      toast.success('Welcome back!');
    } else {
      toast.error('Invalid email or password');
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock signup - save to localStorage
    const users = JSON.parse(localStorage.getItem('ecofinds_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);

    if (existingUser) {
      toast.error('User with this email already exists');
      setIsLoading(false);
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      password, // In real app, this would be hashed
      profileImage: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
    };

    users.push(newUser);
    localStorage.setItem('ecofinds_users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    onLogin(userWithoutPassword);
    toast.success('Account created successfully!');

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #CABA9C 0%, rgba(202, 186, 156, 0.8) 50%, #8A6240 100%)' }}>
      <div className="w-full max-w-md">
        {/* Unique EcoFinds Logo at Top */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-8">
            <EcoFindsBrand 
              logoSize="xl" 
              textSize="lg" 
              orientation="vertical" 
              className="filter drop-shadow-lg"
            />
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6" style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)' }}>
            <TabsTrigger value="login" style={{ color: '#102320' }}>Login</TabsTrigger>
            <TabsTrigger value="signup" style={{ color: '#102320' }}>Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-0 shadow-xl" style={{ backgroundColor: 'rgba(202, 186, 156, 0.9)' }}>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-6 pt-8 pb-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" style={{ color: '#102320' }}>Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 shadow-md"
                      style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" style={{ color: '#102320' }}>Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 shadow-md"
                      style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg" 
                    disabled={isLoading}
                    style={{ backgroundColor: '#4D2D18', color: '#CABA9C', border: 'none' }}
                  >
                    {isLoading ? 'Signing in...' : 'Login'}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-0 shadow-xl" style={{ backgroundColor: 'rgba(202, 186, 156, 0.9)' }}>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-6 pt-8 pb-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username" style={{ color: '#102320' }}>Username</Label>
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-0 shadow-md"
                      style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" style={{ color: '#102320' }}>Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 shadow-md"
                      style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" style={{ color: '#102320' }}>Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 shadow-md"
                      style={{ backgroundColor: 'rgba(202, 186, 156, 0.8)', color: '#102320' }}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg" 
                    disabled={isLoading}
                    style={{ backgroundColor: '#4D2D18', color: '#CABA9C', border: 'none' }}
                  >
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sign-up link for login and vice versa */}
        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: '#102320' }}>
            Demo app - Use any email/password combination
          </p>
        </div>
      </div>
    </div>
  );
}