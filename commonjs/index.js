/**
 * Replaces collection key values with matching overrides.
 * Overrides structure must correspond to collection targetted key structures.
 * @param {Object} classgroup 
 * @param {Object} overrides 
 * @returns {Object}
 */
 function setOverrides(collection = {}, overrides = {}) {
    if (!overrides || !Object.keys(overrides).length) return collection;

    for (const key in overrides) {
        if (Object.hasOwnProperty.call(collection, key)) {
            if (Object.prototype.toString.call(overrides[key]) === '[object Object]') {
                setOverrides(collection[key], overrides[key]);
                continue;
            }
        }
        
        collection[key] = overrides[key];
    }

    return collection;
}

/**
 * Flattens the collection parameter into a single dimension object where each key value is a string.
 * If the overrides parameter is present it will replace the targetted key values before flattening.
 * @param {Object} collection 
 * @param {Object} overrides 
 * @returns 
 */
module.exports = function ClassGroup(collection = {}) {
    collection = setOverrides(collection, overrides);
    const classGroup = {};

    function flatten(col, arr) {
        switch (Object.prototype.toString.call(col)) {
            case '[object String]':
                if (col === '') break;

                arr.push(col);
                break;
            case '[object Array]':
            case '[object Object]':
                for (const key in col) {
                    flatten(col[key], arr);
                }
                break;
        }

        return arr;
    }

    for (const key in collection) {
        classGroup[key] = flatten(collection[key], []).join(' ');
    }

    return classGroup;
}
