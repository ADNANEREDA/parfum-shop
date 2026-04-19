const SkeletonCard = () => {
  return (
    <div className="bg-[#111] border border-white/5 overflow-hidden animate-pulse">
      
      <div className="aspect-[3/4] bg-white/5 w-full"></div>
      
      <div className="p-5 flex flex-col items-center border-t border-white/5">
        
        <div className="h-2 w-1/3 bg-brand-accent/20 mb-3 rounded-full"></div>
        
        <div className="h-3 w-3/4 bg-white/10 mb-4 rounded-full"></div>
        
        <div className="h-2 w-1/4 bg-white/5 rounded-full mt-2"></div>
      </div>
      
    </div>
  );
};

export default SkeletonCard;