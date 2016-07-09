// Connect to treehouse endpoints to retrieve user information from the JSON

// A note, teamtreehouse have switched all of their URLs from http to https.

var https = require("https"); // Module or object required

function printMsg(username, badgeCount, points){
	var message = username + " has " + badgeCount + " totat badge(s) and " + points + " points in JavaScript";
	console.log(message);
}

function printError(error){
	console.error(error.message); // Error have the message property by default 
}

function get(username){
	// Response is stream of data
	var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){ // Callback function
	//console.log(response.statusCode); // Returns the status code
	var body = ""; // Store the content recieved as response

	response.on("data", function(chunk){ // Display the contents of the endpoint 
		body += chunk;
	});


	response.on("end", function(){ // End of the content
		if(response.statusCode === 200) {
			try {
		
			var profile = JSON.parse(body) // Converts the string content into an object 
			printMsg(username, profile.badges.length, profile.points.JavaScript)
	 		
	 		} catch(error) {
	 			printError(error);
	 		}
	 	} else {
	 		printError({message: "There was an error get the profile for " + username + ". May be the username is not valid, Try again!!" });
	 	}
	});
	});

	// Error Connection
	request.on("error", printError)// Error handler
}

module.exports.get = get; // Get the function 'get' from the current module and export it to js file where it is executed.