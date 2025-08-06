import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Heart, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const cartItemCount = getItemCount();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <div className="flex items-center space-x-1">
              <Heart className="h-6 w-6 text-romantic" />
              <GraduationCap className="h-6 w-6 text-graduation" />
            </div>
            <span className="bg-gradient-romantic bg-clip-text text-transparent">
              GiftShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              to="/categories/graduation" 
              className="text-graduation hover:text-primary transition-colors font-medium"
            >
              Graduation
            </Link>
            <Link 
              to="/categories/romantic" 
              className="text-romantic hover:text-primary transition-colors font-medium"
            >
              Valentine's
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/auth')}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/categories/graduation" 
                className="text-graduation hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Graduation
              </Link>
              <Link 
                to="/categories/romantic" 
                className="text-romantic hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Valentine's
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;