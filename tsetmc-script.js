//const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
var rmArr = [];
var chArr = [];
var grpArr = [];
var flag = false;
//var maxCount = 1;

$(window).on("load", function () {
  if (window.location.host != "www.tsetmc.com") return;

  $("#header0, #header").append(
    '<div id="clear-del-divs"' +
      ' class="t0head" style="width:25px" tooltip="حذف لیست" ><span style="color:blue; font-weight: bold;"> C </span><div/>'
    // '<div class="quantity-part" style="margin-top: 2px;"><input type="text" id="timeSence" placeholder="8:44:58:500" value="8:44:58:000" maxlength="12" allownegative="false" class="send_order_txtPrice number" dir="ltr" autocomplete="off" tick-size="10" />' +
    //   '<input class="ng-pristine ng-valid ng-not-empty ng-touched" type="checkbox" id="startSenceTime" name="startedSendRequest"></div></div>'
  );

  $("#clear-del-divs").click(() => {
    chrome.storage.local.set({ idd: [] }).then(() => {
      console.log("Value is set to []");

      rmArr.forEach((dv) => {
        $("#" + dv).show();
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

  //setTimeout(function () {
  setInterval(function () {
    //alert("Hi !");

    //if (flag) return;
    chrome.storage.local.get(["idd"]).then((result) => {
      rmArr = result.idd ? result.idd : [];
      //console.log(rmArr);

      let divs = $("#display #main>div");
      //maxCount--;
      divs.each(function (i) {

        let idd = $(this).prop("id");

        var title ="";
        var el = $("#"+idd+" span[title*='حجم مبنا']")[0];
        if(el){
          title = $(el).attr("title");
        }
        
        
        // $($("#14079693677610396 span[title*='حجم مبنا']")[0]).attr("title")
        if(!chArr.some((x) => x.id == idd && x.title == title))
        {
          chArr.push({id:idd, title:title, time: Date.now()});
          chArr = chArr.filter((x) => x.time > (Date.now()-50000));
          //console.log(chArr);
        }
        
        var chCount = chArr.filter((x) => x.id == idd).length;

        grpArr = grpArr.filter((x)=> x.id != idd);

        if (!$(this).hasClass("secSep")) {
          grpArr.push({id: idd, chCount: chCount});
        }

        if (rmArr && rmArr.some((x) => x == idd)) {
          //console.log("iid = " + idd);
          $(this).hide();
        }

        //maxCount = maxCount > chCount ? maxCount : chCount;

        // if (chCount < maxCount && !$(this).hasClass("secSep")) {
        //   $(this).hide();
        // }else{
        //   $(this).show();
        // }

        if ($("#del-btn-div-" + idd).length) return;

        //var countTag = !$(this).hasClass("secSep") ? '<span style="color:blue;"> '+chCount+' </span>' : '';
        var countTag = '';

        $(this).append(
          '<div id="del-btn-div-' +
            idd +
            '" class="t0c" style="width:25px" tooltip="حذف از لیست" ><span style="color:red;"> X </span> '+countTag+' <div/>'
          // '<div class="quantity-part" style="margin-top: 2px;"><input type="text" id="timeSence" placeholder="8:44:58:500" value="8:44:58:000" maxlength="12" allownegative="false" class="send_order_txtPrice number" dir="ltr" autocomplete="off" tick-size="10" />' +
          //   '<input class="ng-pristine ng-valid ng-not-empty ng-touched" type="checkbox" id="startSenceTime" name="startedSendRequest"></div></div>'
        );

        //flag = true;

        $("#del-btn-div-" + idd).click(() => {
          //alert(idd);
          rmArr.push("" + idd);
          chrome.storage.local.set({ idd: rmArr }).then(() => {
            $("#" + idd).hide();
            console.log("Value is set to " + idd);
          });
          //chrome.storage.sync.set({ counter:myCounter });
        });
      });
    });
  }, 500);

  setInterval(function () {

    var max_of_array = Math.max.apply(Math, grpArr.map(a=> a.chCount));
    
    grpArr.forEach((gr, i)=> {
      //console.log(gr);
      if(gr.chCount == max_of_array && (!rmArr || !rmArr.some((x) => x == gr.id)))
        $("#" + gr.id).show();
      else
        $("#" + gr.id).hide();
    })

  }, 5000);

  });
