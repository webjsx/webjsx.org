import "webjsx";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "experiment-icon": {};
      "blooming-flower": { color?: string };
    }
  }
}
