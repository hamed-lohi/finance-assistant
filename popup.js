// Initialize button with users' preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

$(document).ready(function(){

  // alert("hi my deair");
  let hm ="Hi";
  let myCounter;

  chrome.storage.sync.get("counter", ({ counter }) => {
    myCounter = counter;
    $('#myDiv').html("Salam " + hm + " " + myCounter);

    myCounter ++;
  chrome.storage.sync.set({ counter:myCounter });
  });
  
  
});
