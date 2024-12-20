### Make elements actually exist

Modern frameworks like React, Vue, etc simplify the way we build web applications by introducing components as core building blocks. However, they are abstractions, tools to describe what should appear on the screen and they dissolve into standard DOM elements. In contrast, web components are tangible entities in the DOM. These custom elements live and breathe in the browser; they are a fundamental part of the web platform, universally recognized by all modern browsers.

<div class="row-container">
    <div class="col fixed">
        <blooming-flower 
            img1="/pages/bloom/images/f1.jpg" 
            img2="/pages/bloom/images/f2.jpg" 
            img3="/pages/bloom/images/f3.jpg" 
            img4="/pages/bloom/images/f4.jpg">
        </blooming-flower>
    </div>
    <div class="col flexible">
        <div class="neuton-light">
            <p class="slogan">You can touch them in Dev Tools.<br /> With a mouse, but still.</p>
            <p><a href="#">View Source</a></p>
        </div>
    </div>
</div>

<hr />

### Components are generators

View is a function of data - this idea has underpinned modern frameworks. But somewhere along the way, simplicity gave way to layers of abstraction. Managing state in many tools often involves intricate patterns: a state variable here, an effect hook there, and a reducer at times. What really are hooks?

Generators have been around in JavaScript for ages. Well, even before they actually arrived, the hugely impactful [regenerator](https://github.com/facebook/regenerator) project made it available across browsers. They are functions that can keep generating values. Which means that they're ideal for components which want to emit markup (values) based on state or external inputs.

Let's look at the obligatory click-counter.

```ts
import { component } from "bloom-router";

component("click-counter", async function* (component) {
  let count = 0;

  while (true) {
    yield (
      <div>
        <p>Count: {count}</p>
        <button
          onclick={() => {
            count++;
            component.render();
          }}
        >
          Increment
        </button>
      </div>
    );
  }
});
```

As the counter changes, the component yields new markup.

### The little things that matter

Do you remember that time when you tried to paste some html into a React component and it would give you errors? Oh, it's className not class. The style property is an object, not a string. Attributes aren't attributes. In fact, there is no such thing.

<floating-codebox code="&lt;Sidebar className={}..."></floating-codebox>
<floating-codebox code="&lt;TodoList style={{ top: 20 }}"></floating-codebox>


Bloom and other Web Component frameworks try to stay close to the standards. You can copy html and paste it into a component. It would mostly just work.

Bloom is trying to be the most minimal pattern for building real-world Web Components. And in that sense it's an ongoing experiment looking for ideas and feedback.

The little details matter that bring the standards closer to your code. **class** not className. **style** is a string, not an object with weird capitalization.

why does this matter? It allows you to copy and paste HTML directly.

You are setting properties on the component component.x = 10, not props magical dust

### Try Bloom

Bloom [on GitHub](https://github.com/webjsx/bloom-router)
