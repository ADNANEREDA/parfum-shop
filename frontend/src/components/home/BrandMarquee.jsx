import dior from '../../assets/images/logos/dior.png';
import chanell from '../../assets/images/logos/chanell.png';
import cr7 from '../../assets/images/logos/cr7.png';
import prada from '../../assets/images/logos/Prada.png';
import louis_vuitton from '../../assets/images/logos/Louis-Vuitton.png';
import yves from '../../assets/images/logos/Yves.png';
import amrani from '../../assets/images/logos/Armani.png';
import hermes from '../../assets/images/logos/Hermès.png';
import tom from '../../assets/images/logos/Tom-Ford.png';
import Creed from '../../assets/images/logos/Creed.png';
import Givenchy from '../../assets/images/logos/Givenchy.png';

const BrandMarquee = () => {
  const brands = [
    { name: 'Dior', logo: dior },
    { name: 'Chanel', logo: chanell },
    { name: 'cr7', logo: cr7 },
    { name: 'Prada', logo: prada },
    { name: 'Louis Vuitton', logo: louis_vuitton },
    { name: 'Yves Saint Laurent', logo: yves },
    { name: 'Amrani', logo: amrani },
    { name: 'Hermès', logo: hermes },
    { name: 'Tom Ford', logo: tom },
    { name: 'Creed', logo: Creed },
    { name: 'Givenchy', logo: Givenchy }
  ];

  return (
    <div className="bg-brand-dark py-10 border-y border-white/10 relative overflow-hidden whitespace-nowrap">
      <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none"></div>

      <div className="animate-marquee hover:[animation-play-state:paused] inline-block">
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <div key={index} className="inline-flex items-center justify-center group cursor-pointer mx-8 md:mx-16 align-middle">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-8 md:h-12 w-24 md:w-32 object-contain grayscale brightness-0 invert opacity-50 group-hover:opacity-100 transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;