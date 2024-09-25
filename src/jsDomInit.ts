import * as jsdom from "jsdom";

const dom = new jsdom.JSDOM(
  `<!DOCTYPE html><html lang="en"><body></body></html>`
);
const document = dom.window.document;
globalThis.document = document;
(globalThis as any).window = dom.window;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;

export function jsDomInit() {
  return { dom, document };
}
