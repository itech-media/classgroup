const ClassGroup = require('../index.js').default;

test('returns flattened input with expected values', () => {

    const groupingPattern = {
        sm: {
            layout: 'sm-layout',
            presentation: 'sm-presentation',
            interaction: 'sm-interaction',
        },
        md: ['md-layout', 'md-presentation'],
        lg: (() => 'lg-layout' )(),
        xl: true ? 'xl-presentation' : '',
    };

    const classGroup = ClassGroup({
        container: groupingPattern,
        header: groupingPattern,
        footer: groupingPattern,
        image: groupingPattern,
        paragraph: groupingPattern,
        button: groupingPattern,
    });

    expect(classGroup).toStrictEqual({
        container: 'sm-layout sm-presentation sm-interaction md-layout md-presentation lg-layout xl-presentation',
        header: 'sm-layout sm-presentation sm-interaction md-layout md-presentation lg-layout xl-presentation',
        footer: 'sm-layout sm-presentation sm-interaction md-layout md-presentation lg-layout xl-presentation',
        image: 'sm-layout sm-presentation sm-interaction md-layout md-presentation lg-layout xl-presentation',
        paragraph: 'sm-layout sm-presentation sm-interaction md-layout md-presentation lg-layout xl-presentation',
        button: 'sm-layout sm-presentation sm-interaction md-layout md-presentation lg-layout xl-presentation',
    });
});
