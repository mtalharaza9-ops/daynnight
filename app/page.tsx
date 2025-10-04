import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import BestSellers from '@/components/BestSellers';
import FlashDeals from '@/components/FlashDeals';
import WhyShopWithUs from '@/components/WhyShopWithUs';
import CustomerReviews from '@/components/CustomerReviews';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Categories />
      <BestSellers />
      <FlashDeals />
      <Products />
      <WhyShopWithUs />
      <CustomerReviews />
      <Newsletter />
    </main>
  );
}