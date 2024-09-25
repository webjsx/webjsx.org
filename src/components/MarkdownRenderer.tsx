import { Marked } from "marked";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";

export class MarkdownRenderer extends HTMLElement {
  // Define the content property
  content: string = "";

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  // Override setAttribute to handle 'content' specifically
  set contentValue(value: string) {
    this.content = value;
    this.render(); // Re-render when the content is updated
  }

  get contentValue() {
    return this.content;
  }

  render() {
    if (this.content) {
      // Set up marked with highlight.js for syntax highlighting
      const marked = new Marked(
        markedHighlight({
          langPrefix: "hljs language-", // Add highlight.js class prefix
          highlight: (code, lang) => {
            const validLanguage = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language: validLanguage }).value;
          },
        })
      );
      // Parse the markdown content to HTML
      const htmlContent = marked.parse(this.content) as string;

      // Render the HTML inside the custom element
      this.innerHTML = htmlContent;
    }
  }
}

// Register the custom element
customElements.define("markdown-renderer", MarkdownRenderer);
