import { component } from "bloom-router";

component("blooming-flower", async function* () {
  while (true) {
    yield <div>🌸</div>;
  }
});
