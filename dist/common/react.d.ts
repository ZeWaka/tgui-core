/**
 * Helper for conditionally adding/removing classes in React
 */
export declare function classes(classNames: (string | BooleanLike)[]): string;
/**
 * Normalizes children prop, so that it is always an array of VDom
 * elements.
 */
export declare function normalizeChildren<T>(children: T | T[]): T[];
/**
 * Shallowly checks if two objects are different.
 * Credit: https://github.com/developit/preact-compat
 */
export declare function shallowDiffers(a: Record<string, any>, b: Record<string, any>): boolean;
/**
 * A common case in tgui, when you pass a value conditionally, these are
 * the types that can fall through the condition.
 */
export type BooleanLike = number | boolean | null | undefined;
/**
 * A helper to determine whether the object is renderable by React.
 */
export declare function canRender(value: unknown): boolean;
