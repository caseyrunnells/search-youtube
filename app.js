// Search Youtube JS

$(document).ready(function() {

    // 1 - get input
    $("#search-form").submit(function(event) {
        event.preventDefault();
        var userInput = $("#query").val();
        callYoutube(userInput);
    });

    // 2 - take input, make api call, receive response
    function callYoutube(userSearchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet",
                maxResults: 20,
                key: "AIzaSyDSV641M55XMZ2iaYK2rmok0z5Xd2nkV94",
                q: userSearchTerm,
                type: "video"
            },
            function(ApiReturn) {
                console.log(ApiReturn);
                if (ApiReturn.pageInfo.totalResults == 0) {
                    alert("There are no results to display.");
                } else {
                    displayVideoResults(ApiReturn.items);
                }
            });
    }

    // 3 - pass response variables to html
    function displayVideoResults(videosArray) {

        var displayResults = "";

        $.each(videosArray, function(videosArrayKey, videosArrayValue) {
            displayResults += "<li>";
            displayResults += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>";
            displayResults += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>";
            displayResults += "</a>";
            displayResults += "<p>" + videosArrayValue.snippet.title + "</p>";
            displayResults += "</li>";
        });

        //print to html
        $("#results ul").html(displayResults);
    }
});
