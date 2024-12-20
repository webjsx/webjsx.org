import "webjsx";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "top-bar": {};
      "footer-component": {};
      "markdown-renderer": {
        contentValue?: string;
      };
      "blooming-flower": { color?: string };
    }
  }
}
