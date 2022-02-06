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
              if (
                data.entries[0].entryId.startsWith(
                  `tweet-${window.location.href.split("?")[0].split("/").pop()}`
                )
              ) {
                try {
                  const threadData = [
                    data.entries[0].entryId.split("-")[1],
                    ...data.entries[1].content.items.map(
                      (item) => item.entryId.split("-")[3]
                    ),
                  ];
                  if (
                    data.entries[1].content.items[
                      data.entries[1].content.items.length - 1
                    ].entryId.indexOf("showmore") <= -1
                  ) {
                    sessionStorage.setItem(
                      `thread-${data.entries[0].entryId.split("-")[1]}`,
                      JSON.stringify(threadData.filter((id) => id.length > 1))
                    );
                    const tweetDetailEvent = new CustomEvent(
                      "tweetDetailEvent",
                      {
                        bubbles: true,
                        cancelable: true,
                        composed: false,
                      }
                    );
                    document
                      .querySelector("body")
                      .dispatchEvent(tweetDetailEvent);
                  }
                } catch (error) {}
              } else {
                const tweetDetailEvent = new CustomEvent("tweetDetailEvent", {
                  bubbles: true,
                  cancelable: true,
                  composed: false,
                  detail: {
                    shouldNavigateToViewTweet:
                      data.entries[1].content.itemContent.tweet_results.result
                        .legacy.conversation_id_str,
                  },
                });
                document.querySelector("body").dispatchEvent(tweetDetailEvent);
              }
            }
          } catch (err) {}
        }
      }
    });
    return send.apply(this, arguments);
  };
})(XMLHttpRequest);
