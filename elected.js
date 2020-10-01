
var searchAdd = "994 Henderson Ave, Sunnyvale CA 94086";

var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + searchAdd + "&key=AIzaSyB9_EXjp94LjHiu63YgUiOSNUOJaAe4cII"

$.ajax({
    url: queryURL,
    type: "GET"
}).then(function (r) {
    console.log(r.offices);

    for (i = 0; i < r.offices.length; i++) {


        console.log(r.offices[i].name);

        for(j = 0; j < r.offices[i].officialIndices.length; j++) {
            console.log(r.officials[r.offices[i].officialIndices[j]].name);
        };
    };

});
