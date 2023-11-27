"use strict";
exports.__esModule = true;
/**
 * Performs type check of a string
 */
function instanceOfString(value) {
    return typeof value === 'string' || value instanceof String;
}
/**
 * Performs type check of an Array of strings
 */
function instanceOfArray(value) {
    return Array.isArray(value) && value.every(instanceOfString);
}
/**
 * Performs type checks and sets value overrides.
 */
function overrideValue(collection, overrides) {
    if (instanceOfString(collection) || instanceOfArray(collection) || typeof collection === 'boolean') {
        return overrides;
    }
    if (instanceOfString(overrides) || instanceOfArray(overrides) || typeof overrides === 'boolean') {
        return overrides;
    }
    for (var key in overrides) {
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
function setOverrides(collection, overrides) {
    for (var key in overrides) {
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
module.exports = function ClassGroup(collection) {
    if (collection === void 0) { collection = {}; }
    var overrides = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        overrides[_i - 1] = arguments[_i];
    }
    if (overrides === null || overrides === void 0 ? void 0 : overrides.length) {
        overrides === null || overrides === void 0 ? void 0 : overrides.forEach(function (override) { return (collection = setOverrides(collection, override)); });
    }
    var classGroup = {};
    function flatten(col, arr) {
        if (instanceOfString(col)) {
            arr.push(col);
            return arr;
        }
        if (instanceOfArray(col)) {
            for (var _i = 0, col_1 = col; _i < col_1.length; _i++) {
                var value = col_1[_i];
                arr.push(value);
            }
            return arr;
        }
        if (typeof col === 'boolean') {
            return arr;
        }
        for (var key in col) {
            if (Object.prototype.hasOwnProperty.call(col, key)) {
                flatten(col[key], arr);
            }
        }
        return arr;
    }
    for (var key in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, key)) {
            classGroup[key] = flatten(collection[key], []).filter(Boolean).join(' ');
        }
    }
    return classGroup;
};
