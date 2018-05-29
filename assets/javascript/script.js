$(document).ready(function () {



    //--
    var celebritiesArray = ["Lindsey Lohan", "Brad Pitt", "Leonardo Dicaprio", "Paris Hilton", "usher", "Tupac"];

    //--render buttons and get objects --//
    buttonsRender();
    $(document).on("click", "button", function (event) {
        var celebrities = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebrities +
            "&api_key=xvb7euBxppSrsuhZSaD5K5rSwZGZtsOZ&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var celebrityDiv = $("<div class = 'celebrities' >").addClass("col-sm-4");
                var p = $("<p>");
                var t = $("<h4>");
                p.text(results[i].rating);
                t.text(results[i].title);
                var celebrityImage = $("<img>");
                celebrityImage.attr({
                    "src": results[i].images.fixed_height.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    
                });
                celebrityDiv.prepend(p, celebrityImage);
                $("#giphys_view").prepend(celebrityDiv);
            }

        });

    });

    //---pausing gifs with a click--//
    $(document).on("click",  function () {
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");
        var state = $(this).attr("data-state")

        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
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

