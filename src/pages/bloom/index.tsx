import { jsDomInit } from "../../jsDomInit.js";
import fs from "fs";
import path from "path";
import * as webjsx from "webjsx";
import "../../components/MarkdownRenderer.js";
import bloomLayout from "./bloomLayout.js";
import "./components/experiment-icon.js";

export default function html() {
  // Initialize JSDOM
  const { dom, document } = jsDomInit();

  // Read README.md file (only handle file loading here)
  const markdownPath = path.resolve("./dist/pages/bloom/intro.md");
  const markdownContent = fs.readFileSync(markdownPath, "utf-8");

  // Create the virtual DOM using JSX and the registered custom elements
  const vdom = (
    <div>
      <div>
        <div style="display: flex; align-items: center;">          
          <h1>Introducing Bloom.</h1><experiment-icon />
        </div>
        <p>
          Bloom is an experimental approach to managing front-end state using
          Web Components and Asynchronous Generators.
        </p>
        <markdown-renderer contentValue={markdownContent}></markdown-renderer>
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
