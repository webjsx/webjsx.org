import { BloomComponent, component } from "bloom-router";

type BloomingFlower = BloomComponent &
  HTMLElement & {
    img1: string;
    img2: string;
    img3: string;
  };

component(
  "blooming-flower",
  async function* (component: BloomingFlower) {
    let currentIndex = 0;

    const getImageForIndex = (index: number): string => {
      switch (index) {
        case 0:
          return component.img1;
        case 1:
          return component.img2;
        case 2:
          return component.img3;
        default:
          return component.img1;
      }
    };

    const updateImage = (event: Event) => {
      const slider = event.target as HTMLInputElement;
      currentIndex = parseInt(slider.value) - 1;
      component.render();
    };

    while (true) {
      yield (
        <div
          class="slider-container"
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;"
        >
          <div
            class="image-container"
            style="display: flex; justify-content: center; margin: 20px 0; width: 100%;"
          >
            <img
              src={getImageForIndex(currentIndex)}
              alt={`Image ${currentIndex + 1}`}
              style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
            />
          </div>

          <div
            class="slider-controls"
            style="width: 80%; display: flex; justify-content: center;"
          >
            <input
              type="range"
              min="1"
              max="3"
              value={currentIndex + 1}
              step="1"
              onInput={updateImage}
              style="width: 100%;"
            />
          </div>

          <div class="image-counter" style="margin-top: 10px;">
            Image {currentIndex + 1} of 3
          </div>
        </div>
      );
    }
  },
  {
    img1: "",
    img2: "",
    img3: "",
  }
);
