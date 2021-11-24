// If we want to augment one of the global / native modules, like Array, we have to use
// the special "global" module reference.

declare global {
	// If we want to add STATIC METHODS to one of the native Classes, we have to
	// "declaration merge" an interface into the existing class interface.
	// --
	// NOTE: Unlike application class augmentation, which uses a "namespace" merge to
	// create static methods, native classes are modelled as Interfaces. As such, we
	// have to use interface merging using one of the special Constructor interfaces.
	interface Math {
		isZero (value :number) :boolean;
	}
}

// I determine if the given collection is empty (a silly example for the demo).
// --
// CAUTION: Augmentations for the global scope can only be directly nested in external
// modules or ambient module declarations. As such, we are EXPORTING this function to
// force this file to become an "external module" (one that imports or exports other
// modules).
export function isZero (value :number) :boolean {
    return Math.abs(value)<1e-9;
}

// Protect against conflicting definitions. Since each module in Node.js is evaluated
