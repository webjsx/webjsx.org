import { Bloom, component, BloomComponent } from "bloom-router";
import * as webjsx from "webjsx";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "hn-header": {};
      "story-list": {};
      "user-link": { username?: string };
    }
  }
}

type Story = {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  descendants?: number;
  kids?: number[];
};

type CommentData = {
  id: number;
  by: string;
  text: string;
  kids?: number[];
};

type UserData = {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
};

async function fetchItem<T>(id: number): Promise<T> {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
    (r) => r.json()
  );
}

component(
  "user-link",
  async function* (
    component: HTMLElement & BloomComponent & { username: string }
  ) {
    return (
      <a href="#" onclick={() => {}}>
        {component.username}
      </a>
    );
  },
  { username: "" }
);

component(
  "hn-header",
  async function* (component: HTMLElement & BloomComponent) {
    while (true) {
      yield (
        <div class="hn-header">
          <div class="hn-header-content">
            <a href="#" class="hn-logo">
              Y
            </a>
            <a href="#" class="hn-header-text">
              <b>Hacker News</b>
            </a>
            <a href="#" class="hn-header-link">
              new
            </a>
            <span class="hn-header-separator">|</span>
            <a href="#" class="hn-header-link">
              past
            </a>
            <span class="hn-header-separator">|</span>
            <a href="#" class="hn-header-link">
              comments
            </a>
            <span class="hn-header-separator">|</span>
            <a href="#" class="hn-header-link">
              ask
            </a>
            <span class="hn-header-separator">|</span>
            <a href="#" class="hn-header-link">
              show
            </a>
            <span class="hn-header-separator">|</span>
            <a href="#" class="hn-header-link">
              jobs
            </a>
            <span class="hn-header-separator">|</span>
            <a href="#" class="hn-header-link">
              submit
            </a>
          </div>
        </div>
      );
    }
  }
);

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
