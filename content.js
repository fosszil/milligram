console.log("The shorts counter is running");

let shortsCount = 0;
let shortsWatched = new Set();
let timer =0;

const isShorts = (url) => url.includes("/shorts");

const overlay = document.createElement('div');
Object.assign(overlay.style, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  zIndex: 999999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '2rem',
  pointerEvents: 'none'
});
overlay.textContent = 'Reel Counter active';
document.body.appendChild(overlay);
setTimeout(() => {
  overlay.remove();
}, 1000);


const countShorts = () => {
  let currentUrl = window.location.href;

  if (isShorts(currentUrl) && !shortsWatched.has(currentUrl)) {
    shortsWatched.add(currentUrl); 
    shortsCount++;
    overlay.textContent = `Total shorts watched: ${shortsCount}`;
    document.body.appendChild(overlay);
    setTimeout(()=>{
      overlay.remove();
    },1000);
    console.log("New short watched", currentUrl);
    console.log("Total shorts watched:", shortsCount);
  }
};

countShorts();

window.addEventListener('popstate', countShorts);  // Detect history navigation changes
window.addEventListener('hashchange', countShorts); // Detect changes in the URL hash

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
  else if (message.type === "GET_TIMER") {
    sendResponse({ timer: timer });
  }

  return true;
});

