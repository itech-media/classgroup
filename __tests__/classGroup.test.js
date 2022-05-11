const ClassGroup = require('../esm/entry.js').default;

test('string', () => {
    const classGroup = ClassGroup({
        container: 'sm-layout sm-presentation',
    });

    expect(classGroup).toStrictEqual({
        container: 'sm-layout sm-presentation',
    });
});

test('array of strings', () => {
    const classGroup = ClassGroup({
        container: ['sm-layout', 'sm-presentation'],
    });

    expect(classGroup).toStrictEqual({
        container: 'sm-layout sm-presentation',
    });
});

test('object with strings', () => {
    const classGroup = ClassGroup({
        container: {
            layout: 'sm-layout',
            presentation: 'sm-presentation',
        },
    });

    expect(classGroup).toStrictEqual({
        container: 'sm-layout sm-presentation',
    });
});

test('object with booleans', () => {
    const classGroup = ClassGroup({
        container: {
            layout: true && 'sm-layout',
            presentation: false && 'sm-presentation',
        },
    });

    expect(classGroup).toStrictEqual({
        container: 'sm-layout',
    });
});

test('mixture of types with nesting', () => {
    const classGroup = ClassGroup({
        container: {
            sm: {
                layout: [
                    'sm-layout',
                    {
                        front: 'sm-layout-front',
                        back: 'sm-layout-back',
                    },
                ],
                presentation: {
                    all: ['sm-presentation-front', 'sm-presentation-back'],
                },
                interaction: 'sm-interaction',
            },
        },
    });

    expect(classGroup).toStrictEqual({
        container: 'sm-layout sm-layout-front sm-layout-back sm-presentation-front sm-presentation-back sm-interaction',
    });
});

test('ignore unsupported types', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    const classGroup = ClassGroup({
        boolean: true,
        nan: NaN,
        number: 69,
        undefined: undefined,
    });

    expect(classGroup).toStrictEqual({
        boolean: '',
        nan: '',
        number: '',
        undefined: '',
    });
});

test('overrides results', () => {
    const collection = {
        container: {
            sm: {
                layout: [
                    'sm-layout',
                    {
                        front: 'sm-layout-front',
                        back: 'sm-layout-back',
                    },
                ],
                presentation: {
                    all: ['sm-presentation-front', 'sm-presentation-back'],
                },
                interaction: 'sm-interaction',
            },
        },
        string: 'string-styles',
        array: ['array', 'styles'],
    };

    const overrides = {
        container: {
            sm: {
                presentation: 'sm-presentation-override',
                interaction: '',
                newAddition: 'additional-class-from-new-key',
            },
        },
        string: {
            layout: 'layout-class',
            presentation: 'sm-presentation-override',
        },
        array: 'array-class',
    };

    const classGroup = ClassGroup(collection, overrides);

    expect(classGroup).toStrictEqual({
        container: 'sm-layout sm-layout-front sm-layout-back sm-presentation-override additional-class-from-new-key',
        string: 'layout-class sm-presentation-override',
        array: 'array-class',
    });
});

test('multiple overrides', () => {
    const collection = {
        container: {
            sm: {
                layout: [
                    'sm-layout',
                    {
                        front: 'sm-layout-front',
                        back: 'sm-layout-back',
                    },
                ],
                presentation: {
                    all: ['sm-presentation-front', 'sm-presentation-back'],
                },
                interaction: 'sm-interaction',
            },
        },
        string: 'string-styles',
        array: ['array', 'styles'],
    };

    const overrides1 = {
        container: {
            sm: {
                presentation: 'sm-presentation-override1',
                newAddition: 'additional-class-from-new-key1',
            },
        },
    };

    const overrides2 = {
        container: {
            sm: {
                presentation: 'sm-presentation-override2',
                newAddition: 'additional-class-from-new-key2',
            },
        },
    };

    const overrides3 = {
        container: {
            sm: {
                presentation: 'sm-presentation-override3',
            },
        },
    };

    const classGroup = ClassGroup(collection, overrides1, overrides2, overrides3);

    expect(classGroup).toStrictEqual({
        container: 'sm-layout sm-layout-front sm-layout-back sm-presentation-override3 sm-interaction additional-class-from-new-key2',
        string: "string-styles",
        array: 'array styles',
    });
});
