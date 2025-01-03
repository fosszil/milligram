// content.js
let lastReelCount = 0;
let lastProcessedReel = null;

// Observer to detect new reels being loaded
const observer = new MutationObserver(() => {
  const reels = document.querySelectorAll('article[role="presentation"]');
  if (reels.length > lastReelCount) {
    const newReel = reels[reels.length - 1];
    if (newReel !== lastProcessedReel) {
      processNewReel(newReel);
      lastProcessedReel = newReel;
      lastReelCount = reels.length;
    }
  }
});

function processNewReel(reelElement) {
  const username = reelElement.querySelector('a.x1i10hfl')?.getAttribute('href')?.replace('/', '') || 'unknown';
  const timestamp = new Date().toISOString();
  
  // Get current date as key for storage
  const today = new Date().toISOString().split('T')[0];
  
  // Store the reel information
  chrome.storage.local.get([today], (result) => {
    const dailyData = result[today] || { count: 0, reels: [] };
    dailyData.count += 1;
    dailyData.reels.push({
      username,
      timestamp
    });
    
    chrome.storage.local.set({ [today]: dailyData });
  });
}

// Start observing when on reels page
if (window.location.pathname.includes('/reels')) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
