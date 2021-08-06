const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const https = require('https');
const client = require("@mailchimp/mailchimp_marketing");

const apiKey = "66efb413a1f68ad6f36f14399a64df33-us5";
const listID = "17c1d939ae";

client.setConfig({
  apiKey: apiKey,
  server: "us5",
});

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, function(){
  console.log("Server started at port" + port);
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  firstName = req.body.firstName;
  lastName = req.body.lastName;
    email = req.body.email;

  var data = {
    members : [{
      email_address: email,
      status: "subscribed",
      merge_fields: [{
        FNAME : firstName,
        LNAME : lastName
      }]
    }]
  };

  var JSONData = JSON.stringify(data);

  const run = async () => {
    const response = await client.lists.batchListMembers(listID, {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: [{
          FNAME : firstName,
          LNAME : lastName
        }]
      }],
    });
    res.send("posted at mailchjimp");
  };

  run();
/*
url = "https://us5.api.mailchimp.com/3.0/lists/" + listID;

const option = {
  method: "post",
  auth:"wolfiez24:" + apiKey
}

const request = https.request(url,option,function(response){
response.on("data",function(){
  console.log(JSON.parse(data));
});
});

request.write(JSONData);
request.end();
*/

});




/* const client = require("mailchimp-marketing");

client.setConfig({
  apiKey: "YOUR_API_KEY",
  server: "YOUR_SERVER_PREFIX",
});

const run = async () => {
  const response = await client.lists.batchListMembers("list_id", {
    members: [{}],
  });
  console.log(response);
};

run();  */
