import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Products from '@/components/Products';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Categories />
      <Products />
    </main>
  );
}