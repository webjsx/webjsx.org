import { jsDomInit } from "../../jsDomInit.js";
import { Bloom } from "bloom-router";
import * as webjsx from "webjsx";

function bloomLayout(contents: string) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="/styles.css" />
  <link rel="stylesheet" type="text/css" href="/highlight.css" />
  <link rel="shortcut icon" type="image/png" href="/img/icon.png"/>
  <script type="importmap">
    {
      "imports": {
        "webjsx": "/latest/webjsx/dist/index.js",
        "webjsx/jsx-runtime": "/latest/webjsx/dist/jsx-runtime.js",
        "bloom-router": "/latest/bloom-router/dist/index.js"
      }
    }
  </script>
  <script src="/components/bloom/blooming-flower.js" type="module"></script>
  <title>Bloom: An experimental UI framework</title>
</head>

<body class="bg-gray-900 text-gray-300">
  <div id="root">
    ${contents}
  </div>
</body>

</html>
`;
}

export default function html() {
  // Initialize JSDOM
  const { dom, document } = jsDomInit();

  // This is where we write content.
  const vdom = (
    <div class="max-w-4xl mx-auto my-10 space-y-10">
      <h1 class="text-3xl font-bold text-center text-white">
        Introducing Bloom
      </h1>

      <div class="max-w-4xl mx-auto my-10 space-y-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-xl font-semibold text-gray-200">
              It exists, you can touch it.
            </h3>
            <p class="mt-4 text-gray-400">
              In Bloom, "touchable" means every element you create exists
              directly in the DOM. For example:
            </p>
            <pre class="bg-gray-800 text-gray-400 p-4 rounded">
              &lt;blooming-flower color="red" /&gt;
            </pre>
            <p class="mt-4 text-gray-400">
              Inspect this in dev tools, and you’ll see the element as it is—
              complete with its attributes, ready to be modified. Unlike in
              React, where:
            </p>
            <pre class="bg-gray-800 text-gray-400 p-4 rounded">
              &lt;BloomingFlower color="red" /&gt;
            </pre>
            <p class="mt-4 text-gray-400">
              This becomes an abstract container, detached from the real DOM.
              Bloom’s approach ensures full transparency and alignment with web
              standards.
            </p>
          </div>
          <blooming-flower color="red" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <blooming-flower></blooming-flower>
          <div>
            <h3 class="text-xl font-semibold text-gray-200">
              Why Does This Matter?
            </h3>
            <p class="mt-4 text-gray-400">
              Debugging becomes intuitive—no need for special tools. What you
              write is what exists, making your code transparent, accessible,
              and true to the principles of the web. This touchability reflects
              Bloom’s philosophy: code should not just work but truly exist.
            </p>
          </div>
        </div>
      </div>

      <div class="max-w-4xl mx-auto my-10 space-y-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-xl font-semibold text-gray-200">
              The Dream We Once Chased
            </h3>
            <p class="mt-4 text-gray-400">
              When React, Vue, and Solid entered the scene, they promised us
              simplicity. A single source of truth, a declarative way to define
              our views, and the power of components to bring structure to our
              chaos. They were our North Star—a way to tame the unruliness of
              the web.
            </p>
            <p class="mt-4 text-gray-400">
              Yet, as these tools grew, simplicity became an illusion. Bundlers,
              compilers, state management libraries, and more complicated build
              pipelines became the norm. The promise of the simple broke under
              the weight of complexity.
            </p>
          </div>
          <div class="p-6 bg-gray-800 text-gray-400 rounded">
            <h4 class="text-lg font-semibold text-gray-200">React Example</h4>
            <pre class="bg-gray-900 text-gray-400 p-4 rounded">
              {`import React, { useState } from 'react';

          export default function Counter() {
            const [count, setCount] = useState(0);

            return (
              <button onClick={() => setCount(count + 1)}>
                Clicked {count} times
              </button>
            );
            `}
            </pre>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="p-6 bg-gray-800 text-gray-400 rounded">
            <h4 class="text-lg font-semibold text-gray-200">Bloom Example</h4>
            <pre class="bg-gray-900 text-gray-400 p-4 rounded">
              {`          
                let count = 0;
                function increment() {
                  count++;
                  document.querySelector('#counter').innerText = count;
                }
              
                <button onclick="increment()">
                  Clicked <span id="counter">0</span> times
                </button>
             `}
            </pre>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-200">
              Simplicity Reclaimed
            </h3>
            <p class="mt-4 text-gray-400">
              Bloom restores the elegance of native JavaScript. It eliminates
              the layers of abstraction that bog us down, returning us to the
              roots of the web. Components in Bloom are built on standards you
              already know. They’re touchable, inspectable, and lightweight.
            </p>
            <p class="mt-4 text-gray-400">
              No compilers. No magic. Just code that works as it reads.
              Simplicity is not a dream—it’s reality, waiting for you to embrace
              it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the virtual DOM into the real DOM
  webjsx.applyDiff(document.body, vdom);

  // Serialize the final HTML
  const finalHtml = dom.serialize();

  return {
    html: bloomLayout(finalHtml),
  };
}
