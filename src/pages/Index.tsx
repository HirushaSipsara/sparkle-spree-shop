import { Link } from 'react-router-dom';
import { ArrowRight, Heart, GraduationCap, Gift, Star, Truck, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/data/mockData';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Gift Shop Hero" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              ✨ Special Occasions Made Perfect
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Celebrate Life's
              <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                Special Moments
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              From graduation achievements to romantic gestures, find the perfect gift to make every moment unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                <Link to="/products" className="flex items-center">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8">
                <Link to="/categories/graduation">
                  Graduation Gifts
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shop by Occasion</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collections designed for life's most meaningful celebrations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Graduation Category */}
            <Card className="group hover:shadow-graduation transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-graduation">
                  <div className="absolute inset-0 bg-graduation/20"></div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center text-white">
                    <GraduationCap className="h-16 w-16 mb-4 text-white" />
                    <h3 className="text-3xl font-bold mb-2">Graduation Gifts</h3>
                    <p className="text-white/90 mb-6">
                      Celebrate academic achievements with our adorable graduation teddy bears and commemorative gifts.
                    </p>
                    <Button className="bg-white text-graduation hover:bg-white/90 w-fit">
                      <Link to="/categories/graduation" className="flex items-center">
                        Shop Graduation <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Romantic Category */}
            <Card className="group hover:shadow-romantic transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-romantic">
                  <div className="absolute inset-0 bg-romantic/20"></div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center text-white">
                    <Heart className="h-16 w-16 mb-4 text-white" />
                    <h3 className="text-3xl font-bold mb-2">Romantic Gifts</h3>
                    <p className="text-white/90 mb-6">
                      Express your love with our romantic Valentine's Day collections and heartfelt gift sets.
                    </p>
                    <Button className="bg-white text-romantic hover:bg-white/90 w-fit">
                      <Link to="/categories/romantic" className="flex items-center">
                        Shop Romance <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our most popular gifts that bring joy to every celebration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-hero hover:opacity-90">
              <Link to="/products" className="flex items-center">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Gift Shop?</h2>
            <p className="text-xl text-muted-foreground">
              We're committed to making your gift-giving experience exceptional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 hover:shadow-soft transition-shadow">
              <CardContent className="space-y-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Free shipping on orders over $50. Express delivery available for last-minute gifts.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-soft transition-shadow">
              <CardContent className="space-y-4">
                <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  30-day satisfaction guarantee. If you're not happy, we'll make it right.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-soft transition-shadow">
              <CardContent className="space-y-4">
                <div className="bg-warning/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-8 w-8 text-warning" />
                </div>
                <h3 className="text-xl font-semibold">Gift Wrapping</h3>
                <p className="text-muted-foreground">
                  Beautiful gift wrapping and custom messages available for that perfect presentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
