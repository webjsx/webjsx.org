import { jsDomInit } from "../jsDomInit.js";
import fs from "fs";
import path from "path";
import basicLayout from "../layout/basic.js";
import * as webjsx from "webjsx";
import "../components/TopBar.js";
import "../components/Footer.js";
import "../components/MarkdownRenderer.js";

export default function html() {
  // Initialize JSDOM
  const { dom, document } = jsDomInit();

  // Read README.md file (only handle file loading here)
  const markdownPath = path.resolve("./dist/pages/README.md");
  const markdownContent = fs.readFileSync(markdownPath, "utf-8");

  // Create the virtual DOM using JSX and the registered custom elements
  const vdom = (
    <div>
      <top-bar></top-bar>
      <div class="md:max-w-screen-md lg:max-w-screen-lg px-4 pt-4 m-auto page-content">
        <markdown-renderer contentValue={markdownContent}></markdown-renderer>
      </div>
      <footer-component></footer-component>
    </div>
  );

  // Render the virtual DOM into the real DOM
  webjsx.applyDiff(document.body, vdom);

  // Serialize the final HTML
  const finalHtml = dom.serialize();

  return {
    html: basicLayout(finalHtml),
  };
}
