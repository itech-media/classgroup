# ClassGroup

ClassGroup is a utility to help keep your CSS classses in JS consistently and  [semantically grouped](https://cube.fyi/grouping/) while allowing for a separation of concerns. 

It helps unclutter your markup when using utility-driven CSS principles or frameworks such as [TailwindCSS](https://tailwindcss.com) with negligible performance impact. It improves readability of components, improving developer experience.

ClassGroup is the joint effort of [Angel Meraz](https://www.linkedin.com/in/angelmeraz/) and [Andrew Spode](http://linkedin.com/in/spode) at [iTech Media](http://itech.media).

### Installation

```
npm i -D classgroup

or

yarn add -D classgroup
```

### Usage

To use ClassGroup, import it as you would any other utility. 

```
import ClassGroup from 'classgroup';
```

We then use this simple function by passing in an object with our groupings. 

```
const classes = ClassGroup({
  identifier: value,
});
```

The `key` is an identifier and is just for our own reference - think of it like the class names you would give when writing traditional CSS.

The `value` can be a `string`, `array` or `object` with no limit on nesting depth so you can group in anyway you like. 

It will return a flattened object that for convention we store in a variable called _classes_. You can then access the resultant string referencing by key as you would any normal object. 


```
// Svelte
<div class="{classes.identifier}">...</div>

// React
render() {
  return <div className={classes.identifier}>...</div>
}
```

Let's take a look at a few examples so that this makes sense and see how we can apply this.


### Basic Abstraction with Strings or Arrays

This gives us a basic separation of concern and nothing more. This wouldn't really be taking advantage of what ClassGroup facilitates.

```
const classes = ClassGroup({
  identifier: 'class1 class2',
});

const classes = ClassGroup({
  identifier: ['class1', 'class2'],
});

// Both result in:
{
  identifier: 'class1 class2',
}
```

### Grouping with Objects

The ability to use an object gives the developer the convenience of grouping classes semantically for better readability.

```
const classes = ClassGroup({
  identifier: {
    layout: 'class1 class2',
    presentation: 'class3 class4',
  },
});

// Results in:
{
  identifier: 'class1 class2 class3 class4',
}
```

It is advised that each subsequent key represents a breakpoint (e.g. `sm`, `md`, `lg`, `xl`), a state (e.g. `hover`, `focus`, `disabled`), or a semantic group (e.g. `layout`, `presentation`).

```
const classes = ClassGroup({
  identifier: {
    layout: {
      default: 'class1 class2',
      lg: 'class5 class1',
    },
    presentation: 'class4 class6',
  },
});

// Results in:
{
  identifier: 'class1 class2 class5 class1 class4 class6',
}
```

There is no limit on nesting depth and you can mix and match types. Other than the initial root key (identifier), all other key names are discarded.

## Advanced Use

By keeping our data in an object, it opens up quite a few patterns. You can for example use functions and ternary operators, or pre-process and combine multiple objects. As long as they return one of the expected types (object, string, array), it'll work. **Any other types are ignored.**

```
const classes = ClassGroup({
  identifier: {
    variant: condition ? 'rounded' : '',
    animation: (() => {
      switch (arg) {
          case 'spin':
            return 'animation-spin';
          default:
            return 'animation-none';
      }
    })(),
  },
});
```

### The Overrides parameter

ClassGroup accepts a second parameter referenced as an `overrides` object. It will replace the first parameter key values with matching overrides. The `overrides` parameter structure must correspond to that of the first parameter targetted key structures.

This second parameter intention is to provide an interface to override key values in a component library where default values are already present.

```
const classes = ClassGroup(
  {
    identifier: {
      layout: 'class1 class2',
      presentation: 'class3 class4',
    },
  },
  {
    identifier: {
      presentation: 'class5',
    },
  }
);

// Results in:
{
  identifier: 'class1 class2 class5',
}
```
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
