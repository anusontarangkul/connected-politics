
var apiKey = "AIzaSyB9_EXjp94LjHiu63YgUiOSNUOJaAe4cII";
var searchAdd = "2207 Addison Ave East Palo Alto CA";
var office;
var elected;
var displayAdd;

var natLVL = true;
var stateLVL = false;
var localLVL = false;

var dropdown = false;

function displayEOinfo() {

    // reset html elements inside of card and modal containers
    $("#eo-display-container").empty();
    $("#modal-container").empty();

    var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + searchAdd + "&key=" + apiKey;

    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function (r) {
        office = r.offices;
        elected = r.officials;

        displayCurrentAddress();

        console.log(r);
        var state = r.normalizedInput.state;

        for (i = 0; i < r.offices.length; i++) {

            if (natLVL === true && (r.offices[i].name.includes("President") || r.offices[i].name.includes("U.S."))) {
                getEOinfo();
            } else if (stateLVL === true && (r.offices[i].name.includes(state) || r.offices[i].name.includes("Governor"))) {
                getEOinfo();
            } else if (localLVL === true && !r.offices[i].name.includes(state) && !r.offices[i].name.includes("Governor") && !r.offices[i].name.includes("U.S.") && !r.offices[i].name.includes("President")) {
                getEOinfo();
            }
        };
    });
};

function displayCurrentAddress() {


    var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + searchAdd + "&key=" + apiKey;

    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function (r) {
        office = r.offices;
        elected = r.officials;

        displayAdd = r.normalizedInput.line1 + ", " + r.normalizedInput.city + ", " + r.normalizedInput.state + " " + r.normalizedInput.zip;
        $("#currentAddDisplay").text(displayAdd);
    });
};


function getEOinfo() {

    for (j = 0; j < office[i].officialIndices.length; j++) {
        var eoInfo = elected[office[i].officialIndices[j]];

        var eoTitle = office[i].name;
        var eoName = eoInfo.name;
        var eoParty = eoInfo.party;
        var eoPhoto = eoInfo.photoUrl;
        var eoNumber = eoInfo.phones[0];
        var eoEmail = eoInfo.emails;
        var eoSocial = eoInfo.channels;
        var eoWebsite = eoInfo.urls;



        var eoCard = $("<div>");
        eoCard.attr("class", "eoCard column p-1 is-three-quarters-mobile is-two-thirds-tablet is-one-third-desktop");

        var eoWrap = $("<div>");
        eoWrap.attr("class", "fill p-2 is-relative");

        if (eoInfo.party === "Republican Party") {
            eoWrap.addClass("republican r-box-shadow");
        } else if (eoInfo.party === "Democratic Party") {
            eoWrap.addClass("democratic d-box-shadow");
        } else {
            eoWrap.addClass("nonpartisan np-box-shadow");
        }

        var eoDisTitle = $("<p>");
        eoDisTitle.text(eoTitle);

        var eoDisName = $("<p>");
        eoDisName.text(eoName);
        eoDisName.attr("id", "name");

        var eoDisParty = $("<p>");
        eoDisParty.text(eoParty);

        if (eoInfo.party === "Republican Party") {
            var eoDisPartyIcon = $("<img>");
            eoDisPartyIcon.attr("src", "./assets/images/republican.svg");
            eoDisPartyIcon.attr("class", "party-icon is-vcentered");
        } else if (eoInfo.party === "Democratic Party") {
            var eoDisPartyIcon = $("<img>");
            eoDisPartyIcon.attr("src", "./assets/images/democrat.svg");
            eoDisPartyIcon.attr("class", "party-icon is-vcentered");
        }

        $("#eo-display-container").append(eoCard);
        eoCard.append(eoWrap);
        eoWrap.append(eoDisName);
        eoWrap.append(eoDisTitle);
        eoWrap.append(eoDisParty);
        eoWrap.append(eoDisPartyIcon);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // modal creation below - made on the same line to use the same ajax call and variables

        var eoModal = $("<div>");
        eoModal.attr("class", "modal");
        eoModal.attr("data-nametag", eoName);

        var eoModalBkgrnd = $("<div>");
        eoModalBkgrnd.attr("class", "modal-background");

        var eoModalCard = $("<div>");
        eoModalCard.attr("class", "modal-card has-background-light");

        var eoModalHeader = $("<header>");
        eoModalHeader.attr("class", "modal-card-head has-background-light");

        var eoModalBody = $("<section>");
        eoModalBody.attr("class", "modal-card-body has-text-centered");

        var eoModalFooter = $("<footer>");
        eoModalFooter.attr("class", "modal-card-footer");

        var eoModalClose = $("<button>");
        eoModalClose.attr("id", "close");
        eoModalClose.attr("class", "delete");
        eoModalClose.attr("aria-label", "close");

        var eoModalName = $("<p>");
        eoModalName.text(eoName);
        eoModalName.attr("class", "modal-name is-size-4 has-text-weight-semibold");

        var eoModalIconContainer = $("<div>");
        eoModalIconContainer.attr("class", "social-icon-container");

        var eoModalTextContainer = $("<div>");
        eoModalTextContainer.attr("class", "text-container");


        eoModalFooter.append(eoModalIconContainer);
        eoModalHeader.append(eoModalName);
        eoModalHeader.append(eoModalClose);

        eoModalCard.append(eoModalHeader);
        eoModalCard.append(eoModalBody);
        eoModalCard.append(eoModalFooter);

        eoModal.append(eoModalBkgrnd);
        eoModal.append(eoModalCard);
        $("#modal-container").append(eoModal);  //variable

        // Filling the modal with API elected official information



        if (eoPhoto !== undefined) {
            var eoModalPhoto = $("<img>");
            eoModalPhoto.attr("src", eoPhoto);
            eoModalPhoto.attr("id", "sizePhoto");
            eoModalBody.append(eoModalPhoto);
        };

        var eoModalTitle = $("<p>");
        eoModalTitle.text(eoTitle);
        eoModalTitle.attr("class", "p-3");

        var eoModalParty = $("<p>");
        eoModalParty.text(eoParty);
        eoModalParty.attr("class", "p-3");

        if (eoNumber !== undefined) {
            var eoModalNumber = $("<p>");
            eoModalNumber.text(eoNumber);
            eoModalNumber.attr("class", "p-3");
        }

        if (eoEmail !== undefined) {
            var eoModalEmail = $("<a>");
            eoModalEmail.text(eoEmail);
            eoModalEmail.attr("class", "p-3");
            eoModalEmail.attr("href", "mailto:" + eoEmail);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        eoModalBody.append(eoModalTextContainer);
        eoModalTextContainer.append(eoModalTitle);
        eoModalTextContainer.append(eoModalParty);
        eoModalTextContainer.append(eoModalNumber);
        eoModalTextContainer.append(eoModalEmail);


        if (eoSocial !== undefined) {

            var ytCount = 0;

            for (s = 0; s < eoSocial.length; s++) {

                if (eoSocial[s].type === "Twitter") {
                    var eoModalSocialLink = $("<a>");
                    eoModalSocialLink.attr("href", "https://twitter.com/" + eoSocial[s].id);
                    eoModalSocialLink.attr("target", "_blank");

                    var eoModalSocial = $("<img>");
                    eoModalSocial.attr("src", "./assets/images/twitter.svg");
                    eoModalSocial.attr("class", "social-icon m-4");

                    eoModalSocialLink.append(eoModalSocial);
                    eoModalIconContainer.append(eoModalSocialLink);

                } else if (eoSocial[s].type === "Facebook") {
                    var eoModalSocialLink = $("<a>");
                    eoModalSocialLink.attr("href", "https://www.facebook.com/" + eoSocial[s].id);
                    eoModalSocialLink.attr("target", "_blank");

                    var eoModalSocial = $("<img>");
                    eoModalSocial.attr("src", "./assets/images/facebook.svg");
                    eoModalSocial.attr("class", "social-icon m-4");

                    eoModalSocialLink.append(eoModalSocial);
                    eoModalIconContainer.append(eoModalSocialLink);

                } else if (eoSocial[s].type === "YouTube" && ytCount === 0) {
                    var eoModalSocialLink = $("<a>");
                    eoModalSocialLink.attr("href", "https://www.youtube.com/" + eoSocial[s].id);
                    eoModalSocialLink.attr("target", "_blank");

                    var eoModalSocial = $("<img>");
                    eoModalSocial.attr("src", "./assets/images/youtube.svg");
                    eoModalSocial.attr("class", "social-icon m-4");

                    eoModalSocialLink.append(eoModalSocial);
                    eoModalIconContainer.append(eoModalSocialLink);

                    ytCount++;
                };
            };
        };

        if (eoWebsite !== undefined) {

            var eoModalWebsiteLink = $("<a>");
            eoModalWebsiteLink.attr("href", eoWebsite[0]);
            eoModalWebsiteLink.attr("target", "_blank");

            var eoModalWebsite = $("<img>");
            eoModalWebsite.attr("src", "./assets/images/homepage.svg");
            eoModalWebsite.attr("class", "social-icon m-4");

            eoModalWebsiteLink.append(eoModalWebsite);
            eoModalIconContainer.append(eoModalWebsiteLink);
        };
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
};

$("#eo-display-container").on("click", ".fill", displayEOmodal);

$("#modal-container").on("click", "#close", function () {
    $(this).closest(".modal").removeClass("is-active");
});

$("#modal-container").on("click", ".modal-background", function () {
    $(this).parent().removeClass("is-active");
});

$("#addSearchBtn").on("click", function () {
    var ipnut = $("#addSearchInput");

    searchAdd = ipnut.val();
    displayEOinfo();

    ipnut.val("");
});

$("#dropdown-class").hover(function () {
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

$("#federal-level").on("click", function () {

    if (searchAdd !== undefined) {
        natLVL = true;
        stateLVL = false;
        localLVL = false;
        displayEOinfo();

        $("#lvlSet").text("Federal Level");
    };
});

$("#state-level").on("click", function () {

    if (searchAdd !== undefined) {
        natLVL = false;
        stateLVL = true;
        localLVL = false;
        displayEOinfo();

        $("#lvlSet").text("State Level");
    };
});

$("#local-level").on("click", function () {

    if (searchAdd !== undefined) {
        natLVL = false;
        stateLVL = false;
        localLVL = true;
        displayEOinfo();

        $("#lvlSet").text("Local Level");
    };
});

displayEOmodal();