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

Ever tried copying HTML into a React component? The frustration of seeing errors because 'class' became 'className', or because style attributes need to be JavaScript objects instead of simple strings? These small departures from web standards create friction in our daily work.

By staying close to web standards, Bloom lets you work with HTML as it was meant to be. When you write class="header", it stays exactly that. Style attributes remain straightforward strings. This means you can copy HTML from any source - documentation, design tools, even existing websites - and paste it directly into your components. There's less to learn, less to transform, and less to maintain.

### Let's build the Hacker News Home Page

<story-list></story-list>

And here's the source code:

```ts
component(
  "story-list",
  async function* (component: HTMLElement & BloomComponent) {
    let stories: Story[] | null = null;

    const fetchTopStories = async (limit = 30): Promise<Story[]> => {
      const topIds = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      ).then((res) => res.json());
      const sliced = topIds.slice(0, limit);
      const stories = await Promise.all(
        sliced.map((id: number) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (r) => r.json()
          )
        )
      );
      return stories as Story[];
    };

    stories = await fetchTopStories();

    while (true) {
      if (!stories) {
        yield <div>Loading top stories...</div>;
      } else {
        yield (
          <div>
            <hn-header />
            <div class="story-list">
              {stories.slice(0, 10).map((story: Story, index: number) => (
                <div class="story-list-item">
                  <span class="rank">{index + 1}.</span>
                  <div style="display: inline-block">
                    <div class="vote-arrow" title="upvote"></div>
                  </div>
                  <span>
                    <a class="title-link" href="#" onclick={() => {}}>
                      {story.title}
                    </a>
                    {story.url && (
                      <span class="meta">
                        {" "}
                        <a
                          href={story.url}
                          class="host"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ({new URL(story.url).hostname.replace("www.", "")})
                        </a>
                      </span>
                    )}
                  </span>
                  <div class="meta">
                    {story.score} points by <user-link username={story.by} />{" "}
                    <a href="#" onclick={() => {}}>
                      {story.descendants || 0} comments
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  }
);
```

### Try Bloom

Bloom is Open Source and shared [on GitHub](https://github.com/webjsx/bloom-router). You can also fiddle with examples [on StackBlitz](https://stackblitz.com/edit/bloom-hn).
