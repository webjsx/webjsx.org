import * as webjsx from "webjsx";

export class FooterComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const vdom = (
      <div class="footer p-2 mt-24 border-t border-gray-500 text-center">
        <p>
          Copyright: &nbsp;
          <a href="https://twitter.com/jeswin">
            @jeswin
          </a>&nbsp;
           and contributors.
        </p>
        <p class="text-sm font-bold">
          Documentation site built with <a href="https://github.com/webjsx/gabble">Gabble.</a>
        </p>
      </div>
    );

    webjsx.applyDiff(this, vdom);
  }
}

if (!customElements.get("footer-component")) {
  customElements.define("footer-component", FooterComponent);
}
