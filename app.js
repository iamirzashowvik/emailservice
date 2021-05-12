const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const { url } = require("inspector");
const app = express();

const port = process.env.port || 3000;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile("signup.html", { root: __dirname });
});
//8ecb5966147982bec35740307fcda33e-us1
app.post("/", function (req, res) {
  console.log(req.body);
  var x = req.body.num1;
  var xy = req.body.num2;
  var xz = req.body.num3;
  console.log(xy);
  var data = {
    members: [
      {
        email_address: xz,
        status: "subscribed",
        merge_fields: {
          FNAME: x,
          LNAME: xy,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/lists/e0a6031fee";
  const options = {
    method: "POST",
    auth: "mirza:8ecb5966147982bec35740307fcda33e-us1",
  };
  const request = https.request(url, options, function (response) {

    if(response.statusCode===200){
      res.send("Successfully subscribed")

    }
    else{
      res.send('Failed')
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
  // res.sendFile("success.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
