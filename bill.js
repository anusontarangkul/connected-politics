

$(document).ready(function () {

  function getUpcomingBill() {
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
        var billDescription = response.results[0].bills[i].description;
        var billNumber = response.results[0].bills[i].bill_number;
        var billURL = response.results[0].bills[i].bill_url;
        var billDate = response.results[0].bills[i].legislative_day;
        var billCard = $("<div>");
        billCard.attr(
          "class",
          "column p-1 is-full-mobile is-full-tablet is-half-desktop"
        );
        var billWrap = $("<div>");
        billWrap.attr("class", "column fill has-background-primary-dark has-text-white p-2 bill-box");


        var billDisplayTitle = $("<p>");
        billDisplayTitle.text(billNumber);
        billDisplayTitle.attr("id", "name");
        billDisplayTitle.addClass("has-text-weight-bold")

        var billDisplayDate = $("<p>");
        billDisplayDate.addClass("is-italic")
        billDisplayDate.text(billDate);

        var billDisplayDescription = $("<p>");
        billDisplayDescription.text(billDescription);
        billDisplayDescription.addClass("has-text-weight-medium")

        var billLink = $("<a>");
        billLink.attr("href", billURL);
        billLink.attr("target", "_blank");

        var billIcon = $("<img>");
        billIcon.attr("src", "./assets/images/bill.svg");
        billIcon.attr("class", "social-icon bill-icon");

        billLink.append(billIcon);

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
        billWrap.append(billLink);
        billWrap.append(billDisplayDescription);
        billWrap.append(billDisplayDate);
        billWrap.append(twitterShare);

      }
    });
  }


  $(".house-search").on("click", function () {
    $("#eo-display-container").empty();
    getUpcomingBill();
    $(".government-level").addClass("hide");
    $("#currentAddDisplay").addClass("hide");
  });

  //Typing Animation

  var options = {
    strings: [
      "Who are your representatives?",
      "Who are your Senators?",
      "Find out who represents you!",
      "Welcome to CONNECTED POLITICS!"
    ],
    typeSpeed: 30,
    backSpeed: 30,
  };

  var typed = new Typed('#typed', options);
  $(".typed-cursor").css("font-size", "xx-large")








});



