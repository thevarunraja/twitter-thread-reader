import "arrive";
import checkForThemeChanges from "./checkForThemeChanges";
import {
  addListenersToDOM,
  checkForAddingReaderButton,
  checkForURLChanges,
  enableThreadReaderMode,
  getQueryParams,
  injectScriptToListenForThreadResponse,
} from "./threadReader";

export default function init() {
  injectScriptToListenForThreadResponse();
  addListenersToDOM();
  document.addEventListener("DOMContentLoaded", () => {
    checkForThemeChanges();
    checkForURLChanges();
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
