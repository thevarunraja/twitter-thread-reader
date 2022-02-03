/* eslint-disable*/
(function () {
  var XHR = XMLHttpRequest.prototype;
  var open = XHR.open;
  var send = XHR.send;
  var setRequestHeader = XHR.setRequestHeader;

  XHR.open = function (method, url) {
    this._method = method;
    this._url = url;
    this._requestHeaders = {};
    this._startTime = new Date().toISOString();
    return open.apply(this, arguments);
  };

  XHR.setRequestHeader = function (header, value) {
    this._requestHeaders[header] = value;
    return setRequestHeader.apply(this, arguments);
  };

  XHR.send = function () {
    this.addEventListener("load", function () {
      var myUrl = this._url ? this._url.toLowerCase() : this._url;
      if (myUrl) {
        if (this.responseType !== "blob") {
          try {
            if (this?.responseURL?.indexOf("TweetDetail") > 1) {
              const data = JSON.parse(this.response).data
                .threaded_conversation_with_injections.instructions[0];
              if (data.entries[0].entryId.startsWith("tweet-")) {
                const threadData = [
                  data.entries[0].entryId.split("-")[1],
                  ...data.entries[1].content.items.map(
                    (item) => item.entryId.split("-")[3]
                  ),
                ];
                sessionStorage.setItem(
                  `thread-${data.entries[0].entryId.split("-")[1]}`,
                  JSON.stringify(threadData.filter((id) => id.length > 1))
                );
                const tweetDetailEvent = new CustomEvent("tweetDetailEvent", {
                  bubbles: true,
                  cancelable: true,
                  composed: false,
                });
                document.querySelector("body").dispatchEvent(tweetDetailEvent);
                console.log(
                  JSON.parse(
                    sessionStorage.getItem(
                      `thread-${document.location.pathname.split("/")?.pop()}`
                    )
                  )
                );
              }
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    });
    return send.apply(this, arguments);
  };
})(XMLHttpRequest);
