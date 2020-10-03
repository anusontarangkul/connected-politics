var APIkey = "EgraTtydGlMbucwd74Rsg0yDCtqMHEuYa76JSBN9";
var containerDiv = $("container");
// Usage is limited to 5000 requests per day

// // Open States
// API Key=  7697b752-32b6-48cf-977f-db868a07706a
// 100 daily requests
var dropdown = false;
$("#levelButton").on("click", function () {
  var menu = $("#dropdown-class");

  if (dropdown === false) {
    menu.addClass("is-active");
    menu.attr("data-menu", "show");
    dropdown = true;
  } else {
    menu.removeClass("is-active");
    menu.attr("data-menu", "hide");
    dropdown = false;
  }
});

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
        var scheduled = response.results[0].bills[i].scheduled_at;

        var billCard = $("<div>");
        billCard.attr(
          "class",
          "column p-1 is-three-quarters-mobile is-two-thirds-tablet is-one-third-desktop"
        );
        var billWrap = $("<div>");
        billWrap.attr("class", "fill has-background-danger has-text-white p-2");

        var billDisplayTitle = $("<p>");
        billDisplayTitle.text(billNumber);

        var billDisplayScheduled = $("<p>");
        billDisplayScheduled.text(scheduled);

        var billDisplayDescription = $("<p>");
        billDisplayDescription.text(description);

        var billDisplayURL = $("<p>");
        billDisplayURL.text(billURL);

        $("#eo-display-container").append(billCard);
        billCard.append(billWrap);
        billWrap.append(billDisplayTitle);
        billWrap.append(billDisplayScheduled);
        billWrap.append(billDisplayDescription);
        billWrap.append(billDisplayURL)

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

        var billModalScheduled = $("<p>");
        billModalScheduled.text(scheduled);

      }


      //         // modal creation below - made on the same line to use the same ajax call and variables

      //         var eoModal = $("<div>");
      //         eoModal.attr("class", "modal");
      //         eoModal.attr("data-nametag", eoName);

      //         var eoModalBkgrnd = $("<div>");
      //         eoModalBkgrnd.attr("class", "modal-background");

      //         var eoModalContent = $("<div>");
      //         eoModalContent.attr("class", "modal-content has-background-light");

      //         var eoModalClose = $("<button>");
      //         eoModalClose.attr("class", "modal-close is-large");
      //         eoModalClose.attr("aria-label", "close");

      //         eoModal.append(eoModalBkgrnd);
      //         eoModal.append(eoModalContent);
      //         eoModal.append(eoModalClose);
      //         $("#modal-container").append(eoModal);

      //         // Filling the modal with API elected official information

      //         var testDisplay = $("<p>");
      //         testDisplay.text(eoName);
      //         testDisplay.attr("class", "p-3");
      //         eoModalContent.append(testDisplay);
      //     };

      // };

      // for (let i = 0; i < response.results[0].bills.length; i++) {
      //   console.log(response);
      // }
    });
  }
  getLaw();

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

  var typed = new Typed("#typed", options);
});



//Create variable for container
//Change abbreviation variable