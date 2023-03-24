//const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
var rmArr = [];

$(window).on("load", function () {

  if (window.location.host != "www.tsetmc.com") return;


  $("#header0").append(
    '<div id="clear-del-divs"' +
      ' class="t0head" style="width:30px" tooltip="حذف لیست" ><span style="color:blue; font-weight: bold;"> C </span><div/>'
    // '<div class="quantity-part" style="margin-top: 2px;"><input type="text" id="timeSence" placeholder="8:44:58:500" value="8:44:58:000" maxlength="12" allownegative="false" class="send_order_txtPrice number" dir="ltr" autocomplete="off" tick-size="10" />' +
    //   '<input class="ng-pristine ng-valid ng-not-empty ng-touched" type="checkbox" id="startSenceTime" name="startedSendRequest"></div></div>'
  );

  $("#clear-del-divs").click(() => {
    chrome.storage.local.set({ idd: [] }).then(() => {
      console.log("Value is set to []");

      rmArr.forEach((dv) => {
        $("#"+dv).show();
      });

    });
    //chrome.storage.sync.set({ counter:myCounter });
  });

  //   chrome.storage.local.set({ "phasersTo": "awesome" }, function(){
  //     //  Data's been saved boys and girls, go on home
  // });

  // chrome.storage.local.get(/* String or Array */["phasersTo"], function(items){
  //     //  items = [ { "phasersTo": "awesome" } ]
  // });

  // chrome.storage.local.set({ key: value }).then(() => {
  //   console.log("Value is set to " + value);
  // });

  // chrome.storage.local.get(["key"]).then((result) => {
  //   console.log("Value currently is " + result.key);
  // });

  setTimeout(function () {
    //alert("Hi !");

    chrome.storage.local.get(["idd"]).then((result) => {
      rmArr = result.idd ? result.idd : [];
      console.log(rmArr);

      let divs = $("#display #main>div");

      divs.each(function (i) {
        let idd = $(this).prop("id");

        if (rmArr && rmArr.some((x) => x == idd)) {
          //console.log("iid = " + idd);
          $(this).hide();
        }

        $(this).append(
          '<div id="del-btn-div-' +
            idd +
            '" class="t0c" style="width:25px" tooltip="حذف از لیست" ><span style="color:red"> X </span><div/>'
          // '<div class="quantity-part" style="margin-top: 2px;"><input type="text" id="timeSence" placeholder="8:44:58:500" value="8:44:58:000" maxlength="12" allownegative="false" class="send_order_txtPrice number" dir="ltr" autocomplete="off" tick-size="10" />' +
          //   '<input class="ng-pristine ng-valid ng-not-empty ng-touched" type="checkbox" id="startSenceTime" name="startedSendRequest"></div></div>'
        );

        $("#del-btn-div-" + idd).click(() => {
          //alert(idd);
          rmArr.push("" + idd);
          chrome.storage.local.set({ idd: rmArr }).then(() => {
            $("#"+idd).hide();
            console.log("Value is set to " + idd);
          });
          //chrome.storage.sync.set({ counter:myCounter });
        });
      });
    });
  }, 1500);

  setInterval(function () {}, 600);

  // }
});
