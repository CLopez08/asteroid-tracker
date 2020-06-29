const express = require("express");
const app = express();
const request = require("request");
const getToday = require("./public/space.js");
const isHaz = require("./public/isHaz.js");


app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
	var apodurl = "https://api.nasa.gov/planetary/apod?api_key=NzNdjBjYaNqGDhn6R9q8sIGz3ocmtlI5BJeF7cyO"
	var today = getToday();
	var asteroids = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+today+"&end_date="+today+"&api_key=NzNdjBjYaNqGDhn6R9q8sIGz3ocmtlI5BJeF7cyO"

	request(apodurl, function(error, response, body){
		if(!error && response.statusCode == 200){
			var apodData = JSON.parse(body);

			request(asteroids, (err, response, body) =>{
				if(!err && response.statusCode == 200){
					var asteroidData = JSON.parse(body);

					res.render("home", {apodData: apodData, asteroidData: asteroidData, today: today, isHaz: isHaz});
				}

			})
			
		} else {
			console.log(error);
		}
	});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
	console.log("Server is listening on port 3000");
})