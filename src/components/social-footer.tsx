import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function SocialFooter() {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/ecofinds', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/ecofinds', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/ecofinds', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/ecofinds', label: 'LinkedIn' }
  ];

  return (
    <footer className="mt-16 py-12" style={{ backgroundColor: '#102320' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#CABA9C' }}>
              EcoFinds
            </h3>
            <p className="text-base mb-6 leading-relaxed" style={{ color: '#8A6240' }}>
              Your trusted marketplace for sustainable shopping. Join the circular economy and give items a second life while making a positive environmental impact.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" style={{ color: '#4C6444' }} />
                <span className="text-sm" style={{ color: '#8A6240' }}>hello@ecofinds.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" style={{ color: '#4C6444' }} />
                <span className="text-sm" style={{ color: '#8A6240' }}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" style={{ color: '#4C6444' }} />
                <span className="text-sm" style={{ color: '#8A6240' }}>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#CABA9C' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['About Us', 'How It Works', 'Sustainability', 'Help Center', 'Terms of Service', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-sm hover:underline transition-colors duration-200"
                    style={{ color: '#8A6240' }}
                    onMouseEnter={(e) => e.target.style.color = '#4C6444'}
                    onMouseLeave={(e) => e.target.style.color = '#8A6240'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#CABA9C' }}>
              Follow Us
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: '#4C6444' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#8A6240'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4C6444'}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" style={{ color: '#CABA9C' }} />
                </a>
              ))}
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm mb-3" style={{ color: '#8A6240' }}>
                Subscribe to our eco-friendly newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm rounded-lg border-0 focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: 'rgba(202, 186, 156, 0.2)', 
                    color: '#CABA9C',
                    focusRingColor: '#4C6444'
                  }}
                />
                <button
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#4D2D18', color: '#CABA9C' }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8" style={{ borderColor: 'rgba(138, 98, 64, 0.3)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: '#8A6240' }}>
              © 2024 EcoFinds. All rights reserved. Building a sustainable future together.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs" style={{ color: '#4C6444' }}>
                🌱 Carbon Neutral Shipping
              </span>
              <span className="text-xs" style={{ color: '#4C6444' }}>
                ♻️ Circular Economy
              </span>
              <span className="text-xs" style={{ color: '#4C6444' }}>
                🌍 Global Impact
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}