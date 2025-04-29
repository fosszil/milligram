console.log("The shorts counter is running");

let shortsCount = 0;
let shortsWatched = new Set();
let timer =0;

const isShorts = (url) => url.includes("/shorts");

const countShorts = () => {
  let currentUrl = window.location.href;

  if (isShorts(currentUrl) && !shortsWatched.has(currentUrl)) {
    shortsWatched.add(currentUrl); 
    shortsCount++;
    console.log("New short watched", currentUrl);
    console.log("Total shorts watched:", shortsCount);
  }
};

countShorts();

window.addEventListener('popstate', countShorts);  // Detect history navigation changes
window.addEventListener('hashchange', countShorts); // Detect changes in the URL fragment

// Polling the URL periodically to detect changes
let previousUrl = window.location.href;
setInterval(() => {
  let currentUrl = window.location.href;
  if (currentUrl !== previousUrl) {
    previousUrl = currentUrl;
    countShorts();
  }
  
}, 1000); 

setInterval(() => {
  timer++;
  console.log(timer);
}, 1000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SHORTS_COUNT") {
    sendResponse({ count: shortsCount });
  }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_TIMER") {
    sendResponse({ timer: timer });
  }
});
