

var apiKey = "AIzaSyB9_EXjp94LjHiu63YgUiOSNUOJaAe4cII"
var searchAdd = "New York, NY";
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

        var natLVL = false;
        var stateLVL = false;
        var localLVL = true;
        var state = r.normalizedInput.state;

        for (i = 0; i < r.offices.length; i++) {

            if (natLVL === true && (r.offices[i].name.includes("President") || r.offices[i].name.includes("U.S."))) {
                printEO();
            } else if (stateLVL === true && (r.offices[i].name.includes(state) || r.offices[i].name.includes("Governor"))) {
                printEO();
            } else if (localLVL === true && !r.offices[i].name.includes(state) && !r.offices[i].name.includes("Governor") && !r.offices[i].name.includes("U.S.") && !r.offices[i].name.includes("President")) {
                printEO();
            }
        };
    });
};

function printEO() {
    console.log(office[i].name);

    for (j = 0; j < office[i].officialIndices.length; j++) {
        console.log(elected[office[i].officialIndices[j]].name);
    };
};

$("#addSearchBtn").on("click", function () {
    var ipnut = $("#addSearchInput");

    searchAdd = ipnut.val();
    getEOinfo();
    ipnut.val("");
});