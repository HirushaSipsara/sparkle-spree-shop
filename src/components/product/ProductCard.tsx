import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const categoryClass = product.category?.name === 'Graduation' 
    ? 'shadow-graduation' 
    : product.category?.name === 'Romantic' 
    ? 'shadow-romantic' 
    : 'shadow-soft';

  return (
    <Link to={`/products/${product.id}`}>
      <Card className={`group hover:${categoryClass} transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Like Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-romantic text-romantic' : 'text-muted-foreground'}`} />
          </Button>

          {/* Featured Badge */}
          {product.is_featured && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}

          {/* Stock Badge */}
          {product.stock_quantity < 5 && product.stock_quantity > 0 && (
            <Badge variant="destructive" className="absolute bottom-2 left-2">
              Only {product.stock_quantity} left!
            </Badge>
          )}
          
          {product.stock_quantity === 0 && (
            <Badge variant="destructive" className="absolute bottom-2 left-2">
              Out of Stock
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {product.description}
            </p>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
              <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.category && (
              <Badge 
                variant="secondary" 
                className={`w-fit text-xs ${
                  product.category.name === 'Graduation' 
                    ? 'text-graduation border-graduation/20' 
                    : product.category.name === 'Romantic'
                    ? 'text-romantic border-romantic/20'
                    : ''
                }`}
              >
                {product.category.name}
              </Badge>
            )}
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className="bg-gradient-hero hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;