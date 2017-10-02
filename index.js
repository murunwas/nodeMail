var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors')
var app = express();
var port = process.env.PORT || 4300;




var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webcengy@gmail.com',
    pass: 'demo1221'
  }
});

//Use
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())



app.get('/hello', function(req, res){
   res.send("Hello World!");
});

app.post('/mail', function(req, res){

  var mailOptions = {
    from: req.body.from,
    to:   req.body.to,
    subject: req.body.subject,
    text: req.body.message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);

      res.json({status: false, message: error});
    } else {
      console.log('Email sent: ' + info.response);
      res.json({status: true, message: info.response});
    }
  });
   
});

app.listen(port);