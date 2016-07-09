
var profile = require("./profile.js"); // Path to profile.js or use profile only.

var users = process.argv.slice(2); // Takes every input after the index 1

users.forEach(profile.get); // Get the profile for each user taken as argument
