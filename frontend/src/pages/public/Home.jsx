import HeroSlider from '../../components/home/HeroSlider';
import CategoryGrid from '../../components/home/CategoryGrid';
import BrandMarquee from '../../components/home/BrandMarquee';
import Footer from '../../components/layout/Footer';

const Home = () => {
  return (
    <div className="w-full">
      
      <HeroSlider />

      <CategoryGrid />

      <section className="bg-brand-dark pt-4">
        
        <div className="text-center mb-6 px-4">
          <span className="text-brand-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-3 block">
            Partners of Excellence
          </span>
          <h2 className="text-3xl font-serif text-brand-light mb-4">
            Our Prestigious Brands
          </h2>
          <div className="w-10 h-[1px] bg-brand-accent/50 mx-auto"></div>
        </div>

        <BrandMarquee />
        
      </section>

    </div>
  );
};

export default Home;