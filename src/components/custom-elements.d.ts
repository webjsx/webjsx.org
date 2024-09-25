import "webjsx";

declare module "webjsx" {
  namespace JSX {
    interface IntrinsicElements {
      "top-bar": {};
      "footer-component": {};
      "markdown-renderer": {
        contentValue?: string;
      };
    }
  }
}
