# ClassGroup

ClassGroup is a utility/[grouping mechanism](https://cube.fyi/grouping/) to keep your CSS classses in JS consistently and semantically grouped. It helps uncluttering your markup when using utility-driven CSS principles.

It's foundation is a very simple yet powerful recursive algorithm in form of a function that only accepts a single `Object` as a parameter, internally named _collection_.

```
ClassGroup(collection={})
```

### @param {Object} collection
A collection is an `Object` where the root keys are references to DOM Elements where the intended group of classes will be applied. Think of these as the classes you would create when writing normal CSS. 

Each one of these references represent a `className` and can accept as a value either an `Object`, an `Array`, a `String`, or a Javascript expression that evaluates to any of the values previously mentioned. When returned, all values will be concatenated to strings.

If the value of a root key is an `Object` then all subsequent key values will be treated as part of the same group of classes for the represented `className`.
In other words, the input object will be flattened to a single dimension object and only the root keys will prevail.

The ability to use an `Object` gives the author the convenience of grouping classes semantically for better readability.
When using an `Object`, it is advised that each subsequent key represents a breakpoint (`sm`, `md`, `lg`, `xl`), a state(`hover`, `focus`, `disabled`, etc.), or a semantic group (layout, presentation, etc.).

By using a single collection, `ClassGroup` encourages developers to call this function sparingly, perhaps even once per component.

### @returns {Object}
The returned `Object` will prevail the same shape as the _collection_ parameter, flattened to one level in depth and with all its values concatenated to strings.

### Usage
```
// CLI
npm i -D classgroup

or

yarn add -D classgroup

// JS
import ClassGroup from 'classgroup';

const classes = ClassGroup({...});
```

### Examples

* A simple `container` element `className` representation that needs no grouping.
```
const classes = ClassGroup({
  container: 'container p-2 w-full',
  ...
});

// Svelte
<div class={classes.container}>...</div>

// React
render() {
  return <div className={classes.container}>...</div>
}
```

* Same `container` element with grouped media query utilities
```
const classes = ClassGroup({
  container: {
    default: 'container p-2 w-full',
    md: 'md:p-4',
    lg: 'lg:mx-auto lg:w-1/2',
  },
  ...
});

// Svelte
<div class={classes.container}>...</div>

// React
render() {
  return <div className={classes.container}>...</div>
}
```

* Same `container` element with `layout` and `presentation` groups
```
const classes = ClassGroup({
  container: {
    layout: {
      default: 'container p-2 w-full',
      md: 'md:p-4',
      lg: 'lg:mx-auto lg:w-1/2',
    },
    presentation: 'rounded bg-gray-50 text-gray-700',
  },
  ...
});

// Svelte
<div class={classes.container}>...</div>

// React
render() {
  return <div className={classes.container}>...</div>
}
```

* Same `container` element with `presentation` subgroups, where `variant` is using a ternary and `animation` is using an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
```
const classes = ClassGroup({
  container: {
    layout: {
      default: 'container p-2 w-full',
      md: 'md:p-4',
      lg: 'lg:mx-auto lg:w-1/2',
    },
    presentation: {
      default: 'bg-gray-50 text-gray-700',
      interaction: 'hover:bg-gray-100',
      variant: condition ? 'rounded' : '',
      animation: (() => {
        switch (arg) {
            case 'spin':
              return 'animation-spin';

            case 'ping':
              return 'animation-ping';

            case 'pulse':
              return 'animation-pulse';

            case 'bounce':
              return 'animation-bounce';

            default:
              return 'animation-none';
        }
      })(),
    }
  },
  ...
});

// Svelte
<div class={classes.container}>...</div>

// React
render() {
  return <div className={classes.container}>...</div>
}
```

In all previous examples, the `container` props will be flattened down to the root key and all its values will be concatenated to a single string. Effectively making available all of those classes semantically grouped in `classes.container`.

---

## VS Code Tailwind CSS IntelliSense
In order to make the *Tailwind CSS IntelliSense* plugin work, make sure to use the `tailwindCSS.experimental.classRegex` setting with the following regex:
```
{
  ...
  "tailwindCSS.experimental.classRegex":[
    ["ClassGroup\(([^;])", "'([^'])'"]
  ],
  ...
}
```
