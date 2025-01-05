import React from "react";

interface ProgressLineProps {
  length: number;
  index: number; 
  className?: string
  lineColor?: 'secondary' | 'primary' | 'light' | 'dark'
  fillColor?: 'secondary' | 'primary' | 'light' | 'dark'
}

const ProgressLine: React.FC<ProgressLineProps> = ({ length, index , lineColor = 'secondary' , fillColor = 'primary' , ...props }) => {
    const {className} = props
  return (
    <div  className={`${className} h-full w-full flex items-center justify-center p-4`}>
      {Array.from({ length }, (_, i) => (
        <React.Fragment key={i}>
          <div
            className={`min-w-5 h-5 rounded-full border-2 ${
              i === index
                ? `bg-${fillColor} border-${fillColor}`
                : `bg-transparent border-${fillColor}`
            }`}
          ></div>
          {i < length - 1 && (
            <div className={`w-full border-t-2 border-dashed ${index > i ? `border-${fillColor}` : `border-${lineColor}`} mx-2`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressLine;