import "arrive";
import checkForThemeChanges from "./checkForThemeChanges";
import {
  checkForAddingReaderButton,
  disableThreadReaderMode,
  enableThreadReaderMode,
  injectScriptToListenForThreadResponse,
} from "./threadReader";

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

export function getQueryParams() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    // @ts-ignore
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params;
}

export default function init() {
  injectScriptToListenForThreadResponse();

  document.addEventListener("DOMContentLoaded", () => {
    checkForThemeChanges();

    document
      .querySelector("body")
      ?.addEventListener("tweetDetailEvent", (data) => {
        // @ts-ignore
        if (getQueryParams()?.threadReaderMode === "true") {
          checkForAddingReaderButton();
          enableThreadReaderMode();
        } else {
          // @ts-ignore
          checkForAddingReaderButton(data?.detail?.shouldNavigateToViewTweet);
        }
      });
  });
}

void init();
