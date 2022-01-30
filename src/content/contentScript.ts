function injectScriptToListenForThreadResponse() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("threadResponse.js");
  (document.head || document.documentElement).appendChild(s);
}

export default function init() {
  injectScriptToListenForThreadResponse();
}

void init();
