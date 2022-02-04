export function injectScriptToListenForThreadResponse() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("threadResponse.js");
  (document.head || document.documentElement).appendChild(s);
}

export function addClassToFirstTweetInThread() {
  const selector = 'div[style*="transform: translateY(0px);"]';
  document.querySelector(selector)?.classList.add("first-tweet-in-thread");
  // @ts-ignore
  document.arrive(selector, (node: HTMLElement) => {
    node?.classList?.add("first-tweet-in-thread");
  });
}

export function addClassToLastTweetInThread() {
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

export function addClassToThreadMetricsContainer() {
  const selector1 = 'a[href*="/retweets"]';
  const selector2 = 'a[href*="/likes"]';
  document
    .querySelector(selector1)
    ?.parentElement?.parentElement?.parentElement?.classList?.add(
      "first-tweet-metrics-container"
    );
  // @ts-ignore
  document.arrive(selector1, (node: HTMLElement) => {
    node?.parentElement?.parentElement?.parentElement?.classList?.add(
      "first-tweet-metrics-container"
    );
  });
  document
    .querySelector(selector2)
    ?.parentElement?.parentElement?.parentElement?.classList?.add(
      "first-tweet-metrics-container"
    );
  // @ts-ignore
  document.arrive(selector2, (node: HTMLElement) => {
    node?.parentElement?.parentElement?.parentElement?.classList?.add(
      "first-tweet-metrics-container"
    );
  });
}

export function addClassToSourceLabelsContainer() {
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

export function addClassToTweetRepliesContainer() {
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

export function checkForURLChanges() {
  let oldHref = document.location.href;
  const observer = new MutationObserver(function () {
    if (location.href !== oldHref && location.href.indexOf("photo") <= -1) {
      oldHref = location.href;
      disableThreadReaderMode();
    }
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);
}

export function enableThreadReaderMode() {
  checkForURLChanges();
  window.scrollTo(0, 0);
  document.getElementById("react-root")?.classList.add("thread-reader-mode");
  addClassToFirstTweetInThread();
  addClassToThreadMetricsContainer();
  addClassToSourceLabelsContainer();
  addClassToLastTweetInThread();
  addClassToTweetRepliesContainer();
}

export function checkForAddingReaderButton(parentTweetId = "") {
  if (
    document.querySelector("main h2>span")?.textContent?.toLowerCase() ===
    "thread"
  ) {
    if (
      JSON.parse(
        sessionStorage.getItem(
          `thread-${document.location.pathname.split("/")?.pop()}`
        ) as string
      )
    ) {
      document
        .querySelector(`[data-testid="primaryColumn"] h2`)
        ?.parentElement?.parentElement?.insertAdjacentHTML(
          "beforeend",
          `<button id="open-reader-mode" class="open-reader-mode">View Thread in Reader mode</button>`
        );
    } else {
      document
        .querySelector(`[data-testid="primaryColumn"] h2`)
        ?.parentElement?.parentElement?.insertAdjacentHTML(
          "beforeend",
          `<button id="navigate-to-view-thread" class="open-reader-mode" data-parentTweetId="${parentTweetId}">View Thread in Reader mode</button>`
        );
    }
  }
}

export function disableThreadReaderMode() {
  // @ts-ignore
  document.unbindArrive();
  document.getElementById("open-reader-mode")?.remove();
  document.getElementById("react-root")?.classList.remove("thread-reader-mode");
  checkForAddingReaderButton();
}
