
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

        var natLVL = true;
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

    for (j = 0; j < office[i].officialIndices.length; j++) {

        var eoTitle = office[i].name;
        var eoName = elected[office[i].officialIndices[j]].name;
        var eoParty = elected[office[i].officialIndices[j]].party;


        var eoCard = $("<div>");
        eoCard.attr("class", "eoCard column p-1 is-three-quarters-mobile is-two-thirds-tablet is-one-third-desktop");

        var eoWrap = $("<div>");
        eoWrap.attr("class", "fill has-background-danger has-text-white p-2");

        var eoDisTitle = $("<p>");
        eoDisTitle.text(eoTitle);

        var eoDisName = $("<p>");
        eoDisName.text(eoName);
        eoDisName.attr("id", "name");

        var eoDisParty = $("<p>");
        eoDisParty.text(eoParty);

        $("#eo-display-container").append(eoCard); //variable
        eoCard.append(eoWrap);
        eoWrap.append(eoDisName);
        eoWrap.append(eoDisTitle);
        eoWrap.append(eoDisParty);

        // modal creation below - made on the same line to use the same ajax call and variables

        var eoModal = $("<div>");
        eoModal.attr("class", "modal");
        eoModal.attr("data-nametag", eoName);

        var eoModalBkgrnd = $("<div>");
        eoModalBkgrnd.attr("class", "modal-background");

        var eoModalContent = $("<div>");
        eoModalContent.attr("class", "modal-content has-background-light");

        var eoModalClose = $("<button>");
        eoModalClose.attr("class", "modal-close is-large");
        eoModalClose.attr("aria-label", "close");

        eoModal.append(eoModalBkgrnd);
        eoModal.append(eoModalContent);
        eoModal.append(eoModalClose);
        $("#modal-container").append(eoModal);  //variable

        // Filling the modal with API elected official information

        var testDisplay = $("<p>"); //change variable name
        testDisplay.text(eoName);   //add more content
        testDisplay.attr("class", "p-3");
        eoModalContent.append(testDisplay);
    };


};

function displayEOmodal() {

    var modalList = document.getElementsByClassName("modal");
    var modalCheck = $(this).find("#name").text();

    for (i = 0; i < modalList.length; i++) {
        if ($(modalList[i]).data("nametag") === modalCheck) {
            $(modalList[i]).addClass("is-active");
        };
    };
}

$("#eo-display-container").on("click", ".fill", displayEOmodal);

$("#modal-container").on("click", ".modal-close", function () {
    $(this).parent().removeClass("is-active");
});

$("#modal-container").on("click", ".modal-background", function () {
    $(this).parent().removeClass("is-active");
});

$("#addSearchBtn").on("click", function () {
    var ipnut = $("#addSearchInput");

    searchAdd = ipnut.val();
    getEOinfo();
    ipnut.val("");
    $("#eo-display-container").empty();
});

