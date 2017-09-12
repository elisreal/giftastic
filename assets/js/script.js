// 1. Generate Buttons that will have each characters name in the #buttons div
// 2. When you click on the button, it will retrieve info from the giphy API.
// 3. When the info is retrieved, 10 gifs will display in the #display div.
// 4. If you click on the gif, it will begin playing. 
// 5. If you click it a second time, it will stop playing.
// 6. When you click one of the buttons it will wipe the #display div and retrieve new gifs


// giphyAPI Key: 0f5692156c7f440686a431587ec6d8ee
// giphy address: http://api.giphy.com/v1/gifs/search?q=SEARCHWORDS&api_key=YOUR_API_KEY&limit=10


// variables ---------------------------------------------------

var api = "http://api.giphy.com/v1/gifs/search?q=";
var value = "";
var key = "&api_key=0f5692156c7f440686a431587ec6d8ee"
var limit = "&limit=10"
var buttons = [];
var thumbnails = {};


// buttons ------------------------------------------------------

$(document).ready(function() {

	var $j = jQuery.noConflict();

	buttons = ["Michael Scott", "Dwight Schrute", "Jim Halpert", "Pam Halpert", "Stanley Hudson", "Andy Bernard", "Creed Bratton", "Kevin Malone", "Angela Martin", "Oscar Martinez", "Meredith Palmer", "Darryl Philbin"];

	for (i = 0; i < buttons.length; i++) { 
		$('#buttons').append("<button class='btn btn-default btn-lg btn-primary'>" + buttons[i] + "</button>");
	    console.log(buttons);
	}

	$("button").click(function() {
		var value = $(this).text();
		var searchPhrase = value.replace(" ", "+");
		var search = $.get(api + searchPhrase + key + limit);
			search.done(function(data) {
				console.log(data);
				for (i = 0; i < data.data.length; i++) {
					$('#display').append("<img src=" + data.data[i].images.fixed_height_still.url + ">");
				}
			});
	});
	$("button").click(function() {
		$('#display').empty();
	});

});




// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { 
// 	console.log("success got data", data); 
// });