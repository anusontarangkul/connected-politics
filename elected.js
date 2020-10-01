

var apiKey = "AIzaSyB9_EXjp94LjHiu63YgUiOSNUOJaAe4cII"
var searchAdd = "2207 Addison Ave East Palo Alto CA 94303";
var office;
var elected;

function getEOinfo() {

    var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + searchAdd + "&key=" + apiKey;

    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function (r) {
        office = r.offices;
        elected = r.officials;

        console.log(r);

        var natLVL =true;
        var stateLVL = true;
        var localLVL = true;
        var state = r.normalizedInput.state;

        for (i = 0; i < r.offices.length; i++) {

            if (natLVL === true && (r.offices[i].name.includes("President") || r.offices[i].name.includes("U.S."))) {
                displayEO();
            } else if (stateLVL === true && (r.offices[i].name.includes(state) || r.offices[i].name.includes("Governor"))) {
                displayEO();
            } else if (localLVL === true && !r.offices[i].name.includes(state) && !r.offices[i].name.includes("Governor") && !r.offices[i].name.includes("U.S.") && !r.offices[i].name.includes("President")) {
                displayEO();
            }
        };
    });
};

function displayEO() {

    console.log(office[i].name);

    for (j = 0; j < office[i].officialIndices.length; j++) {
        console.log(elected[office[i].officialIndices[j]].name);
        console.log(elected[office[i].officialIndices[j]].party);
        console.log(elected[office[i].officialIndices[j]].photoUrl);

        var eoTitle = office[i].name;
        var eoName = elected[office[i].officialIndices[j]].name;
        var eoParty = elected[office[i].officialIndices[j]].party;
        

        var eoCard = $("<div>");
        eoCard.attr("class", "eoCard");

        var eoDisTitle = $("<p>");
        eoDisTitle.text(eoTitle);

        var eoDisName = $("<p>");
        eoDisName.text(eoName);

        var eoDisParty = $("<p>");
        eoDisParty.text(eoParty);



        $("#eo-display-container").append(eoCard);
        eoCard.append(eoDisName);
        eoCard.append(eoDisTitle);
        eoCard.append(eoDisParty);
    };


};

$("#addSearchBtn").on("click", function () {
    var ipnut = $("#addSearchInput");

    searchAdd = ipnut.val();
    getEOinfo();
    ipnut.val("");
    $("#eo-display-container").empty();
});

getEOinfo();