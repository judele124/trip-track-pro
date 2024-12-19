import React, { useEffect, useRef, useState } from "react";

interface Tt9Props {
  ancorElemtnt?: { name: string; abouve?: boolean; under?: boolean };
  center?: boolean;
  position?: [number, number];
  children?: React.ReactNode;
}

const Tt9: React.FC<Tt9Props> = ({
  ancorElemtnt,
  center = false,
  position,
  children,
}) => {
  const [posByAncor, setPosByAncor] = useState<[number, number] | null>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ancorElemtnt) {
      const element = document.getElementById(ancorElemtnt.name);
      if (element) {
        setPosByAncor([element.offsetTop, element.offsetLeft]);
      }
    }
  }, [ancorElemtnt]);

  const computedTop = () => {
    if (!posByAncor) return position ? `${position[0]}px` : undefined;
    if (!position) position = [0, 0];
    const anchorTop = posByAncor[0];
    const childrenHeight = childrenRef.current?.offsetHeight || 0;

    if (ancorElemtnt?.abouve) {
      return `${anchorTop - childrenHeight - position[0]}px`;
    }

    if (ancorElemtnt?.under) {
      const element = document.getElementById(ancorElemtnt.name);
      const anchorHeight = element?.offsetHeight || 0;
      return `${anchorTop + anchorHeight + position[0]}px`;
    }

    return `${anchorTop}px`;
  };

  const computedStyle: React.CSSProperties = {
    top: computedTop(),
    left: posByAncor
      ? `${posByAncor[1] + (position ? position[1] : 0)}px`
      : position
        ? `${position[1]}px`
        : undefined,
  };

  return (
    <div className="absolute left-0 top-0 z-50 h-full w-full overflow-hidden bg-gray-950 opacity-85">
      <div
        className={`relative w-fit ${
          center && !position && !posByAncor
            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            : ""
        }`}
        ref={childrenRef}
        style={computedStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default Tt9;