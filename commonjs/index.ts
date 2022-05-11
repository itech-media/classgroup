import type { Output, OptionValue, Options } from '../ClassGroup';

/**
 * Performs type check of a string
 */
function instanceOfString(value: any): value is string {
    return typeof value === 'string' || value instanceof String;
}

/**
 * Performs type check of an Array of strings
 */
function instanceOfArray(value: any): value is string[] {
    return Array.isArray(value) && value.every(instanceOfString);
}

/**
 * Performs type checks and sets value overrides.
 */
function overrideValue(collection: OptionValue, overrides: OptionValue): OptionValue {
    if (instanceOfString(collection) || instanceOfArray(collection) || typeof collection === 'boolean') {
        return overrides;
    }

    if (instanceOfString(overrides) || instanceOfArray(overrides) || typeof overrides === 'boolean') {
        return overrides;
    }

    for (const key in overrides) {
        if (Object.prototype.hasOwnProperty.call(overrides, key)) {
            if (collection[key]) {
                collection[key] = overrideValue(collection[key], overrides[key]);
                continue;
            }
    
            collection[key] = overrides[key];
        }
    }

    return collection;
}

/**
 * Replaces collection key values with matching overrides.
 * Overrides parameter structure must correspond to that of the collection parameter targetted key structures.
 */
function setOverrides(collection: Options, overrides: Options): Options {
    for (const key in overrides) {
        if (Object.prototype.hasOwnProperty.call(overrides, key)) {
            if (collection[key]) {
                collection[key] = overrideValue(collection[key], overrides[key]);
                continue;
            }
    
            collection[key] = overrides[key];
        }
    }

    return collection;
}

/**
 * Recursively flattens the collection parameter into a single dimension object transforming each key value into a string.
 * If the overrides parameter is present it will compare and replace the collection targetted key values before flattening.
 */
module.exports = function ClassGroup(collection: Options = {}, ...overrides: Options[]): Output {
    if (overrides?.length) {
        overrides?.forEach((override) => (collection = setOverrides(collection, override)));
    }

    const classGroup: Output = {};

    function flatten(col: OptionValue, arr: string[]) {
        if (instanceOfString(col)) {
            arr.push(col);
            return arr;
        }

        if (instanceOfArray(col)) {
            for (const value of col) {
                arr.push(value);
            }
            return arr;
        }

        if (typeof col === 'boolean') {
            return arr;
        }

        for (const key in col) {
            if (Object.prototype.hasOwnProperty.call(col, key)) {
                flatten(col[key], arr);
            }
        }

        return arr;
    }

    for (const key in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, key)) {
            classGroup[key] = flatten(collection[key], []).filter(Boolean).join(' ');
        }
    }

    return classGroup;
}
