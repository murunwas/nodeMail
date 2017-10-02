var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors')
var app = express();
var port = process.env.PORT || 4300;
var pass = process.env.pass;
var user = "webcengy@gmail.com"




var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: user, pass: pass }
});

//Use
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())


app.get('/', function (req, res) {
  res.send("Hello Cengy!");
});

app.get('/hello', function (req, res) {
  res.send("Hello World!");
});

app.post('/mail', function (req, res) {

  var mailOptions = {
    from: '"Our Diary" <' + req.body.from + '>',
    to: req.body.to,
    subject: req.body.subject,
    html:
    `<div style="width:100%; padding: 6px;text-align: center">
    <label style="color: #B4886B;
    font-weight: bold;
    display: block;">${req.body.from} sent a diary</label>
    <hr>
    <p>${req.body.message}</p>
 
    <a href="https://shudie.murunwa.ga/" style="    background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;width: 100%;">click to view</a>
    </div>
    
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ status: false, message: error, data: mailOptions });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ status: true, message: info.response });
    }
  });

});

app.post('/web', function (req, res) {
  
    var mailOptions = {
      from: '"'+req.body.subject+'" <' + req.body.from + '>',
      to: "sengani@murunwa.ga",
      subject: req.body.subject+" sent message from website",
      html:
      `<div style="width:100%; padding: 6px;text-align: center">
      <label style="color: #B4886B;
      font-weight: bold;
      display: block;">${req.body.message} sent a diary</label>
      </div>
      
      `
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({ status: false, message: error, data: mailOptions });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ status: true, message: info.response });
      }
    });
  
  });

app.listen(port, function () {
  console.log('Our app is running on Port: ' + port);
});