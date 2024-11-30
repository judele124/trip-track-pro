const ClearRouteButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`
         bg-red-500 text-white rounded-md text-sm font-medium px-4 py-2
         hover:bg-red-600 transition-colors focus:outline-none focus:ring-2
         focus:ring-red-500 focus:ring-offset-2`}
    >
      Clear Route
    </button>
  );
  
export default ClearRouteButton;