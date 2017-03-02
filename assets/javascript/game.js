window.onload = function() {
	
	// Default buttons listed to user
	var topics = ["dogs","cats","birds","batman","yelling","smile","computer","dachshund","movies","ocean","waves","wind","star wars","dancing","pigs"];

	// Creating variable for number of gifs to be displayed
	var gifCount;

	// Creates buttons
	function renderButtons(){

		// Clears div so it wont rewrite buttons when adding new ones
		$("#gifs-view").empty();

		// Creats buttons and attr's for each element in "topics", writes them to "gifs-view" div
		for (var i=0;i<topics.length;i++){

			var btn = $("<button>");

			btn.attr("id", topics[i]);
			btn.attr("class", "gifButton btn btn-primary");
			btn.attr("style", "margin:3px");
			btn.val(topics[i]);
			btn.text(topics[i]);

			$("#gifs-view").append(btn);
    	}
	};

	// button action that displays the gifs from giphy
	$(document).on("click", ".gifButton", function(){

		// clears gif div so only the intended gifs are displayed
		$("#jsonHolder").empty();

		// grabbing button value
		var type = $(this).val();

		// getting option value from user to set number of gifs to be displayed
		var gifNum = document.getElementById( "gif-number" );
		gifCount = gifNum.options[ gifNum.selectedIndex ].value; 

		// randomized gif pull of button value????????
		// var queryURL = "http://api.giphy.com/v1/gifs/random?rating=&api_key=dc6zaTOxFJmzC&tag="+type;

		// build giphy queryURL based on btn value and # of gifs desired
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+type+"&limit="+gifCount+"&api_key=dc6zaTOxFJmzC"

		// use ajax to pull data from giphy API
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){

			// use for loop to cycle through each returned object(gif) based on gifCount
			for (var i=0;i<gifCount;i++) {

				// get and store still gif url
				var gifStillUrl = response.data[i].images.fixed_height_small_still.url;
				
				// get and store animated gif url
				var gifAnimateUrl = response.data[i].images.fixed_width_downsampled.url;

				// get and store gif rating
				var rating = response.data[i].rating;

				// create image tag and p tag for gif and rating
				var gifImage = $("<img>");
				var gifRating = $("<p>");

				// setting default, still, animated, state, and class attr's for gif
		        gifImage.attr("src", gifStillUrl);
		        gifImage.attr("data-still", gifStillUrl);
		        gifImage.attr("data-animate", gifAnimateUrl);
		        gifImage.attr("data-state", "still");
		        gifImage.attr("class", "gif");
		        gifImage.attr("alt", "gif");

		        // setting text for rating display
		        gifRating.text("Rating: "+rating);

		        // prepending both to div
		        $("#jsonHolder").prepend(gifRating, gifImage);
	    	}

		})

	});

	// click "submit" for adding new buttons
	$(document).on("click", "#add-gif", function(){

		// prevents default action
		event.preventDefault();

		// grab value from input box, store in variable
		var newGif = $("#gif-input").val();

		// push variable to "topics" list
		topics.push(newGif);

		// create newly updated list of buttons
		renderButtons();

	});

	// click action for animating and deanimating gifs upon click
	$(document).on("click", ".gif", function(){

		// prevents default action
		event.preventDefault();

		// grabs the "state" attr from clicked gif
		var state = $(this).attr("data-state");

		// checks if state is still
		if (state == "still") {

			// grabs animated src, stores in variable
			var animateData = $(this).attr("data-animate");
			// changes "data-state" to animate
			$(this).attr("data-state", "animate");
			// sets src to animated gif URL
			$(this).attr("src", animateData);

		}

		// checks if state is animated
		if (state == "animate") {

			// grabs still src, stores in variable
			var stillData = $(this).attr("data-still");
			// changes "data-state" to still
			$(this).attr("data-state", "still");
			// sets src to still gif URL
			$(this).attr("src", stillData);

		}

	});

	// inital button creation of default "topics" list
	renderButtons();

};