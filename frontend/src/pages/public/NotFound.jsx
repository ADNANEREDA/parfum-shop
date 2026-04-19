import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] bg-[#050505] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl md:text-[150px] font-serif text-brand-accent italic mb-2 leading-none drop-shadow-2xl">
        404
      </h1>

      <h2 className="text-2xl md:text-4xl font-serif text-white mb-6 tracking-wide">
        Page Not Found
      </h2>

      <p className="text-gray-500 text-[9px] md:text-xs uppercase tracking-[0.3em] max-w-md mx-auto mb-12 leading-relaxed">
        The fragrance you are looking for seems to have evaporated. Let's guide you back to our collection.
      </p>

      <Link
        to="/perfumes"
        className="px-10 py-4 border border-brand-accent text-brand-accent text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-black transition-all duration-500 shadow-xl"
      >
        Return to Catalog
      </Link>
    </div>
  );
};

export default NotFound;