let hamburgerOpen = false;

window.addEventListener("load", () => {
  // Hamburger
  const hamburgerIcon = document.querySelector("#hamburger-icon");
  hamburgerIcon?.addEventListener("click", () => {
    hamburgerOpen = !hamburgerOpen;
    showHideHamburger();
  });

  const closeHamburgerButton = document.querySelector("#close-hamburger-menu");
  closeHamburgerButton?.addEventListener("click", () => {
    hamburgerOpen = false;
    showHideHamburger();
  });
});

function showHideHamburger() {
  (document.querySelector("#hamburger-menu") as HTMLElement).classList.add(
    hamburgerOpen ? "block" : "hidden"
  );
  (document.querySelector("#hamburger-menu") as HTMLElement).classList.remove(
    hamburgerOpen ? "hidden" : "block"
  );
}
