import { Link } from 'react-router-dom';
import { Heart, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
              <div className="flex items-center space-x-1">
                <Heart className="h-5 w-5 text-romantic" />
                <GraduationCap className="h-5 w-5 text-graduation" />
              </div>
              <span className="bg-gradient-romantic bg-clip-text text-transparent">
                GiftShop
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your perfect destination for graduation and romantic gifts that celebrate life's special moments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                All Products
              </Link>
              <Link to="/categories/graduation" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Graduation Gifts
              </Link>
              <Link to="/categories/romantic" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Valentine's Gifts
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Service</h3>
            <div className="space-y-2">
              <Link to="/shipping" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Shipping Info
              </Link>
              <Link to="/returns" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Returns & Exchanges
              </Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@giftshop.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>1-800-GIFTS-US</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Gift Street, Love City, LC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 GiftShop. All rights reserved. Made with <Heart className="h-4 w-4 inline text-romantic" /> for special moments.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;