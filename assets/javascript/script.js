$(document).ready(function () {

    //--- array of first tv shows ---//

    //
    var celebritiesArray = ["Lindsey Lohan", "Brad Pitt", "Leonardo Dicaprio", "Paris Hilton", "usher", "Tupac"];

    //--get and display tv giphy --//
    buttonsRender();
    $(document).on("click", "button", function (event) {
        var celebrities = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q" + celebrities +
            "&api_key=xvb7euBxppSrsuhZSaD5K5rSwZGZtsOZ&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.lenght; i++) {
                var celebrityDiv = $("<div class = 'celebrities' >").addClass("col-sm-4");
                var p = $("<p>");
                p.text(results[i].rating);
                var celebrityImage = $("<img>");
                celebrityImage.attr({
                    "src": results[i].images.fixed_height_still.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "animate"
                });
                celebrityDiv.prepend(p, celebrityImage);
                $("#giphys_view").prepend(celebrityDiv);
            }

        });

    });
    // rendering buttons
    function buttonsRender() {
        $("#btns_view").empty();

        for (var i = 0; i < celebritiesArray.length; i++) {
            var a = $("<button>");
            a.addClass("celebrity-btn");
            // Adding a data-attribute
            a.attr("data-name", celebritiesArray[i]);
            // Providing the initial button text
            a.text(celebritiesArray[i]);
            // Adding the button to the buttons-view div
            $("#btns_view").append(a);
        }
    }
   

    $("#search-more").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newCelebrity = $("#search_giphys").val().trim();

        if (newCelebrity != "") {

        celebritiesArray.push(newCelebrity);
        console.log(celebritiesArray);
        buttonsRender();
        }
    });

});

