import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/hooks/useCart';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto" />
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button size="lg" className="bg-gradient-hero hover:opacity-90">
              <Link to="/products" className="flex items-center">
                Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <Card key={`${item.product.id}-${item.customMessage}-${item.giftWrapping}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              <Link 
                                to={`/products/${item.product.id}`}
                                className="hover:text-primary transition-colors"
                              >
                                {item.product.name}
                              </Link>
                            </h3>
                            {item.product.category && (
                              <Badge variant="secondary" className="text-xs">
                                {item.product.category.name}
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(
                              item.product.id, 
                              item.customMessage, 
                              item.giftWrapping
                            )}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        {/* Custom Message */}
                        {item.customMessage && (
                          <div className="text-sm">
                            <span className="font-medium">Custom Message:</span>
                            <p className="text-muted-foreground italic">"{item.customMessage}"</p>
                          </div>
                        )}

                        {/* Gift Wrapping */}
                        {item.giftWrapping && (
                          <Badge variant="outline" className="w-fit">
                            🎁 Gift Wrapped
                          </Badge>
                        )}

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(
                                item.product.id, 
                                item.quantity - 1, 
                                item.customMessage, 
                                item.giftWrapping
                              )}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(
                                item.product.id, 
                                item.quantity + 1, 
                                item.customMessage, 
                                item.giftWrapping
                              )}
                              disabled={item.quantity >= item.product.stock_quantity}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-lg">
                              ${(item.product.price * item.quantity + (item.giftWrapping ? 5.99 * item.quantity : 0)).toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${item.product.price.toFixed(2)} each
                              {item.giftWrapping && ' + $5.99 gift wrap'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success font-medium">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {subtotal < 50 && (
                  <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    💡 Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
                  </div>
                )}

                <Button size="lg" className="w-full bg-gradient-hero hover:opacity-90">
                  <Link to="/checkout" className="flex items-center w-full justify-center">
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="w-full">
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card>
              <CardContent className="p-4 text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-success">🔒</span>
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <p>Your payment information is protected with industry-standard encryption.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;