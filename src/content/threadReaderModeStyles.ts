const styles = `
<style id="thread-reader-mode-styles">
  div,
  span,
  a,
  label {
    font-size: 18px !important;
    line-height: 1.5 !important;
    letter-spacing: 0.8px !important;
  }

  #close-thread-reader-view {
    display: block;
    position: fixed;
    top: 30px;
    left: 30px;
    background: none;
    color: #fff;
    cursor: pointer;
    border: 0;
    cursor: pointer;
    z-index: 1;
  }

  #close-thread-reader-view  svg {
    width: 45px;
    height: 45px;
  }

  header[role="banner"],
  [data-testid="sidebarColumn"] {
    opacity: 0 !important;
    pointer-events: none !important;
  }

  [data-testid="primaryColumn"]>div>div>div:nth-child(1) {
    opacity: 0 !important;
    pointer-events: none !important;
  }

  div[aria-label="Timeline: Conversation"]>div {
    min-height: 100vh !important;
  }

  .first-tweet-in-thread [data-testid="caret"] {
    display: none !important;
  }

  [data-testid="primaryColumn"] {
    border: 0 !important;
  }

  .first-tweet-in-thread>div {
    border: 0 !important;
  }

  .tweet-replies-container {
    height: 10px !important;
  }

  .first-tweet-metrics-container,
  .tweet-replies-container~div {
    display: none !important;
  }

  .tweet-replies-container>div>div {
    opacity: 0 !important;
    pointer-events: none !important;
  }

  .tweet-replies-container>div {
    width: 32px !important;
  }

  .source-labels-container div,
  .source-labels-container+div {
    display: none !important;
  }

  .first-tweet-in-thread [role="progressbar"]+div {
    display: none !important;
  }

  .last-tweet-in-thread~div {
    display: none !important;
  }

  .last-tweet-in-thread>div {
    border-bottom: 0 !important;
  }

  .first-tweet-in-thread+div+div article>div>div>div>div:nth-child(2)>div:nth-child(2)>div:nth-child(2)>div:nth-child(1) {
    display: none !important;
  }

  /* Hide vertical lines */
  article>div>div>div>div:nth-child(2)>div:nth-child(1) {
    display: none !important;
  }

  article>div>div>div>div:nth-child(1) {
    display: none !important;
  }

  .first-tweet-in-thread article>div>div>div>div:nth-child(2)>div:nth-child(1) {
    display: block !important;
  }

  /* Hide user names on child tweets */
  article>div>div>div>div:nth-child(2)>div:nth-child(2)>div:nth-child(1) {
    opacity: 0 !important;
    pointer-events: none !important;
  }

  .first-tweet-in-thread article>div>div>div>div:nth-child(2)>div:nth-child(2)>div:nth-child(1) {
    opacity: 1 !important;
    pointer-events: all !important;
    display: block !important;
  }

  .last-tweet-in-thread+div+div {
    display: block !important;
    opacity: 0 !important;
    height: 600px !important;
    pointer-events: none !important;
  }

  .tweet-replies-container > div {
    border-top: 1px solid #2f3336 !important;
  }
</style>
`;

export default styles;
