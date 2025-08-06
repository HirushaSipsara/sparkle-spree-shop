import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { getProductById, products } from '@/data/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = getProductById(id || '');
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, customMessage || undefined, giftWrapping);
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const increaseQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = product.price * quantity + (giftWrapping ? 5.99 * quantity : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/products')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.is_featured && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm hover:bg-card"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-romantic text-romantic' : 'text-muted-foreground'}`} />
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {product.category && (
                  <Badge 
                    variant="secondary"
                    className={`${
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
                {product.stock_quantity < 5 && product.stock_quantity > 0 && (
                  <Badge variant="destructive">
                    Only {product.stock_quantity} left!
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                <span className="text-muted-foreground">(4.8) • 127 reviews</span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>
              <p className="text-muted-foreground">
                Free shipping on orders over $50
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-muted-foreground">
                    ({product.stock_quantity} available)
                  </span>
                </div>
              </div>

              {/* Custom Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Custom Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message to make this gift extra special..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>

              {/* Gift Wrapping */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="giftwrap"
                  checked={giftWrapping}
                  onCheckedChange={(checked) => setGiftWrapping(checked as boolean)}
                />
                <Label htmlFor="giftwrap" className="text-sm">
                  Add gift wrapping (+$5.99)
                </Label>
              </div>

              {/* Total Price */}
              {(quantity > 1 || giftWrapping) && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Product ({quantity}x)</span>
                      <span>${(product.price * quantity).toFixed(2)}</span>
                    </div>
                    {giftWrapping && (
                      <div className="flex justify-between">
                        <span>Gift wrapping ({quantity}x)</span>
                        <span>${(5.99 * quantity).toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-hero hover:opacity-90 text-lg py-6"
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              <Button variant="outline" size="lg" className="w-full">
                Buy Now
              </Button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center space-y-2">
                <Truck className="h-6 w-6 text-primary mx-auto" />
                <div className="text-sm">
                  <div className="font-medium">Fast Delivery</div>
                  <div className="text-muted-foreground">2-3 business days</div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-6 w-6 text-success mx-auto" />
                <div className="text-sm">
                  <div className="font-medium">Quality Guarantee</div>
                  <div className="text-muted-foreground">30-day warranty</div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <RotateCcw className="h-6 w-6 text-warning mx-auto" />
                <div className="text-sm">
                  <div className="font-medium">Easy Returns</div>
                  <div className="text-muted-foreground">Hassle-free returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">You Might Also Like</h2>
              <p className="text-muted-foreground">
                More beautiful gifts from the same category
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;