# ClassGroup

ClassGroup is a utility to keep your CSS classses in JS consistently and semantically grouped. It helps uncluttering your markup when using utility-driven CSS principles.

It's foundation is a very simple recursive algorithm in form of a function that only accepts a single `Object` as a parameter, internally named _collection_.

```
ClassGroup(collection={})
```

### @param {Object} collection
A collection is an `Object` where the primary keys are references to DOM Elements where the intended group of classes will be applied, think of these as the classes you would create when writing normal CSS. 

Each one of these references represent a `className` and can accept as a value either an `Object`, an `Array`, a `String`, or a Javascript expression that evaluates to any of the values previously mentioned. When returned, all values will be concatenated to strings.

If the value of a primary key is an `Object` then all subsequent key values will be treated as part of the same group of classes for the represented `className`.
In other words, the input object will be flattened to a single dimension object and only the primary keys will prevail.

The ability to use an `Object` gives the author the convenience of grouping classes semantically for better readability.
When using an `Object`, it is advised that each subsequent key represents a breakpoint (`sm`, `md`, `lg`, `xl`), a state(`hover`, `focus`, `disabled`, etc.), or a semantic group (layout, presentation, etc.).

By using a single collection, `ClassGroup` encourages developers to call this function sparingly, perhaps even once per component.

### @returns {Object}
The returned `Object` will prevail the same shape as the _collection_ parameter, flattened to one level in depth and with all its values concatenated to strings.

### Example using Svelte & Tailwind
```
// ---------------------------------------------
// *.svelte
// ---------------------------------------------

<script>
import ClassGroup from 'classGroup';

const classes = ClassGroup({
  container: {
    sm: {
      layout: ['p-4'],
      presentation: ['bg-gray-500']
    },
    md: ['md:bg-red-500', 'md:p-6'],
    lg: ['lg:bg-yellow-500', 'lg:p-8'],
    xl: ['xl:bg-green-500', 'xl:p-10'],
    xxl: ['xxl:bg-blue-500', 'xxl:p-12'],
    focus: (() => {
        // some logic
        return 'focus:outline-none'
    })(),
    hover: true ? 'hover:bg-gray-700' : '',
    isActive: 'isActive isActive--fireworks',
  },
  heading: ['text-xl', 'mb-4'],
  paragraph: 'text-base text-black',
  //...
});
</script>

<div class={classes.container}>
  ...
</div>

// ---------------------------------------------
// HTML output
// ---------------------------------------------

<div class="bg-gray-500 p-4 md:bg-red-500 md:p-6 lg:bg-yellow-500 lg:p-8 xl:bg-green-500 xl:p-10 xxl:bg-blue-500 xxl:p-12 focus:outline-none hover:bg-red-700 isActive isActive--fireworks ">
  ...
</div>
```

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