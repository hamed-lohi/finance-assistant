let color = '#3aa757';
let counter = 1;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color , counter});
  console.log('counter: Default background color set to %cgreen', `color: ${color}`);
  console.log('counter:', `counter: ${counter}`);
});


// function myFunc(){
//   //$(document).ready(function(){
//     $('body').append('<h1>AAAAAAAAAAAAAAA</h1>');
// //});
// }


  // chrome.scripting.executeScript({
  //   function: myFunc
  // });

  // chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  //   if (changeInfo.status == 'complete') {
  
  //     //$(document).ready(function(){
  //       document.getElementsByTagName("body").innerHTML+= '<h1>AAAAAAAAAAAAAAA</h1>';
  //   //});
  
  //   }
  // })


