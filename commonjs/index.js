module.exports = function ClassGroup(collection = {}) {
    const classGroup = {};

    function flatten(col, arr) {
        switch (Object.prototype.toString.call(col)) {
            case '[object String]': 
                arr.push(col);
                break;            
            case '[object Array]': 
            case '[object Object]': 
                for (const key in col) {
                    flatten(col[key], arr);
                }
                break;            
            default:
                console.warn('ClassGroup: Unsupported type used, ignored.');
        }

        return arr;
    }

    for (const key in collection) {
        classGroup[key] = flatten(collection[key], []).join(' ');
    }

    return classGroup;
}
