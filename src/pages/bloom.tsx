import { Bloom } from "bloom-router";

import { jsDomInit } from "../jsDomInit.js";
import fs from "fs";
import path from "path";
import * as webjsx from "webjsx";
import "../components/TopBar.js";
import "../components/Footer.js";
import "../components/MarkdownRenderer.js";

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

  // Create the virtual DOM using JSX and the registered custom elements
  const vdom = (
    <div class="max-w-4xl mx-auto my-10 space-y-10">
      <h1 class="text-3xl font-bold text-center text-white">
        Exploring the Essence of Life
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src="/img/section1.jpg"
          alt="Abstract concept of life"
          class="w-full rounded shadow-lg"
        />
        <div>
          <h2 class="text-2xl font-semibold text-gray-200">The Beginning</h2>
          <p class="mt-4 text-gray-400">
            Life is a journey that begins with a single spark, a moment of
            creation. This journey is filled with infinite possibilities, where
            every choice shapes the world around us.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-2xl font-semibold text-gray-200">
            The Blooming Flower
          </h2>
          <p class="mt-4 text-gray-400">
            A blooming flower reminds us of the fragile beauty of existence.
            Each petal unfurls like moments in our lives, delicate yet enduring.
          </p>
        </div>
        <div>
          <blooming-flower></blooming-flower>
        </div>
      </div>

      <h1 class="text-3xl font-bold text-center text-white">Life's Rhythms</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src="/img/section2.jpg"
          alt="The rhythm of life"
          class="w-full rounded shadow-lg"
        />
        <div>
          <h2 class="text-2xl font-semibold text-gray-200">The Pulse</h2>
          <p class="mt-4 text-gray-400">
            Life beats to a rhythm, an unending cadence that connects us all. It
            flows through nature, relationships, and the countless interactions
            we experience daily.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-2xl font-semibold text-gray-200">
            Interconnectedness
          </h2>
          <p class="mt-4 text-gray-400">
            No life exists in isolation. Everything is part of a grand tapestry,
            interwoven and interdependent. A flower blooms because of the sun,
            the rain, and the soil.
          </p>
        </div>
        <img
          src="/img/section3.jpg"
          alt="Interconnection of life"
          class="w-full rounded shadow-lg"
        />
      </div>

      <h1 class="text-3xl font-bold text-center text-white">
        Reflecting on Existence
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <blooming-flower></blooming-flower>
        <div>
          <h2 class="text-2xl font-semibold text-gray-200">
            Growth and Change
          </h2>
          <p class="mt-4 text-gray-400">
            Change is the essence of life. We grow, adapt, and evolve with each
            passing day. Like the seasons, our lives shift, bringing new
            challenges and opportunities.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-2xl font-semibold text-gray-200">
            Endings and Beginnings
          </h2>
          <p class="mt-4 text-gray-400">
            Each ending in life is but a new beginning. Like the cycle of day
            and night, life moves forward in a perpetual dance of renewal.
          </p>
        </div>
        <img
          src="/img/section4.jpg"
          alt="New beginnings"
          class="w-full rounded shadow-lg"
        />
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
