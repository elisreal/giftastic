// 1. Generate Buttons that will have each characters name in the #buttons div
// 2. When you click on the button, it will retrieve info from the giphy API.
// 3. When the info is retrieved, 10 gifs will display in the #display div.
// 4. If you click on the gif, it will begin playing. 
// 5. If you click it a second time, it will stop playing.
// 6. When you click one of the buttons it will wipe the #display div and retrieve new gifs


// giphyAPI Key: 0f5692156c7f440686a431587ec6d8ee
// giphy address: http://api.giphy.com/v1/gifs/search?q=SEARCHWORDS&api_key=YOUR_API_KEY&limit=10


// variables ---------------------------------------------------

var api = "https://api.giphy.com/v1/gifs/search?q=";
var value = "";
var key = "&api_key=0f5692156c7f440686a431587ec6d8ee"
var limit = "&limit=12"
var buttons = [];
var thumbnails = {};


// buttons ------------------------------------------------------

$(document).ready(function() {

	var $j = jQuery.noConflict();

	buttons = ["Michael Scott", "Dwight Schrute", "Jim Halpert", "Pam Halpert", "Stanley Hudson", "Andy Bernard", "Creed Bratton", "Kevin Malone", "Angela Martin", "Oscar Martinez", "Meredith Palmer", "Darryl Philbin"];

	function renderButtons() {
		$('#buttons').empty();
		for (i = 0; i < buttons.length; i++) { 
			$('#buttons').append("<button class='btn btn-default btn-lg btn-primary'>" + buttons[i] + "</button>");
		    console.log(buttons);
		}
	}

	$("#add-button").on("click", function(event) {
        event.preventDefault();
        var button = $("#button-input").val().trim();
        buttons.push(button);
        renderButtons();
        getGifs();
    });	

	function getGifs() {
		$("button").click(function() {
			var value = $(this).text();
			var searchPhrase = value.replace(" ", "+");
			var search = $.get(api + searchPhrase + key + limit);
			search.done(function(data) {
				console.log(data);
				for (i = 0; i < data.data.length; i++) {
					var ratingsSpan = ("<div class='rating'><p>Rated: <span id='gifRatings'>" + data.data[i].rating + "</span></p></div>");
					$('#display').append("<div class='imgDiv'><div class='image'><img class='gifImg' src='" + data.data[i].images.downsized_still.url + "' data-gifurl='" + data.data[i].images.downsized.url + "' data-stillurl='" + data.data[i].images.downsized_still.url + "'></div>" + ratingsSpan + "</div></div>");
				};
	 
				$("img").click(function() {
					console.log("im working");
	                var gifurl = $(this).data('gifurl');
	                var stillurl = $(this).data('stillurl');

	                if ($(this).attr('src') == stillurl) {
	                    $(this).attr('src', gifurl);
	                }
	                else {
	                    $(this).attr('src', stillurl);
	                    }
	            });				
			});
		});

		$("button").click(function() {
			$('#display').empty();
		});
	}

renderButtons();
getGifs();

});

