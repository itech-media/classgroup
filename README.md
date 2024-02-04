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
  container: 'class1 class2',
  btn: ['class3', 'class4'],
});

console.log(classes);

// Results in:
// {
//   container: "class1 class2",
//   btn: "class3 class4",
// }

// In template:
<div class="{classes.container}">
  <button class="{classes.button}">Click!</button>
</div>

```

### Grouping with Objects

The ability to use an object gives the developer the convenience of grouping classes semantically for better readability.

```js
const classes = ClassGroup({
  alert: {
    layout: 'flex p-4',
    appearance: 'rounded-md bg-yellow-50',
    hover: 'hover:bg-yellow-100',
    md: { ... },
    lg: { ... }
  },
  ...
});

console.log(classes);

// Results in:
// {
//   alert: "flex p-4 rounded-md bg-yellow-50 hover:bg-yellow-100 ..."
// }
```

It is advised that each subsequent key represents a breakpoint (e.g. `sm`, `md`, `lg`, `xl`), a state (e.g. `hover`, `focus`, `disabled`), or a semantic group (e.g. `layout`, `appearance`, `transition`, `animation`).

There is no limit on nesting depth and you can mix and match types. Other than the primary root key(s) i.e. the identifier key of `alert`, **all other nested key names are discarded**.

> In any case, you are free to define whatever naming pattern works best for you! Know that
consistent patterns will facilitate **theming** by reducing multiple objects. As per its type
definition, ClassGroup accepts `n` number of parameters of the same type. [Read more below](#the-overrides-parameter).

## Advanced Use

By keeping our data in an object, it opens up quite a few patterns. You can for example use functions and ternary operators, or pre-process and combine multiple objects. As long as they return one of the expected types (object, string, array), it'll work. **Any other types are ignored.**

```js
const classes = ClassGroup({
  btn: {
    border: isRounded ? 'rounded' : '',
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

ClassGroup accepts `n` number of subsequent object parameters internally referenced as `Overrides`, all governed by same type. In runtime, supplied `Overrides` arguments will be effectively reduced, merged and flattened into one single object by replacing the matching successive argument key values. 

> **The `overrides` parameter structure must exactly correspond to that of the initial argument targeted object key structures.**

These subsequent parameters intention is to provide an interface to override key values when recycling styling objects (for instance, in a component library) where default values are already present.

```js
const baseStyles = {
  alert: {
    layout: 'flex p-4',
    appearance: 'rounded-md bg-yellow-50',
  },
};

const styleOverrides = {
  alert: {
    appearance: 'bg-red-50',
  },
};

const classes = ClassGroup(baseStyles, styleOverrides);

console.log(classes);

// Results in:
// {
//   alert: 'flex p-4 bg-red-50',
// }

// Effectively overriding the classes from 'baseStyles.alert.appearance' and leaving 'baseStyles.alert.layout' intact

// Styles can be also be reused and extended
const extendOverrides = {
  alert: {
    animation: 'animate-ping',
  },
};

const classes = ClassGroup(baseStyles, extendOverrides);

console.log(classes);

// Results in:
// {
//   alert: 'flex p-4 rounded-md bg-yellow-50 animate-ping',
// }

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
