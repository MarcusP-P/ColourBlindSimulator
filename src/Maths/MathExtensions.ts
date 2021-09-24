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
		roundToPrecision (value :number, precision :number) :number;
	}
}

// I determine if the given collection is empty (a silly example for the demo).
// --
// CAUTION: Augmentations for the global scope can only be directly nested in external
// modules or ambient module declarations. As such, we are EXPORTING this function to
// force this file to become an "external module" (one that imports or exports other
// modules).
export function roundToPrecision(value: number, precision: number): number {
    return Math.round(value*Math.pow(10,precision))/Math.pow(10,precision);
}

// Protect against conflicting definitions. Since each module in Node.js is evaluated
// only once (and then cached in memory), we should never hit this line more than once
// (no matter how many times we include it). As such, the only way this method would
// already be defined is if another module has injected it without knowing that this
// module would follow-suit.
// @ts-expect-error -- this should not be true before it's been assigned. hide ts(2774)
if ( Math.roundToPrecision ) {

	throw( new Error( "Math.roundToPrecision is already defined - overriding it will be dangerous." ) );

}

// Augment the global Array constructor (ie, add a static method).
Math.roundToPrecision = roundToPrecision;

// Provide extensions to Math class to allow rounding to arbitrary precision
