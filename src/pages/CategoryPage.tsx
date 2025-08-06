import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getProductsByCategory, getCategoryById } from '@/data/mockData';

const CategoryPage = () => {
  const { categoryName } = useParams();
  
  // Map URL params to category IDs
  const categoryId = categoryName === 'graduation' ? 'cat-graduation' : 
                    categoryName === 'romantic' ? 'cat-romantic' : '';
  
  const category = getCategoryById(categoryId);
  const products = getProductsByCategory(categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryColors = {
    'cat-graduation': {
      bg: 'bg-gradient-graduation',
      text: 'text-graduation',
      shadow: 'shadow-graduation'
    },
    'cat-romantic': {
      bg: 'bg-gradient-romantic',
      text: 'text-romantic',
      shadow: 'shadow-romantic'
    }
  };

  const colors = categoryColors[categoryId as keyof typeof categoryColors];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Hero */}
      <section className={`${colors.bg} text-white py-20`}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              {category.name} Collection
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold">
              {category.name} Gifts
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {category.description}
            </p>
            <div className="pt-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {products.length} Products Available
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">No products available</h3>
              <p className="text-muted-foreground">
                We're working on adding more products to this category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;