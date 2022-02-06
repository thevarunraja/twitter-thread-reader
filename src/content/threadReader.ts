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
  // @ts-ignore
  document.urlChangeObserver = new MutationObserver(function () {
    if (location.href !== oldHref && location.href.indexOf("photo") <= -1) {
      oldHref = location.href;
      disableThreadReaderMode();
    }
  });
  const config = { subtree: true, childList: true };
  // @ts-ignore
  document.urlChangeObserver.observe(document, config);
}

export function enableThreadReaderMode() {
  checkForURLChanges();
  addCloseButton();
  window.scrollTo(0, 0);
  document.getElementById("react-root")?.classList.add("thread-reader-mode");
  addClassToFirstTweetInThread();
  addClassToThreadMetricsContainer();
  addClassToSourceLabelsContainer();
  addClassToLastTweetInThread();
  addClassToTweetRepliesContainer();
}

export function addCloseButton() {
  document?.getElementById("react-root")?.insertAdjacentHTML(
    "afterbegin",
    `<button id="close-thread-reader-view"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg></button>`
  );
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
  // @ts-ignore
  document.urlChangeObserver.disconnect();
  document.getElementById("open-reader-mode")?.remove();
  document.getElementById("close-thread-reader-view")?.remove();
  document.getElementById("react-root")?.classList.remove("thread-reader-mode");
  checkForAddingReaderButton();
}

export function addListenersToDOM() {
  document.addEventListener("click", function (event) {
    // @ts-ignore
    if (event.target && event.target?.id === "open-reader-mode") {
      enableThreadReaderMode();
    } // @ts-ignore
    else if (event.target && event.target?.id === "navigate-to-view-thread") {
      window.scroll(0, 0);
      // @ts-ignore
      window.location.href = `${
        document.location.href.split("/status/")[0]
      }/status/${
        // @ts-ignore
        event.target.dataset.parenttweetid
      }?threadReaderMode=true`;
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

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      disableThreadReaderMode();
    }
  };
}

export function getQueryParams() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    // @ts-ignore
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params;
}
