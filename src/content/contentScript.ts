import "arrive";

function injectScriptToListenForThreadResponse() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("threadResponse.js");
  (document.head || document.documentElement).appendChild(s);
}

function addClassToFirstTweetInThread() {
  const selector = 'div[style*="transform: translateY(0px);"]';
  document.querySelector(selector)?.classList.add("first-tweet-in-thread");
  // @ts-ignore
  document.arrive(selector, (node: HTMLElement) => {
    node?.classList?.add("first-tweet-in-thread");
  });
}

function addClassToLastTweetInThread() {
  const lastTweetId = JSON.parse(
    sessionStorage.getItem(
      `thread-${document.location.pathname.split("/")?.pop()}`
    ) as string
  )?.pop();
  const selector = `article a[href*="/${lastTweetId}"]`;
  document
    .querySelector(selector)
    ?.closest("div>article")
    ?.parentElement?.parentElement?.parentElement?.classList.add(
      "last-tweet-in-thread"
    );
  // @ts-ignore
  document.arrive(selector, (node: HTMLElement) => {
    node
      ?.closest("div>article")
      ?.parentElement?.parentElement?.parentElement?.classList.add(
        "last-tweet-in-thread"
      );
  });
}

function addClassToThreadMetricsContainer() {
  const selector = 'a[href*="/retweets"]';
  document
    .querySelector(selector)
    ?.parentElement?.parentElement?.parentElement?.classList?.add(
      "first-tweet-metrics-container"
    );
  // @ts-ignore
  document.arrive(selector, (node: HTMLElement) => {
    node?.parentElement?.parentElement?.parentElement?.classList?.add(
      "first-tweet-metrics-container"
    );
  });
}

function addClassToSourceLabelsContainer() {
  const selector = 'a[href$="/how-to-tweet#source-labels"]';
  document
    .querySelector(selector)
    ?.parentElement?.parentElement?.parentElement?.classList?.add(
      "source-labels-container"
    );
  //@ts-ignore
  document.arrive(selector, (node: HTMLElement) => {
    node?.parentElement?.parentElement?.parentElement?.classList?.add(
      "source-labels-container"
    );
  });
}

function addClassToTweetRepliesContainer() {
  try {
    const selector =
      '[aria-label="Timeline: Conversation"] [data-testid="reply"]';
    [...document.querySelectorAll(selector)]?.forEach((node) =>
      node?.parentElement?.parentElement?.parentElement?.classList?.add(
        "tweet-replies-container"
      )
    );
    // @ts-ignore
    document.arrive(selector, (node: HTMLElement) => {
      node?.parentElement?.parentElement?.parentElement?.classList.add(
        "tweet-replies-container"
      );
    });
  } catch (error) {
    // Handle errors
  }
}

function hideUnnecessaryContent() {
  addClassToFirstTweetInThread();
  addClassToThreadMetricsContainer();
  addClassToSourceLabelsContainer();
  addClassToLastTweetInThread();
  addClassToTweetRepliesContainer();
}

function enableThreadReaderMode() {
  window.scrollTo(0, 0);
  document.getElementById("react-root")?.classList.add("thread-reader-mode");
  hideUnnecessaryContent();
}

function disableThreadReaderMode() {
  window.scrollTo(0, 0);
  document.getElementById("react-root")?.classList.remove("thread-reader-mode");
}

document.addEventListener("click", function (event) {
  // @ts-ignore
  if (document.getElementById("open-reader-mode")?.contains(event.target)) {
    enableThreadReaderMode();
  } else if (
    document
      .querySelector('[aria-label="Timeline: Conversation"]')
      // @ts-ignore
      ?.contains(event.target)
  ) {
    //
  } else if (
    document
      .querySelector('[aria-labelledby="modal-header"]')
      // @ts-ignore
      ?.contains(event.target)
  ) {
    //
  } else {
    disableThreadReaderMode();
  }
});

export default function init() {
  injectScriptToListenForThreadResponse();
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("body")?.addEventListener("tweetDetailEvent", () => {
      if (
        document.querySelector("main h2>span")?.textContent?.toLowerCase() ===
        "thread"
      ) {
        document
          .querySelector(`[data-testid="primaryColumn"] h2`)
          ?.parentElement?.parentElement?.insertAdjacentHTML(
            "beforeend",
            `<button id="open-reader-mode">View Thread in Reader mode</button>`
          );
      }
    });
  });
}

void init();
