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
      }
    });
  }
  getLaw();

  var options = {
    strings: [
      "Who are your representatives?",
      "Who are your Senators?",
      "Who is your Mayor?",
      "Find out who represent you!",
    ],
    typeSpeed: 30,
    backSpeed: 30,
  };
  //var typed = new Typed("#typed", options);

  
});
