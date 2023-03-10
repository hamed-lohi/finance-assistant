// Checking page title
//if (document.title.indexOf("Google") == -1) {
//Creating Elements
//var btn = document.createElement("BUTTON");
// var btn = $("<BUTTON id='dddd'>");
// var t = document.createTextNode("CLICK MEee");

// //btn.appendChild(t);
// btn.append(t);
// btn.append($("#d02").html());

// $("#rainbow_global_0").click(function(){
//   alert("dddd");
//   $("#ClientTypeContent").prepend($("#dddd").html());
// })

//Appending to DOM
//document.body.appendChild(btn);
//$("body").append(btn);
//}

// function myFunc(){

var btnBuy = "";
var btnSell = "";
var pBtnSell;
var flagw = true;
var flaguw = true;

var startIntervalId;
var senceIntervalId;

// var counter=0;

var additionalHtml =
  '<div class="quantity-part" style="text-align: right;">' +
  '<input type="text" id="hajm" placeholder="حداقل صف"  maxlength="16" dir="ltr" autocomplete="off" style="max-width: 120px; margin-right: 4px;" />' +
  '<input type="text" id="minPrice" placeholder="حداقل قیمت"  maxlength="16" dir="ltr" autocomplete="off" style="max-width: 120px; margin-right: 4px;" />' +
  '<input type="number" id="msecond" placeholder="میلی ثانیه" maxlength="6" dir="ltr" style="max-width: 100px; margin-right: 4px;" />' +
  '<input type="text" id="timeSence" placeholder="8:44:58:500" maxlength="12" dir="ltr" style="max-width: 120px; margin-right: 4px;" tick-size="10" />' +
  '<input class="ng-pristine ng-valid ng-not-empty ng-touched" type="checkbox" id="startSenceTime" style="max-width: 100px; margin-right: 4px;">' +
  "</div>";

const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

$(window).on("load", function () {
  // Code here

  //setTimeout( loadExtension, 1000);
  //loadExtension();

  //addElements();

  // setTimeout(
  //   function(){

  //   }
  //   , 1500)

  // chrome.storage.sync.get("counter", ({ counter }) => {
  //   $('#msecond').val("Salam  " + counter);

  // //   myCounter ++;
  // // chrome.storage.sync.set({ counter:myCounter });
  // });

  setInterval(function () {
    let hajmMinElement = $("#hajm");
    let priceMinElement = $("#minPrice");

    if (!hajmMinElement.length) {
      addElementsAndBindEvents();
      return;
    }

    let hajmMin = Number(hajmMinElement.val().replace(/,/g, ""));
    let priceMin = Number(priceMinElement.val().replace(/,/g, ""));

    let minHajmForBuy;
    let hajm;
    let pricem;

    if (
      window.location.host == "bsbourse.exirbroker.com" ||
      window.location.host == "tadbir.exirbroker.com" ||
      window.location.host == "tadbir.exirbroker.ir"
    ) {
      if (!$(".buy.mat-raised-button.mat-buy").length) {
        // sell
        hajm = Number(
          $(".main-table tbody tr:eq(2)  td:eq(1) .highlightClass")
            .text()
            .replace(/,/g, "")
        );
      } else {
        // buy
        hajm = Number(
          $(".main-table tbody tr:eq(2)  td:eq(4) .highlightClass")
            .text()
            .replace(/,/g, "")
        );
      }
    } else if (
      window.location.host == "nahayatnegar.com" ||
      window.location.host == "www.nahayatnegar.com"
    ) {
      if ($(".small-8.columns.tab.ng-binding.ng-scope.active").length) {
        // sell
        hajm = Number(
          $(
            ".table.price-table .table-row:eq(0) .table-cell.buy.ng-binding:eq(1)"
          )
            .text()
            .replace(/,/g, "")
            .trim()
        );
        pricem = Number(
          $(
            ".table.price-table .table-row:eq(0) .table-cell.buy.ng-binding:eq(2)"
          )
            .text()
            .replace(/,/g, "")
            .trim()
        );
        btnBuy = btnSell = ".tiny.button.bbc-nassim.submit.ng-binding.ignore";
      } else {
        // buy
        hajm = Number(
          $(
            ".table.price-table .table-row:eq(0) .table-cell.sell.ng-binding:eq(1)"
          )
            .text()
            .replace(/,/g, "")
            .trim()
        );

        btnBuy = btnSell = ".tiny.button.bbc-nassim.submit.ng-binding.success";
      }
    } else if (window.location.host == "mobile.hafezbroker.ir") {
      if ($(".open.side-86")) {
        // sell

        var hm1 = $("#stockqueue_0_BestBuyLimitPrice span.qu").text();
        hajm = Number(hm1.replace(/,/g, "").trim());
        var pr1 = $("#stockqueue_0_BestBuyLimitPrice span.pr")[0].innerText;
        if (pr1) {
          pricem = Number(pr1.replace(/,/g, "").trim());
        }
      } else if ($(".open.side-65")) {
        // buy
        var hm2 = $("#stockqueue_0_BestSellLimitPrice span.qu").text();
        hajm = Number(hm2.replace(/,/g, "").trim());
      }

      btnBuy = btnSell = ".footer .send";

      // counter++;
      // window.document.title = counter;
    } else {
      if ($(".orderside65.ordertabs").hasClass("active")) {
        // sell
        hajm = Number(
          $("#stockqueue_0_BestSellLimitQuantity .txt").text().replace(/,/g, "")
        );
        minHajmForBuy = Number(
          $("#stockqueue_0_BestBuyLimitQuantity .txt").text().replace(/,/g, "")
        );
      } else {
        //  buy
        hajm = Number(
          $("#stockqueue_0_BestBuyLimitQuantity .txt").text().replace(/,/g, "")
        );
      }
    }

    if (!pBtnSell) {
      pBtnSell = $(btnSell).parent();
    }

    if (minHajmForBuy && minHajmForBuy < 500000) {
      if (flagw){
        $(btnSell).fadeOut(50).parent().append('<div id="send_order_btnSendOrder_fake" style="opacity:0.5;" class="tp-w-100 tp-center tp-3d-bu-gr">خرید</div>'); //.show(200);//.hide();
        flagw = false;
        flaguw = true;
      }
    } else {
      
      if (flaguw){
        $("#send_order_btnSendOrder_fake").remove(); //.html($(btnSell).clone( true )).show(200);//.show();
        $(btnSell).fadeIn(100);
        flagw = true;
        flaguw = false;
      }
    }

    if (
      (hajmMin && hajm && hajm < hajmMin) ||
      (priceMin && pricem && pricem < priceMin)
    ) {
      //console.log(hajm +" - "+ hajmMin);
      $(btnSell)[0].click();
      //document.getElementById("send_order_btnSendOrder").click();

      hajmMinElement.val("");
      priceMinElement.val("");
    }

    /*$('.guide-sys.ng-binding.ng-scope').click(); $("[href='#/watch/technical']").click();*/
  }, 600);

  // }
});

// $(document).ready(function () {

// });

function addElementsAndBindEvents() {
  if (window.location.host == "online.agah.com") {
    $(".switch-part").before(additionalHtml);
    btnBuy = ".btn.Buy .new-request.ng-scope";
    btnSell = ".btn.Buy .new-request.ng-scope";
  } else if (
    window.location.host == "bsbourse.exirbroker.com" ||
    window.location.host == "tadbir.exirbroker.com" ||
    window.location.host == "tadbir.exirbroker.ir"
  ) {
    $("#online-order .component-body").append(
      additionalHtml
      // '<div class="quantity-part" style="height: 35px; text-align: right;"><input type="text" id="msecond" placeholder="میلی ثانیه" maxlength="12" allownegative="false" class="send_order_txtPrice number" dir="ltr" autocomplete="off" tick-size="10" />' +
      // '<div class="quantity-part" style="margin-top: 2px;"><input type="text" id="timeSence" placeholder="8:44:58:500" value="8:44:58:000" maxlength="12" allownegative="false" class="send_order_txtPrice number" dir="ltr" autocomplete="off" tick-size="10" />' +
      //   '<input class="ng-pristine ng-valid ng-not-empty ng-touched" type="checkbox" id="startSenceTime" name="startedSendRequest"></div></div>'
    );

    $("#sellTabTitle").click(() => {
      btnBuy = btnSell = ".sell.mat-raised-button.mat-sell";
    });
    $("#buyTabTitle").click(() => {
      btnBuy = btnSell = ".buy.mat-raised-button.mat-buy";
    });

    btnBuy = btnSell = ".buy.mat-raised-button.mat-buy";
    //btnBuy = ".buy.mat-raised-button.mat-buy";
    //btnSell = ".sell.mat-raised-button.mat-sell";
  } else if (window.location.host == "farabixo.com") {
    $("#za-217").prepend(additionalHtml);
    btnBuy =
      ".x-btn.x-unselectable.x-box-item.x-rtl.x-btn-default-medium.rep-buy-btn1-color";
    btnSell =
      ".x-btn.x-unselectable.x-box-item.x-rtl.x-btn-default-medium.rep-buy-btn1-color";
  } else if (window.location.host == "d.easytrader.emofid.com") {
    $(".d-flex.justify-content-end.align-items-center").before(additionalHtml);
    btnBuy = ".col-7.btn.btn-sm.flex-grow-1.px-0.btn-success";
    btnSell = ".col-7.btn.btn-sm.flex-grow-1.px-0.btn-danger";
  } else if (
    window.location.host == "nahayatnegar.com" ||
    window.location.host == "www.nahayatnegar.com"
  ) {
    // btnBuy = ".tiny.button.bbc-nassim.submit.ng-binding.success";
    // btnSell = ".tiny.button.bbc-nassim.submit.ng-binding.ignore";
    $(".form-body").append(additionalHtml);

    // $(".collapse.row.tabs .small-8.columns.tab.ng-binding:eq(2)").click(()=>{btnBuy = btnSell = ".tiny.button.bbc-nassim.submit.ng-binding.ignore"});
    // $(".collapse.row.tabs .small-8.columns.tab.ng-binding:eq(1)").click(()=>{btnBuy = btnSell = ".tiny.button.bbc-nassim.submit.ng-binding.success"});

    //btnBuy = btnSell = ".tiny.button.bbc-nassim.submit.ng-binding.success";
  } else if (window.location.host == "mobile.hafezbroker.ir") {
    $("#sendorder-container .inputs").append(additionalHtml);

    $("#sendorder-container .keys>div").css({
      margin: "2px",
      "font-size": "16px",
      height: "40px",
      "line-height": "40px",
    });
    $("#sendorder-container .border").css({
      margin: "2px",
      "font-size": "14px",
      height: "38px",
      padding: "2px 3px 0",
    });

    // $(".collapse.row.tabs .small-8.columns.tab.ng-binding:eq(2)").click(()=>{btnBuy = btnSell = ".tiny.button.bbc-nassim.submit.ng-binding.ignore"});
    // $(".collapse.row.tabs .small-8.columns.tab.ng-binding:eq(1)").click(()=>{btnBuy = btnSell = ".tiny.button.bbc-nassim.submit.ng-binding.success"});

    //btnBuy = btnSell = ".tiny.button.bbc-nassim.submit.ng-binding.success";
  } else {
    $("div.main").append(
      additionalHtml
      // '<div class="tp-ma-r-5 pricecontainer "><div><div class="tp-h-30"></div><div class="send_order_txtPriceContainer tp-te-bo invalid-value" style="width: 90px; padding-left: 0"><input type="text" id="hajm" placeholder="حداقل صف"  maxlength="12" allownegative="false" class="send_order_txtPrice number" dir="ltr" autocomplete="off" tick-size="10" /></div></div></div>' +
      //   '<div class="tp-ma-r-5 pricecontainer "><div><div class="tp-h-30"></div><div class="send_order_txtPriceContainer tp-te-bo invalid-value" style="width: 75px; padding-left: 0"><input type="text" id="msecond" placeholder="میلی ثانیه" maxlength="12" allownegative="false" class="send_order_txtPrice number" dir="ltr" autocomplete="off" tick-size="10" /></div>' +
      //   '<label class="switch-container"><span class="switch"><input class="changeSettingInput" type="checkbox" id="startedSendRequest" name="startedSendRequest"><span class="switchslider round"></span></span></label>' +
      //   '<div class="tp-ma-r-5 pricecontainer "><div><div class="tp-h-30"></div><div class="send_order_txtPriceContainer tp-te-bo invalid-value" style="width: 85px; padding-left: 0"><input type="text" id="timeSence" placeholder="8:44:58:500" value="8:44:58:500" maxlength="12" allownegative="false" class="send_order_txtPrice number" dir="ltr" autocomplete="off" tick-size="10" /></div>' +
      //   '<label class="switch-container"><span class="switch"><input class="changeSettingInput" type="checkbox" id="startSenceTime" name="startedSendRequest"><span class="switchslider round"></span></span></label>' +
      //   '</div></div>'
    );
    btnBuy = "#send_order_btnSendOrder";
    btnSell = "#send_order_btnSendOrder";
  }

  let nowDate = new Date();
  $("#timeSence").val(
    nowDate.getHours() +
      ":" +
      nowDate.getMinutes() +
      ":" +
      nowDate.getSeconds() +
      ":" +
      nowDate.getMilliseconds()
  );

  $("#startedSendRequest").change(function () {
    if ($(this).is(":checked")) {
      if ($("#msecond").val()) {
        //alert('checked');

        // just start a new one
        startInterval($("#msecond").val());
      }
    } else {
      // clear the existing interval
      clearInterval(startIntervalId);
    }
  });

  // time sence
  $("#startSenceTime").change(function () {
    if ($(this).is(":checked")) {
      if ($("#timeSence").val()) {
        //alert('checked');

        // just start a new one
        startIntervalTimeSence(1);
      }
    } else {
      // clear the existing interval
      clearInterval(senceIntervalId);
    }
  });

  $("#hajm,#minPrice").on("input", function () {
    var input = $(this);
    var val = input.val();
    if (!val) {
      return;
    }
    val = p2e(val);
    val = Number(val.replace(/,/g, ""));

    var num = val.format(0, 3, ",", ".");
    input.val(num);
  });
}

// $('#speedUp').on('click', function() {
//   interval -= 100;
//   // clear the existing interval
//   clearInterval(intervalId);
//   // just start a new one
//   startInterval(interval);
//   console.log(interval)
// })

// store in a function so we can call it again
function startInterval(_interval) {
  // Store the id of the interval so we can clear it later
  startIntervalId = setInterval(function () {
    //console.log(_interval);
    $(btnBuy)[0].click();
  }, _interval);
}

// store in a function so we can call it again
function startIntervalTimeSence(_interval) {
  // Store the id of the interval so we can clear it later
  senceIntervalId = setInterval(function () {
    let dt = new Date();
    let tm = dt.getTime();
    let timeSence = Date.parse(
      dt.toLocaleDateString() + " " + $("#timeSence").val()
    );
    //let tsArr = $("#timeSence").val().split(":");

    //if(tsArr[0] <= dt.getHours() || tsArr[1] <= dt.getMinutes() || tsArr[2] <= dt.getSeconds() || tsArr[3] <= dt.getMilliseconds()){
    if (tm >= timeSence) {
      $(btnBuy).prop("disabled", false);
      $(btnBuy)[0].click();

      let msecond = Number($("#msecond").val());
      if (msecond) {
        timeSence += msecond;
        let newTm = new Date(timeSence);
        $("#timeSence").val(
          newTm.getHours() +
            ":" +
            newTm.getMinutes() +
            ":" +
            newTm.getSeconds() +
            ":" +
            newTm.getMilliseconds()
        );
      } else {
        $("#startSenceTime").prop("checked", false).change();
        //clearInterval(intervalId);
      }
    }
  }, _interval);
}

//------------------------------------------

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function (n, x, s, c) {
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
    num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace(".", c) : num).replace(
    new RegExp(re, "g"),
    "$&" + (s || ",")
  );
};

// var numbers = [1, 12, 123, 1234, 12345, 123456, 1234567, 12345.67, 123456.789];

// document.write('<p>Classic Format:</p>');
// for (var i = 0, len = numbers.length; i < len; i++) {
//   document.write('R$ ' + numbers[i].format(0, 3, ',', '.') + '<br />');
// }
