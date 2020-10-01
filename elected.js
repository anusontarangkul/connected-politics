
var searchAdd = "141 E 56th St, New York, NY 10022";

var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + searchAdd + "&key=AIzaSyB9_EXjp94LjHiu63YgUiOSNUOJaAe4cII"

$.ajax({
    url: queryURL,
    type: "GET"
}).then(function(r){

    console.log(r.offices.length);

    // for(i = 0; i < offices.length )


    console.log(r);


    // //President print
    // console.log(r.offices[0].name + ": " + r.officials[r.offices[0].officialIndices[0]].name);

    // //V. President print
    // console.log(r.offices[1].name + ": " + r.officials[r.offices[1].officialIndices[0]].name);

    // //U.S Senator print
    // // console.log(r.offices.name[2].name + ": " + printOfficials());
    // console.log(r.offices[2].name + ": " + r.officials[r.offices[2].officialIndices[0]].name);

    

    // var office = response.offices[8];
    // for(i = 0; i < office.officialIndices.length; i++){
    //     console.log(response.officials[office.officialIndices[i]]);
    // };



});

//have var office = be an iteration that runs through all of the office names

// function printOfficials(office){

//     var addToString = "";
//     office 
// };