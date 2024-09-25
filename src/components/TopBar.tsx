import * as webjsx from "webjsx";

export class TopBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const vdom = (
      <div class="topbar p-2 w-full bg-gray-800 flex justify-between items-center">
        <div class="flex items-center">
          <svg
            id="hamburger-icon"
            class="cursor-pointer md:hidden"
            height="24px"
            width="24px"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
          <img
            src="/img/logo-128.png"
            alt="webjsx"
            class="hidden md:block w-8 h-8 rounded-lg"
          />
          <h1 class="ml-2 w-32 font-bold text-base">
            <a href="/">WebJSX</a>
          </h1>
        </div>

        <ul class="hidden md:flex items-center text-sm">
          {" "}
          {/* Hidden on mobile */}
          <li class="mx-2">
            <a href="https://stackblitz.com/@jeswin/collections/webjsx">StackBlitz</a>
          </li>
          <li class="m-2">
            <a href="https://github.com/webjsx/webjsx/issues">Issues</a>
          </li>
          <li class="mx-2">
            <a href="https://github.com/webjsx/webjsx">GitHub</a>
          </li>
        </ul>

        {/* Mobile dropdown menu */}
        <div
          id="hamburger-menu"
          class="hidden py-4 bg-gray-800 absolute right-0 top-0 w-full md:hidden"
        >
          <div
            id="close-hamburger-menu"
            class="pr-4 cursor-pointer flex justify-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              width="24px"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </div>
          <ul class="text-xs pl-4">
            <li class="m-2">
              <a href="https://stackblitz.com/@jeswin/collections/webjsx">StackBlitz</a>
            </li>
            <li class="m-2">
              <a href="https://github.com/webjsx/webjsx/issues">Issues</a>
            </li>
            <li class="m-2">
              <a href="https://github.com/webjsx/webjsx">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    );

    webjsx.applyDiff(this, vdom);
  }

  setupEventListeners() {
    const hamburgerIcon = this.querySelector("#hamburger-icon");
    const hamburgerMenu = this.querySelector("#hamburger-menu");
    const closeIcon = this.querySelector("#close-hamburger-menu");

    if (hamburgerIcon && hamburgerMenu && closeIcon) {
      hamburgerIcon.addEventListener("click", () => {
        hamburgerMenu.classList.toggle("hidden");
      });
      closeIcon.addEventListener("click", () => {
        hamburgerMenu.classList.add("hidden");
      });
    }
  }
}

if (!customElements.get("top-bar")) {
  customElements.define("top-bar", TopBar);
}
