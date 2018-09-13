var inputSearch = "";
var searchValue = "";
var topics = [];
var usedTopics = [];
var userBtn;
var num = 0;

// dynamically creates buttons with the input of the user
$("#create-search-btn").on("click", function () {
    // Don't refresh the page :)
    event.preventDefault();

    // checker to see if the input box is empty
    if ($("#search-term-input").val() === "") {

        return false;

    } else {

        // a checker to see if the same value is input 
        inputSearch = $("#search-term-input").val().trim();

        // empties input box
        $("#search-term-input").val("");

        // pushes the value into the array
        topics.push(inputSearch);
        console.log("push complete!");
        console.log(topics);
        btnCreate();
    }

});

// this function will dynamically create the search buttons
function btnCreate() {

    // number counter, used to give each topic a unique identifier
    num++;

    // creation of the dynamic buttons
    userBtn = $("<button>")
    userBtn
        .addClass("btn search-term-btn dynamicElement")
        .appendTo($(".btn-holder"))
        .text(topics)
        .attr("data-name", topics);

    // pushes the topic out of the array, into a new "used" array, this is used as a flag.
    usedTopics.push(topics + num);
    topics = [];
    console.log(num);
};

// this function will display the gifs
$(document).on("click", ".search-term-btn", function () {

    // setting searchValue to the data-name of the button
    searchValue = $(this).attr("data-name");
    console.log(searchValue);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchValue + "&api_key=fz8sHcMEzac0L0N2iePYvyFkSb2JcMgc&limit=10";

    // inputting our ajax
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(response);


        //looping over each result item
        for (var i = 0; i < results.length; i++) {
            // creating a div with class "item"
            var gifDiv = $("<div>");
            gifDiv.addClass("item");

            // clears the gifs shown
            $("#clear-gif").on("click", function () {
                $(".item").remove();
            });

            // removes gifs and buttons
            $("#clear-all").on("click", function() {
                $(".search-term-btn").remove();
                $(".item").remove();
            });

            // storing the result's rating
            var rating = results[i].rating;

            // creating a p tag to display the result's rating
            var ptag = $("<p>").text("Rating: " + rating);

            // creating and storing an image tag
            var image = $("<img>");

            // Giving the image tag a source attribute pulled from the object returned in console.log(response) and then setting it to still
            image
                .addClass("gif")
                .attr("data-state", "still")
                .attr("src", results[i].images.fixed_height_still.url)
                .attr("data-still", results[i].images.fixed_height_still.url)
                .attr("data-animate", results[i].images.fixed_height.url);



            // Appending the image and then the paragraph to the gifDiv.
            gifDiv.append(image);
            gifDiv.append(ptag);

            // Prepending the gifDiv to the #gif-div
            $("#gif-div").prepend(gifDiv);
            // When clicked, the individual gif will animate
        }
        $(".gif").on("click", function () {

            // getting/setting the value of attributes on the html element
            var state = $(this).attr("data-state");

            // when clicked, if the image is still, it shall animate
            // otherwise, vise versa
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });

})


// })
// TODO:
// create array "topics" ✓ DONE
// take the elements in this array and use it to dynamically create buttons in HTML *loop* ✓ DONE 
// When ^ dynamic buttons are clicked, it should display 10 static, NON-ANIMATED gif images from the API.✓ DONE
// when the user clicks the image, the gif should animate, and when pressed again, should revert to the still image. ✓ DONE 
// under every gif, display the rating ✓ DONE
// add a form to page that takes value from a user input box and adds it into the topic's array. ✓ DONE
// then make a function callback that takes each topic in the array and remakes the buttons ✓ DONE
// have gifs disappear when a new button is clicked
// have gifs disappear when "clear gifs" is pressed

// Bonuses TODO:
// fully mobile responsive
// request additional