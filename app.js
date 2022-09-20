//jshint esversion: 6
const express = require("express")
const bodyparser = require("body-parser")
const request = require("request")
const https = require("https")


const app = express()

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/signup.html")
});

app.post("/", function (request, response) {

    var firstname = request.body.fname;
    var lastname = request.body.lname;
    var email = request.body.ename;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname,
                }

            }
        ]
    };

    var json_data = JSON.stringify(data);

    var url = "https://us9.api.mailchimp.com/3.0/lists/2ba4db1d3c";

    var options = {
        method: "post",
        auth: "bhavesh1:6d3ae4b8230e0a1521cb844931fd9ba3-us9"
    }

    const req = https.request(url, options, function (res) {

        if(response.statusCode === 200 ){
            response.sendFile(__dirname + "/success.html")
        }
        else{
            response.sendFile(__dirname + "/failure.html")
        } 



        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    })
    req.write(json_data);
    req.end();

});

app.listen(process.env.PORT || 3000, function (response) {
    console.log("server is running at port 3000")
});

//api id
//6d3ae4b8230e0a1521cb844931fd9ba3-us9

//list id
//2ba4db1d3c