import { Link } from 'react-router-dom';
import women from '../../assets/images/miss.png';
import men from '../../assets/images/men(2).png';
import unisex from '../../assets/images/unisex.png';
import luxury from '../../assets/images/to-brands.jpg';

const CategoryGrid = () => {
  const categories = [
    {
      id: 'women',
      title: 'Women',
      image: women,
      link: '/perfumes?category=women',
      cta: 'Discover'
    },
    {
      id: 'men',
      title: 'Men',
      image: men,
      link: '/perfumes?category=men',
      cta: 'Discover'
    },
    {
      id: 'unisex',
      title: 'Unisex',
      image: unisex,
      link: '/perfumes?category=unisex',
      cta: 'Discover'
    },
    {
      id: 'luxury',
      title: 'Luxury Brands',
      image: luxury,
      link: '/perfumes?category=luxury',
      cta: 'View All'
    }
  ];

  return (
    <section className="py-10 bg-brand-dark">
      <div className="w-full">
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-accent mb-4">
            Discover The Collections
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent mx-auto"></div>
          <p className="mt-6 text-xs font-sans tracking-[0.2em] text-gray-500 uppercase">
            Find the perfect match for your personality
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative h-[50vh] lg:h-[75vh] overflow-hidden cursor-pointer bg-brand-dark block"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-50 transition-all duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-colors duration-1000 z-10 pointer-events-none"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
                <h3 className="text-white text-3xl lg:text-4xl font-serif tracking-[0.2em] uppercase mb-4 transform group-hover:-translate-y-2 transition-transform duration-700 leading-tight">
                  {category.title}
                </h3>
                <span className="text-brand-accent text-[10px] font-bold tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  {category.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;