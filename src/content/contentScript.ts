import "arrive";

function injectScriptToListenForThreadResponse() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("threadResponse.js");
  (document.head || document.documentElement).appendChild(s);
}

function hideUnnecessaryContent() {
  // @ts-ignore
  document.arrive(
    '[style*="transform: translateY(0px);"]',
    (node: HTMLElement) => {
      node?.classList?.add("parent-thread-tweet");
    }
  );

  // @ts-ignore
  document.arrive('a[href$="/retweets"]', (node: HTMLElement) => {
    node?.parentElement?.parentElement?.parentElement?.classList?.add("remove");
  });

  // @ts-ignore
  document.arrive(
    'a[href$="/how-to-tweet#source-labels"]',
    (node: HTMLElement) => {
      node?.parentElement?.parentElement?.classList?.add("remove");
      node?.parentElement?.parentElement?.parentElement?.classList?.add(
        "source-labels"
      );
    }
  );

  // @ts-ignore
  document.arrive(
    '[aria-label="Timeline: Conversation"] [aria-label="Reply"][data-testid="reply"]',
    (node: HTMLElement) => {
      node?.parentElement?.parentElement?.parentElement?.classList.add(
        "reply-field"
      );
    }
  );

  const lastTweetId = JSON.parse(
    sessionStorage.getItem(
      `thread-${document.location.pathname.split("/")?.pop()}`
    ) as string
  )?.pop();
  // @ts-ignore
  document.arrive(`article a[href*="/${lastTweetId}"]`, (node: HTMLElement) => {
    node
      ?.closest("div>article")
      ?.parentElement?.parentElement?.parentElement?.classList.add(
        "last-tweet"
      );
  });
}

export default function init() {
  injectScriptToListenForThreadResponse();
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("body")?.addEventListener("tweetDetailEvent", () => {
      if (
        document.querySelector("main h2>span")?.textContent?.toLowerCase() ===
        "thread"
      ) {
        // FIXME:
        document
          .getElementById("react-root")
          ?.classList.add("thread-reader-mode");
        hideUnnecessaryContent();
      }
    });
  });
}

void init();
