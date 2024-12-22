import {
  CSSProperties,
  FC,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

type ModalAnchor =
  | "center"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "top-left";

type ModalProps = {
  open: boolean;
  onBackdropClick: () => void;
  children?: ReactNode;
  anchorElement?: RefObject<HTMLElement>;
  anchorTo?: ModalAnchor;
  center?: boolean;
  translate?: [number, number];
};
const Modal: FC<ModalProps> = ({
  open,
  onBackdropClick,
  anchorElement,
  anchorTo = "center",
  center = false,
  // translate = [0, 0],
  children,
}) => {
  if (!open) return null;

  const [positions, setPositions] = useState([0, 0, 0, 0]);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (center) {
      return;
    }
    if (anchorElement?.current && childrenRef.current) {
      const rect = anchorElement.current.getBoundingClientRect();
      const childrenRect = childrenRef.current.getBoundingClientRect();

      switch (anchorTo) {
        case "top": {
          // Modal's top edge is aligned with the anchor's bottom edge, centered horizontally
          const centerHorizontal = rect.left + rect.width / 2;
          setPositions([
            rect.bottom, // Top of the modal
            centerHorizontal + childrenRect.width / 2, // Right
            rect.bottom + childrenRect.height, // Bottom
            centerHorizontal - childrenRect.width / 2, // Left
          ]);
          break;
        }

        case "top-right": {
          // Modal's top-right corner is aligned with the anchor's bottom-left corner
          setPositions([
            rect.bottom, // Top of the modal
            rect.left, // Right of the modal
            rect.bottom + childrenRect.height, // Bottom of the modal
            rect.left - childrenRect.width, // Left of the modal
          ]);
          break;
        }

        case "right": {
          // Modal's left edge is aligned with the anchor's right edge, centered vertically
          const centerVertical = rect.top + rect.height / 2;
          setPositions([
            centerVertical - childrenRect.height / 2, // Top
            rect.left, // Right
            centerVertical + childrenRect.height / 2, // Bottom
            rect.left - childrenRect.width, // Left
          ]);
          break;
        }

        case "bottom-right": {
          // Modal's top-left corner is aligned with the anchor's bottom-right corner
          setPositions([
            rect.top - childrenRect.height, // Top of the modal
            rect.left, // Right
            rect.top, // Bottom
            rect.left - childrenRect.width, // Left
          ]);
          break;
        }

        case "bottom": {
          // Modal's top edge is aligned with the anchor's bottom edge, centered horizontally
          const centerHorizontal = rect.left + rect.width / 2;
          setPositions([
            rect.top - childrenRect.height, // Top of the modal
            centerHorizontal + childrenRect.width / 2, // Right
            rect.top, // Bottom
            centerHorizontal - childrenRect.width / 2, // Left
          ]);
          break;
        }

        case "bottom-left": {
          // Modal's top-right corner is aligned with the anchor's bottom-left corner
          setPositions([
            rect.top - childrenRect.height, // Top of the modal
            rect.right - childrenRect.width, // Right
            rect.top, // Bottom
            rect.right, // Left
          ]);
          break;
        }

        case "left": {
          // Modal's right edge is aligned with the anchor's left edge, centered vertically
          const centerVertical = rect.top + rect.height / 2;
          setPositions([
            centerVertical - childrenRect.height / 2, // Top
            rect.right - childrenRect.width, // Right
            centerVertical + childrenRect.height / 2, // Bottom
            rect.right, // Left
          ]);
          break;
        }

        case "top-left": {
          // Modal's bottom-right corner is aligned with the anchor's top-left corner
          setPositions([
            rect.bottom, // Top of the modal
            rect.right - childrenRect.width, // Right
            rect.bottom + childrenRect.height, // Bottom
            rect.right, // Left
          ]);
          break;
        }

        case "center": {
          // Modal is centered horizontally and vertically relative to the anchor
          const centerHorizontal = rect.left + rect.width / 2;
          const centerVertical = rect.top + rect.height / 2;
          setPositions([
            centerVertical - childrenRect.height / 2, // Top
            centerHorizontal + childrenRect.width / 2, // Right
            centerVertical + childrenRect.height / 2, // Bottom
            centerHorizontal - childrenRect.width / 2, // Left
          ]);
          break;
        }
      }
    }
  }, [anchorElement, anchorTo]);

  return (
    <div
      onClick={onBackdropClick}
      className="page-padding absolute inset-0 bg-gray-950/70 backdrop-blur-sm"
    >
      <div
        className="relative w-full"
        ref={childrenRef}
        onClick={(e) => e.stopPropagation()}
        style={getPositionStyles(center, positions)}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

const getPositionStyles = (
  center: boolean,
  positions: number[],
): CSSProperties => {
  if (center) {
    return { left: "50%", top: "50%", transform: "translate(-50%, -50%)" };
  }

  return {
    top: `${positions?.[0] || 0}px`,
    right: `${positions?.[1] || 0}px`,
    bottom: `${positions?.[2] || 0}px`,
    left: `${positions?.[3] || 0}px`,
  };
};
