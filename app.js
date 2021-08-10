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
  const firstName = req.body.firstName;
const lastName = req.body.lastName;
  const email = req.body.email;

  var data = {
    members : [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME : firstName,
        LNAME : lastName
      }
    }]
  };

  var JSONData = JSON.stringify(data);

  const api = process.env.API;

  const options = {

    url: "https://us20.api.mailchimp.com/3.0/lists/" + listID,
    method: 'POST',
    auth:"wolfiez24:" + apiKey,
    headers: {
        'Authorization': "wolfiez24:" + apiKey,
        'auth' :"wolfiez24:" + apiKey
    },
    body: JSONData
};
    request(options, function(error, response, body){
        if (error){
          
            res.sendFile(__dirname + '/failure.html');
        } else {
          console.log(response.statusCode);
            if (response.statusCode === 200) {
                res.sendFile(__dirname + '/success.html');
            } else {
                res.sendFile(__dirname + '/failure.html');
            }
        }
    })


/*
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

  */

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

app.post('/failure', function(req, res){
    res.redirect('/');
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
