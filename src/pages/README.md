<h1 style="color: #ffa824">WebJSX</h1>

<div class="flex-1 text-lg max-w-md">
  <p>
    A minimal library for building web applications with 
    <strong>Web Components</strong> and <strong>JSX</strong>.
  </p>
</div>

<div style="margin-top: 2em">
  <p>It focuses on simplicity, and has just <strong>two core functions</strong>:</p>
</div>
<!-- Container for the two blocks -->
<div class="flex flex-col md:flex-row gap-4 mb-8">
  
  <!-- Block 1: createElement -->
  <div class="border border-black rounded p-4 flex bg-customYellow text-black shadow-custom flex-1 max-w-320px">
    <div class="flex-shrink-0 w-30px mr-4 text-4xl text-darkred">
      <strong>1</strong>
    </div>
    <div class="flex-1">
      <strong>createElement</strong>:<br />
      Allows you to use JSX to write HTML markup. Returns Virtual Nodes.
    </div>
  </div>
  
  <!-- Block 2: applyDiff -->
  <div class="border border-black rounded p-4 flex bg-customYellow text-black shadow-custom flex-1 max-w-320px">
    <div class="flex-shrink-0 w-30px mr-4 text-4xl text-darkred">
      <strong>2</strong>
    </div>
    <div class="flex-1">
      <strong>applyDiff</strong>:<br />
      Merges Virtual Nodes created with JSX into the real DOM efficiently.
    </div>
  </div>
  
</div>

<!-- "But Why?" Section -->
<div class="flex flex-col md:flex-row gap-4 items-start bg-customBlue rounded text-black">  
  <!-- Column 1: Image (Hidden on small screens) -->
  <div class="hidden md:block flex-shrink-0 mt-8 ml-8"> <!-- Changed mt-8 to mt-6 -->
    <img src="/img/why.jpg" alt="Image" class="w-120px h-120px rounded-full" />
  </div>
  
  <!-- Column 2: Text -->
  <div class="flex-1 pl-4 pr-8 pb-8 rounded-lg">
    <h2 class="!mt-8 text-2xl font-bold">But Why?</h2>
    <p>
      In the last decade, we used React and React-like frameworks because Web Standards weren't there yet, and some of us wanted to write type-safe components.
      But Web Components are mature now, and if we combine that with JSX/TSX for type-safety we have everything we want, while staying close to Web Standards.
    </p>
    <p>
      So let's <strong>keep JSX and get rid of everything else</strong>.
    </p>    
  </div>  
</div>

## Examples

There are a few examples on [StackBlitz](https://stackblitz.com/@jeswin/collections/webjsx). If you're impatient, that's probably the easiest way to get started.
- [Todo List](https://stackblitz.com/edit/webjsx-todos)
- [Rotten Tomatoes Mockup](https://stackblitz.com/edit/webjsx-tomatoes)
- [Boring Dashboard](https://stackblitz.com/edit/webjsx-dashboard)

## Installation

Install webjsx via npm:

```sh
npm install webjsx
```

## Getting Started

The following is a basic example of how to use webjsx with its two main functions, `createElement` and `applyDiff`.

### Creating Elements with JSX

webjsx fully supports JSX syntax, allowing you to create virtual DOM elements using `createElement` and update the real DOM with `applyDiff`.

```jsx
import * as webjsx from "webjsx";

// Define a simple virtual DOM element using JSX
const vdom = (
  <div id="main-container">
    <h1>Welcome to webjsx</h1>
    <p>This is a simple example.</p>
  </div>
);

// Select the container in the real DOM
const appContainer = document.getElementById("app");

// Apply the virtual DOM diff to update the real DOM
applyDiff(appContainer, vdom);
```

### Defining and Using Web Components with JSX

Let's write a simple Custom Element with JSX.

```jsx
import * as webjsx from "webjsx";

// Define a custom Web Component
class MyElement extends HTMLElement {
  static get observedAttributes() {
    return ["title", "count"];
  }

  constructor() {
    super();
    this._count = 0;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title" || name === "count") {
      this.render();
    }
  }

  set count(val) {
    this._count = val;
    this.render();
  }

  get count() {
    return this._count;
  }

  render() {
    // Use webjsx's applyDiff to render JSX inside the Web Component
    const vdom = (
      <div>
        <h2>{this.getAttribute("title")}</h2>
        <p>Count: {this.count}</p>
      </div>
    );
    applyDiff(this, vdom);
  }
}

// Register the custom element
if (!customElements.get("my-element")) {
  customElements.define("my-element", MyElement);
}

// Create a virtual DOM with the custom Web Component
const vdom = <my-element title="Initial Title" count={10}></my-element>;

// Render the custom Web Component
const appContainer = document.getElementById("app");
applyDiff(appContainer, vdom);
```

### Handling Events in JSX

Attach event listeners directly within your JSX using standard HTML event attributes.

```jsx
import { createElement, applyDiff } from "webjsx";

// Define an event handler
const handleClick = () => {
  alert("Button clicked!");
};

// Create a button with an onclick event
const vdom = <button onclick={handleClick}>Click Me</button>;

// Render the button
const appContainer = document.getElementById("app");
applyDiff(appContainer, vdom);
```

### Using Fragments

Group multiple elements without introducing additional nodes to the DOM using `<>...</>` syntax.

```jsx
import * as webjsx from "webjsx";

// Define a custom Web Component using fragments
class MyList extends HTMLElement {
  connectedCallback() {
    const vdom = (
      <ul>
        <>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </>
      </ul>
    );
    applyDiff(this, vdom);
  }
}

// Register the custom element
if (!customElements.get("my-list")) {
  customElements.define("my-list", MyList);
}

// Render the custom Web Component
const appContainer = document.getElementById("app");
const vdom = <my-list></my-list>;
applyDiff(appContainer, vdom);
```

## API Reference

### `createElement(tag, props, children)`

Creates a virtual DOM element.

**JSX calls createElement implicitly:**

```jsx
const vdom = (
  <div id="main-container">
    <h1>Welcome to webjsx</h1>
  </div>
);
```

**Usage (Non-JSX):**

```js
const vdom = webjsx.createElement(
  "div",
  { id: "main-container" },
  webjsx.createElement("h1", null, "Welcome to webjsx")
);
```

### `applyDiff(parent, newVirtualNode)`

Applies the differences between the new virtual node(s) and the existing DOM.

**Usage:**

```jsx
const vdom = <p class="text">Updated Text</p>;
applyDiff(appContainer, vdom);
```

### `Fragment`

A special type used to group multiple elements without adding extra nodes to the DOM.

**Usage:**

```jsx
<>
  <span>Item 1</span>
  <span>Item 2</span>
</>
```

## Example: Creating a Counter Web Component

```jsx
import { createElement, applyDiff } from "webjsx";

// Define the custom Web Component
class CounterElement extends HTMLElement {
  static get observedAttributes() {
    return ["title", "count"];
  }

  constructor() {
    super();
    this._count = 0;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title" || name === "count") {
      this.render();
    }
  }

  set count(val) {
    this._count = val;
    this.render();
  }

  get count() {
    return this._count;
  }

  render() {
    // Render JSX inside the Web Component
    const vdom = (
      <div>
        <h2>{this.getAttribute("title")}</h2>
        <p>Count: {this.count}</p>
        <button onclick={this.increment.bind(this)}>Increment</button>
      </div>
    );
    applyDiff(this, vdom);
  }

  increment() {
    this.count += 1;
  }
}

// Register the custom element
if (!customElements.get("counter-element")) {
  customElements.define("counter-element", CounterElement);
}

// Create and render the CounterElement
const vdom = <counter-element title="My Counter" count={0}></counter-element>;

const appContainer = document.getElementById("app");
applyDiff(appContainer, vdom);
```

## TypeScript

### tsconfig.json

Ensure your `tsconfig.json` is set up to handle JSX.

```json
{
  "compilerOptions": {
    //...
    "jsx": "react",
    "jsxFactory": "webjsx.createElement",
    "jsxFragmentFactory": "webjsx.Fragment"
  }
}
```

### Adding Custom Elements to IntrinsicElements (TypeScript)

TypeScript will complain that your Custom Element (such as `<counter-element>`) is not found. That's because it is only aware of standard HTML elements and doesn't know what `<counter-element>` is.

To fix this you need to declare custom elements in a declarations file, such as custom-elements.d.ts:

```ts
import "webjsx";

declare module "webjsx" {
  namespace JSX {
    interface IntrinsicElements {
      "counter-element": {
        count: number;
      };
      "sidebar-component": {
        about: string;
        email: string;
      };
    }
  }
}
```

## Bundling

You can bundle with your favorite bundler, but most apps don't need to.

You can load modules directly on the web page these days:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WebJsx Test</title>

    <script type="importmap">
      {
        "imports": {
          "webjsx": "../node_modules/webjsx/dist/index.js"
        }
      }
    </script>
    <!-- This is your entry point -->
    <script type="module" src="../dist/index.js"></script>
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>
```

You can see more examples in the StackBlitz.

## Contributing

Contributions are welcome! Whether it's reporting bugs, suggesting features, or submitting pull requests, your help is appreciated.
Please ensure that your contributions adhere to the project's coding standards and include appropriate tests.

To run the tests:

```sh
npm test
```

## License

webjsx is open-source software [licensed as MIT](LICENSE).

## Support

If you encounter any issues or have questions, feel free to open an issue on [GitHub](https://github.com/webjsx/webjsx/issues) or reach out via Twitter [@jeswin](https://twitter.com/jeswin).
