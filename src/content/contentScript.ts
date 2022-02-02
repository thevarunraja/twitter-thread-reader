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
    console.log("In first");
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
    console.log("In fourth");
    disableThreadReaderMode();
  }
});

export default function init() {
  injectScriptToListenForThreadResponse();
  document.addEventListener("DOMContentLoaded", () => {
    checkForThemeChanges();
    document.querySelector("body")?.addEventListener("tweetDetailEvent", () => {
      console.log("tweetDetailEvent");
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
