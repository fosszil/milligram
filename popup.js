chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "GET_SHORTS_COUNT" }, function (response) {
      if (chrome.runtime.lastError) {
        document.getElementById("counter").textContent = "Could not fetch the count.";
        return;
      }
      const count = (response && response.count) || 0;
      document.getElementById("counter").textContent = `Shorts watched: ${count}`;
    });
  }
);
