const ClassGroup = require('../index.js').default;

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
        }
    });

    expect(classGroup).toStrictEqual({
        container: 'sm-layout sm-presentation',
    });
});

test('mixture of types with nesting', () => {
    const classGroup = ClassGroup({
        container: {
            sm: {
                layout: ['sm-layout', {
                    front: 'sm-layout-front',
                    back: 'sm-layout-back',
                }],
                presentation: {
                    all: ['sm-presentation-front', 'sm-presentation-back'],
                },
                interaction: 'sm-interaction',
            }
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
    })

    expect(classGroup).toStrictEqual({
        boolean: '',
        nan: '',
        number: '',
        undefined: '',
    });
});