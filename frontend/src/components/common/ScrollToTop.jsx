import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // useLocation nous permet de savoir sur quelle page on est
  const { pathname } = useLocation();

  useEffect(() => {
    // À chaque fois que le 'pathname' (l'URL) change, on remonte le scroll à X: 0, Y: 0
    window.scrollTo(0, 0);
  }, [pathname]);

  // Ce composant n'affiche rien visuellement
  return null; 
};

export default ScrollToTop;