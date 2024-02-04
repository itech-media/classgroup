# ClassGroup

ClassGroup is a utility to help keep your CSS classes in JS consistently and [semantically grouped](https://cube.fyi/grouping/) while allowing for a separation of concerns. 

It helps unclutter your markup when using utility-driven CSS principles or frameworks such as [TailwindCSS](https://tailwindcss.com) with negligible performance impact. It improves readability of components, improving [Developer Experience](https://github.blog/2023-06-08-developer-experience-what-is-it-and-why-should-you-care/).

### Installation

```shell
npm i -D classgroup
```

### Usage

To use ClassGroup, import it as you would any other utility: 

```js
import ClassGroup from 'classgroup';
```

If your project uses [CommonJS](https://en.wikipedia.org/wiki/CommonJS), then:

```js
import ClassGroup from 'classgroup/commonjs';
```

We then use this simple function by passing in an object with our groupings. 

```js
const classes = ClassGroup({
  identifier: value,
});
```

The `key` is an identifier and is just for our own reference - think of it like the class names you would give when writing traditional CSS.

The `value` can be a `string`, `array` or `object` with no limit on nesting depth so you can group in anyway you like. 

It will return a flattened object that for convention we store in a variable called `classes`. You can then access the resultant string referencing by [dot notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation)


```html
// Svelte, Vue
<div class="{classes.identifier}">...</div>

// React
render() {
  return <div className={classes.identifier}>...</div>
}
```

ClassGroup is written in Typescript and uses the following types internally:

```ts
// ClassGroup.d.ts

export interface Output {
  [key: string]: string;
}

export type OptionValue = boolean | string | Array<string> | Options;

export interface Options {
  [key: string]: OptionValue;
}

export default function ClassGroup(collection: Options, ...overrides: Options[]): Output;
```


Let's take a look at a few examples so that this makes sense and see how we can apply this.


### Basic Abstraction with Strings or Arrays

```js
const classes = ClassGroup({
  identifier1: 'class1 class2',
  identifier2: ['class3', 'class4'],
});

console.log(classes);

// Results in:
// {
//   identifier1: "class1 class2",
//   identifier2: "class3 class4",
// }
```

### Grouping with Objects

The ability to use an object gives the developer the convenience of grouping classes semantically for better readability.

```js
const classes = ClassGroup({
  identifier: {
    layout: 'class1 class2',
    presentation: 'class3 class4',
  },
  ...
});

console.log(classes);

// Results in:
// {
//   identifier: "class1 class2 class3 class4" 
// }
```

It is advised that each subsequent key represents a breakpoint (e.g. `sm`, `md`, `lg`, `xl`), a state (e.g. `hover`, `focus`, `disabled`), or a semantic group (e.g. `layout`, `presentation`).

```js
const classes = ClassGroup({
  identifier: {
    layout: {
      default: 'class1 class2',
      lg: 'class5 class3',
    },
    presentation: 'class4 class6',
  },
});

console.log(classes);

// Results in:
// {
//   identifier: "class1 class2 class5 class3 class4 class6"
// }
```

> There is no limit on nesting depth and you can mix and match types. Other than the primary root key(s) i.e. `identifier`, **all other nested key names are discarded**.

## Advanced Use

By keeping our data in an object, it opens up quite a few patterns. You can for example use functions and ternary operators, or pre-process and combine multiple objects. As long as they return one of the expected types (object, string, array), it'll work. **Any other types are ignored.**

```js
const classes = ClassGroup({
  btn: {
    variant: isRounded ? 'rounded' : '',
    animation: (() => {
      switch (arg) {
          case 'spin':
            return 'animation-spin';

            ...

          default:
            return 'animation-none';
      }
    })(),
  },
});
```

### The Overrides parameter

ClassGroup accepts `n` number of subsequent parameters internally referenced as an `overrides` array of objects. These have exactly the same type as the first parameter explained above and they will replace the previous parameter key values with matching overrides.

> The `overrides` parameter structure must correspond to that of the initial parameter targeted object key structures.

These subsequent parameters intention is to provide an interface to override key values when recycling styling objects (for instance, in a component library) where default values are already present.

```js
const baseStyles = {
  identifier: {
    layout: 'class1 class2',
    presentation: 'bg-red',
  },
};

const styleOverrides = {
  identifier: {
    presentation: 'bg-blue',
  },
};

const classes = ClassGroup(baseStyles, styleOverrides);

console.log(classes);

// Results in:
// {
//   identifier: 'class1 class2 bg-blue',
// }

// Effectively overriding the classes from 'baseStyles.identifier.presentation' and leaving 'baseStyles.identifier.layout' intact
```
---
## VS Code Tailwind CSS IntelliSense
In order to make the *Tailwind CSS IntelliSense* plugin work, make sure to use the `tailwindCSS.experimental.classRegex` setting with the following regex:
```json
{
  ...
  "tailwindCSS.experimental.classRegex":[
    ["ClassGroup\(([^;])", "'([^'])'"]
  ],
  ...
}
```
