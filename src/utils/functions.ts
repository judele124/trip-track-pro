import {
  Children,
  isValidElement,
  JSXElementConstructor,
  ReactNode,
} from "react";

export const validateRequiredChildren = (
  children: ReactNode,
  requiredComponents: JSXElementConstructor<any>[],
) => {
  const childTypes = new Set(
    Children.toArray(children)
      .filter(isValidElement)
      .map((child) => child.type),
  );

  const missingComponents = requiredComponents.filter(
    (component) => !childTypes.has(component),
  );

  if (missingComponents.length > 0) {
    const missingNames = missingComponents
      .map((comp) => comp.name || "Unknown Component")
      .join(", ");

    throw new Error(`Dropdown is missing required children: ${missingNames}.`);
  }
};
