var APIkey = "EgraTtydGlMbucwd74Rsg0yDCtqMHEuYa76JSBN9";
var containerDiv = $("container");
// Usage is limited to 5000 requests per day

// // Open States
// API Key=  7697b752-32b6-48cf-977f-db868a07706a
// 100 daily requests

$(document).ready(function () {
  function getLaw() {
    var queryURL =
      "https://api.propublica.org/congress/v1/bills/upcoming/house.json";
    $.ajax({
      type: "GET",
      url: queryURL,
      headers: {
        "X-API-Key": "EgraTtydGlMbucwd74Rsg0yDCtqMHEuYa76JSBN9",
      },
    }).then(function (response) {
      for (var i = 0; i < response.results[0].bills.length; i++) {
        var description = response.results[0].bills[i].description;
        var billNumber = response.results[0].bills[i].bill_number;
        var billURL = response.results[0].bills[i].bill_url;
        var date = response.results[0].bills[i].legislative_day;  //date earliest considered
        var billCard = $("<div>");
        billCard.attr(
          "class",
          "column p-1 is-three-quarters-mobile is-two-thirds-tablet is-one-third-desktop"
        );
        var billWrap = $("<div>");
        billWrap.attr("class", "fill has-background-danger has-text-white p-2");

        var billDisplayTitle = $("<p>");
        billDisplayTitle.text(billNumber);
        billDisplayTitle.attr("id", "name");
        billDisplayTitle.addClass("has-text-weight-bold")

        // var billDisplayDate = $("<p>");
        // billDisplayDate.text(date);

        var billDisplayDescription = $("<p>");
        billDisplayDescription.text(description);

        // var billDisplayURL = $("<p>");
        // billDisplayURL.text(billURL);

        var twitterShare = $("<a>");
        twitterShare.attr('href', "https://twitter.com/intent/tweet?text=" + billURL);
        twitterShare.addClass("twitter-share-button");
        twitterShare.text("Tweet");
        var twitterScript = $("<script>")
        twitterScript.attr("src", "https://platform.twitter.com/widgets.js")
        twitterShare.append(twitterScript);


        $("#eo-display-container").append(billCard);
        billCard.append(billWrap);
        billWrap.append(billDisplayTitle);
        // billWrap.append(billDisplayDate);
        billWrap.append(billDisplayDescription);
        // billWrap.append(billDisplayURL)
        billWrap.append(twitterShare)

        var billModal = $("<div>");
        billModal.attr("class", "modal");
        billModal.attr("data-nametag", billNumber)

        var billModalBackground = $("<div>");
        billModalBackground.attr("class", "modal-background");

        var billModalContent = $("<div>");
        billModalContent.attr("class", "modal-content has-background-light");

        var billModalClose = $("<button>");
        billModalClose.attr("class", "modal-close is-large");
        billModalClose.attr("aria-label", "close");

        billModal.append(billModalBackground);
        billModal.append(billModalContent);
        billModal.append(billModalClose);
        $("#modal-container").append(billModal);

        var billModalTitle = $("<p>");
        billModalTitle.text(billNumber);

        var billModalDescription = $("<p>");
        billModalDescription.text(description);

        var billModalURL = $("<p>");
        billModalURL.text(billURL);

        var billModalDate = $("<p>");
        billModalDate.text(date);

        billModalContent.append(billModalTitle);
        billModalContent.append(billModalDescription);
        billModalContent.append(billModalURL);
        billModalContent.append(billModalDate);


      }
    });
  }


  function displayBillModal() {
    var modalList = document.getElementsByClassName("modal");
    var modalCheck = $(this).find("#name").text();

    for (i = 0; i < modalList.length; i++) {
      if ($(modalList[i]).data("nametag") === modalCheck) {
        $(modalList[i]).addClass("is-active");
      };
    };
  }

  $("#eo-display-container").on("click", ".fill", displayBillModal);

  $("#modal-container").on("click", ".modal-close", function () {
    $(this).parent().removeClass("is-active");
  });

  $("#modal-container").on("click", ".modal-background", function () {
    $(this).parent().removeClass("is-active");
  });


  $(".house-search").on("click", function () {
    $("#eo-display-container").empty();
    getLaw();
  });



  var options = {
    strings: [
      "Who are your representatives?",
      "Who are your Senators?",
      "Who is your Mayor?",
      "Find out who represents you!",
    ],
    typeSpeed: 30,
    backSpeed: 30,
  };

  var typed = new Typed('#typed', options);
  $(".typed-cursor").css("font-size", "xx-large")








});



