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
  if (event.target && event.target.id === "open-reader-mode") {
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

document.onkeydown = function (evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    disableThreadReaderMode();
  }
};

export default function init() {
  injectScriptToListenForThreadResponse();
  document.addEventListener("DOMContentLoaded", () => {
    checkForThemeChanges();
    document.querySelector("body")?.addEventListener("tweetDetailEvent", () => {
      if (
        document.querySelector("main h2>span")?.textContent?.toLowerCase() ===
        "thread"
      ) {
        checkForAddingReaderButton();
      }
    });
  });
}

void init();
