import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cr7Fragrances from '../../assets/images/edited-cr7.png';
import Fragrances from '../../assets/images/edited-img2.png';
import sauvage from '../../assets/images/femme.jpg';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: cr7Fragrances,
      brand: "CR7 FRAGRANCES",
      title: "Play Like A Champion",
      subtitle: "Discover the new energetic signature scent for men.",
      btnText: "Shop The Collection",
      bgPosition: "bg-[87%_top] md:bg-center"
    },
    {
      id: 2,
      image: Fragrances,
      brand: "YVES SAINT LAURENT",
      title: "Absolute Elegance",
      subtitle: "Unleash your inner confidence with our best-sellers.",
      btnText: "Discover For Her",
      bgPosition: "bg-[85%_top] md:bg-center"
    },
    {
      id: 3,
      image: sauvage,
      brand: "PARFUMSHOP EXCLUSIVE",
      title: "The Art of Fragrance",
      subtitle: "A symphony of rare ingredients crafted by master perfumers.",
      btnText: "Explore Catalog",
      bgPosition: "bg-[20%_top] md:bg-center"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] w-full overflow-hidden bg-black">
      
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div 
            className={`absolute inset-0 bg-cover ${slide.bgPosition} transition-transform duration-[6s] ease-out ${index === current ? 'scale-105' : 'scale-100'}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
            <span className="text-brand-accent text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase mb-3 md:mb-4 drop-shadow-lg">
              {slide.brand}
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 md:mb-6 drop-shadow-2xl leading-tight italic">
              {slide.title}
            </h1>
            
            <p className="text-gray-200 font-sans tracking-wide md:tracking-widest text-[10px] sm:text-xs md:text-sm max-w-[280px] sm:max-w-md md:max-w-lg mb-8 md:mb-10 drop-shadow-md">
              {slide.subtitle}
            </p>
            
            <Link 
              to="/perfumes" 
              className="px-6 md:px-10 py-3 md:py-4 bg-white/10 backdrop-blur-md text-white border border-white/50 hover:bg-white hover:text-black transition-all duration-500 font-bold uppercase tracking-[0.2em] text-[9px] md:text-xs"
            >
              {slide.btnText}
            </Link>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-3 md:space-x-4">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[2px] md:h-1 transition-all duration-500 rounded-full ${index === current ? 'bg-brand-accent w-8 md:w-12' : 'bg-white/30 w-3 md:w-4 hover:bg-white'}`}
          ></button>
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;