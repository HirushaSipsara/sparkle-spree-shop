import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, total, shippingAddress } = location.state || {};

  useEffect(() => {
    // Track order completion event
    console.log('Order completed:', { orderId, total });
  }, [orderId, total]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="bg-success/10 p-6 rounded-full">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-success">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          {orderId && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Package className="mr-2 h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Order Number:</span>
                  </div>
                  <div>
                    <Badge variant="secondary">{orderId}</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Total Amount:</span>
                  </div>
                  <div className="font-semibold text-lg">
                    ${total}
                  </div>
                  <div>
                    <span className="font-medium">Payment Status:</span>
                  </div>
                  <div>
                    <Badge className="bg-success text-white">Paid</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Order Status:</span>
                  </div>
                  <div>
                    <Badge variant="outline">Processing</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shipping Information */}
          {shippingAddress && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-left space-y-2">
                  <div className="font-medium">{shippingAddress.name}</div>
                  <div>{shippingAddress.address_line_1}</div>
                  {shippingAddress.address_line_2 && (
                    <div>{shippingAddress.address_line_2}</div>
                  )}
                  <div>
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}
                  </div>
                  <div className="text-muted-foreground mt-4">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Confirmation sent to {shippingAddress.email}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* What's Next */}
          <Card>
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <div className="font-medium">Order Processing</div>
                  <div className="text-sm text-muted-foreground">
                    We're preparing your items for shipment (1-2 business days)
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <div className="font-medium">Shipping</div>
                  <div className="text-sm text-muted-foreground">
                    Your order will be shipped via our standard delivery (2-3 business days)
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <div className="font-medium">Delivery</div>
                  <div className="text-sm text-muted-foreground">
                    You'll receive tracking information and delivery updates via email
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-hero hover:opacity-90">
              <Link to="/products" className="flex items-center">
                Continue Shopping <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg">
              <Link to="/account/orders">
                View My Orders
              </Link>
            </Button>
          </div>

          {/* Support */}
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@giftshop.com" className="text-primary hover:underline">
                support@giftshop.com
              </a>{' '}
              or call 1-800-GIFTS-US
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;