
var apiKey = "AIzaSyB9_EXjp94LjHiu63YgUiOSNUOJaAe4cII";
var searchAdd = "2207 Addison Ave East Palo Alto CA";

var office;
var elected;
var displayAdd;

var natLVL = true;
var stateLVL = false;
var localLVL = false;

var dropdown = false;
var validAddressCheck = false;

function displayEOinfo() {

    // reset html elements inside of card and modal containers

    var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + searchAdd + "&key=" + apiKey;

    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function (r) {
        office = r.offices;
        elected = r.officials;

        console.log(r);
        
        validAddressCheck = true;

        if (validAddressCheck) {
            $("#dropdown-lvl").removeClass("hide");
            $("#currentAddDisplay").removeClass("hide");
            $("#dropdown-lvl").addClass("show");
            $("#currentAddDisplay").addClass("show");
        };

        var address = r.normalizedInput;
        var normInputAddress = "";

        if (address.line1 !== "") {
            normInputAddress += address.line1 + ", ";
        }

        if (address.city !== "") {
            normInputAddress += address.city + ", ";
        }

        if (address.state !== "") {
            normInputAddress += address.state + " ";
        }

        if (address.zip !== "") {
            normInputAddress += address.zip;
        }

        $("#currentAddDisplay").text(normInputAddress);
        $("#eo-display-container").empty();
        $("#modal-container").empty();

        for (i = 0; i < r.offices.length; i++) {

            if (natLVL === true && (r.offices[i].name.includes("President") || r.offices[i].name.includes("U.S."))) {
                getEOinfo();
            } else if (stateLVL === true && (r.offices[i].name.includes(address.state) || r.offices[i].name.includes("Governor"))) {
                getEOinfo();
            } else if (localLVL === true && !r.offices[i].name.includes(address.state) && !r.offices[i].name.includes("Governor") && !r.offices[i].name.includes("U.S.") && !r.offices[i].name.includes("President")) {
                getEOinfo();
            }
        };
    });
};

function getEOinfo() {

    for (j = 0; j < office[i].officialIndices.length; j++) {
        var electedInfo = elected[office[i].officialIndices[j]];

        var electedTitle = office[i].name;
        var electedName = electedInfo.name;
        var electedParty = electedInfo.party;
        var electedPhoto = electedInfo.photoUrl;
        var electedNumber = electedInfo.phones[0];
        var electedEmail = electedInfo.emails;
        var electedSocial = electedInfo.channels;
        var electedWebsite = electedInfo.urls;



        var electedCard = $("<div>");
        electedCard.attr("class", "electedCard column p-1 is-three-quarters-mobile is-two-thirds-tablet is-one-third-desktop");

        var electedWrap = $("<div>");
        electedWrap.attr("class", "fill p-2 is-relative");

        if (electedInfo.party === "Republican Party") {
            electedWrap.addClass("republican r-box-shadow");
        } else if (electedInfo.party === "Democratic Party") {
            electedWrap.addClass("democratic d-box-shadow");
        } else {
            electedWrap.addClass("nonpartisan np-box-shadow");
        }

        var electedDisTitle = $("<p>");
        electedDisTitle.text(electedTitle);

        var electedDisName = $("<p>");
        electedDisName.text(electedName);
        electedDisName.attr("id", "name");

        var electedDisParty = $("<p>");
        electedDisParty.text(electedParty);

        if (electedInfo.party === "Republican Party") {
            var electedDisPartyIcon = $("<img>");
            electedDisPartyIcon.attr("src", "./assets/images/republican.svg");
            electedDisPartyIcon.attr("class", "party-icon is-vcentered");
        } else if (electedInfo.party === "Democratic Party") {
            var electedDisPartyIcon = $("<img>");
            electedDisPartyIcon.attr("src", "./assets/images/democrat.svg");
            electedDisPartyIcon.attr("class", "party-icon is-vcentered");
        }

        $("#eo-display-container").append(electedCard);
        electedCard.append(electedWrap);
        electedWrap.append(electedDisName);
        electedWrap.append(electedDisTitle);
        electedWrap.append(electedDisParty);
        electedWrap.append(electedDisPartyIcon);

        var modal = $("<div>");
        modal.attr("class", "modal");
        modal.attr("data-nametag", electedName);

        var modalBkgrnd = $("<div>");
        modalBkgrnd.attr("class", "modal-background");

        var modalCard = $("<div>");
        modalCard.attr("class", "modal-card has-background-light");

        var modalHeader = $("<header>");
        modalHeader.attr("class", "modal-card-head has-background-light");

        var modalBody = $("<section>");
        modalBody.attr("class", "modal-card-body has-text-centered");

        var modalFooter = $("<footer>");
        modalFooter.attr("class", "modal-card-footer");

        var modalClose = $("<button>");
        modalClose.attr("id", "close");
        modalClose.attr("class", "delete");
        modalClose.attr("aria-label", "close");

        var modalName = $("<p>");
        modalName.text(electedName);
        modalName.attr("class", "modal-name is-size-4 has-text-weight-semibold");

        var modalIconContainer = $("<div>");
        modalIconContainer.attr("class", "social-icon-container");

        var modalTextContainer = $("<div>");
        modalTextContainer.attr("class", "text-container");


        modalFooter.append(modalIconContainer);
        modalHeader.append(modalName);
        modalHeader.append(modalClose);

        modalCard.append(modalHeader);
        modalCard.append(modalBody);
        modalCard.append(modalFooter);

        modal.append(modalBkgrnd);
        modal.append(modalCard);
        $("#modal-container").append(modal);

        if (electedPhoto !== undefined) {
            var modalPhoto = $("<img>");
            modalPhoto.attr("src", electedPhoto);
            modalPhoto.attr("id", "sizePhoto");
            modalBody.append(modalPhoto);
        };

        var modalTitle = $("<p>");
        modalTitle.text(electedTitle);
        modalTitle.attr("class", "p-3");

        var modalParty = $("<p>");
        modalParty.text(electedParty);
        modalParty.attr("class", "p-3");

        if (electedNumber !== undefined) {
            var modalNumber = $("<p>");
            modalNumber.text(electedNumber);
            modalNumber.attr("class", "p-3");
        }

        if (electedEmail !== undefined) {
            var modalEmail = $("<a>");
            modalEmail.text(electedEmail);
            modalEmail.attr("class", "p-3");
            modalEmail.attr("href", "mailto:" + electedEmail);
        }

        modalBody.append(modalTextContainer);
        modalTextContainer.append(modalTitle);
        modalTextContainer.append(modalParty);
        modalTextContainer.append(modalNumber);
        modalTextContainer.append(modalEmail);

        if (electedSocial !== undefined) {

            var ytCount = 0;

            for (s = 0; s < electedSocial.length; s++) {

                if (electedSocial[s].type === "Twitter") {
                    var modalSocialLink = $("<a>");
                    modalSocialLink.attr("href", "https://twitter.com/" + electedSocial[s].id);
                    modalSocialLink.attr("target", "_blank");

                    var modalSocial = $("<img>");
                    modalSocial.attr("src", "./assets/images/twitter.svg");
                    modalSocial.attr("class", "social-icon m-4");

                    modalSocialLink.append(modalSocial);
                    modalIconContainer.append(modalSocialLink);

                } else if (electedSocial[s].type === "Facebook") {
                    var modalSocialLink = $("<a>");
                    modalSocialLink.attr("href", "https://www.facebook.com/" + electedSocial[s].id);
                    modalSocialLink.attr("target", "_blank");

                    var modalSocial = $("<img>");
                    modalSocial.attr("src", "./assets/images/facebook.svg");
                    modalSocial.attr("class", "social-icon m-4");

                    modalSocialLink.append(modalSocial);
                    modalIconContainer.append(modalSocialLink);

                } else if (electedSocial[s].type === "YouTube" && ytCount === 0) {
                    var modalSocialLink = $("<a>");
                    modalSocialLink.attr("href", "https://www.youtube.com/" + electedSocial[s].id);
                    modalSocialLink.attr("target", "_blank");

                    var modalSocial = $("<img>");
                    modalSocial.attr("src", "./assets/images/youtube.svg");
                    modalSocial.attr("class", "social-icon m-4");

                    modalSocialLink.append(modalSocial);
                    modalIconContainer.append(modalSocialLink);

                    ytCount++;
                };
            };
        };

        if (electedWebsite !== undefined) {

            var modalWebsiteLink = $("<a>");
            modalWebsiteLink.attr("href", electedWebsite[0]);
            modalWebsiteLink.attr("target", "_blank");

            var modalWebsite = $("<img>");
            modalWebsite.attr("src", "./assets/images/homepage.svg");
            modalWebsite.attr("class", "social-icon m-4");

            modalWebsiteLink.append(modalWebsite);
            modalIconContainer.append(modalWebsiteLink);
        };
    };
};

function displayModal() {

    var modalList = document.getElementsByClassName("modal");
    var modalCheck = $(this).find("#name").text();

    for (i = 0; i < modalList.length; i++) {
        if ($(modalList[i]).data("nametag") === modalCheck) {
            $(modalList[i]).addClass("is-active");
        };
    };
};

$("#eo-display-container").on("click", ".fill", displayModal);

$("#modal-container").on("click", "#close", function () {
    $(this).closest(".modal").removeClass("is-active");
});

$("#modal-container").on("click", ".modal-background", function () {
    $(this).parent().removeClass("is-active");
});

$("#addSearchBtn").on("click", function () {
    var input = $("#addSearchInput");

    searchAdd = input.val();
    displayEOinfo();
    input.val("");
    validAddressCheck = false;

});

$("#dropdown-lvl").hover(function () {
    var menu = $("#dropdown-lvl");

    if (dropdown === false) {
        menu.addClass("is-active");
        dropdown = true;
    } else {
        menu.removeClass("is-active");
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