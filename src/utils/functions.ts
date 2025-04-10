import {
	Children,
	isValidElement,
	JSXElementConstructor,
	ReactNode,
} from 'react';

export const validateRequiredChildren = (
	children: ReactNode,
	requiredComponents: JSXElementConstructor<any>[]
) => {
	const childTypes = new Set(
		Children.toArray(children)
			.filter(isValidElement)
			.map((child) => child.type)
	);

	const missingComponents = requiredComponents.filter(
		(component) => !childTypes.has(component)
	);

	if (missingComponents.length > 0) {
		const missingNames = missingComponents
			.map((comp) => comp.name || 'Unknown Component')
			.join(', ');

		throw new Error(`Dropdown is missing required children: ${missingNames}.`);
	}
};

export function mergeRefs<T>(
	...refs: (React.Ref<T> | undefined)[]
): React.Ref<T> {
	return (node: T) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(node);
			} else if (ref && typeof ref === 'object') {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		});
	};
}

export function canBrowserShareData(data: ShareData) {
	if (!navigator.share || !navigator.canShare) {
		return false;
	}

	return navigator.canShare(data);
}

export function calculateDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
) {
	const R = 6371; // Radius of Earth in kilometers
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * (Math.PI / 180)) *
			Math.cos(lat2 * (Math.PI / 180)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in kilometers
}
