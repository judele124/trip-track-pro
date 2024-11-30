export const CustomMarker = ({ index }: { index: number }) => {
    const element = document.createElement('div');
    element.className = `flex items-center justify-center w-6 h-6
      rounded-full bg-red-500 border-2 border-white shadow-lg 
      text-white font-bold text-sm cursor-pointer transition-transform 
      duration-0 hover:scale-110`;
  
    const numberP = document.createElement('p');
    numberP.textContent = (index + 1).toString();
    element.appendChild(numberP);
  
    return element;
};  