export default function init() {
  injectScriptToListenForThreadResponse();
}

function injectScriptToListenForThreadResponse() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("inject.js");
  (document.head || document.documentElement).appendChild(s);
}

void init();
