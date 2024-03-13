const PriceCard = ({tag,icon,price}) => {
  return (
    <div className="w-[40%] m-2 bg-slate-50 inline-block px-4 py-2 rounded-lg shadow-sm">
      <h4 className="text-xs mb-2 text-slate-600">{tag}</h4>
      <div className="flex flex-nowrap">
        {icon}
        <h1 className="inline-block font-bold text-base">₹{price}</h1>
      </div>
    </div>
  );
};

export default PriceCard;
