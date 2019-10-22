var express = require('express');
var bodyParser = require('body-parser');
// var helmet = require('helmet');
// var secure = require('express-secure-only');
var cors = require('cors');
const sgMail = require('@sendgrid/mail');

var request = require('request');
const options = {  
    url: 'ABCD'
}

// express server
var app = express();
//app.enable('trust proxy');
app.use(cors());


// // security features enabled in production
// if (app.get('env') === "production") {
//     // redirects http to https
//     app.use(secure());

//     // helmet with defaults
//     app.use(helmet());
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



require('./config');


app.post('/mail',(req,res)=>{
    var TO = req.body.to;
  
    var SUBJECT = req.body.subject;
    var MSG = req.body.message;
    sgMail.setApiKey(global_config.apikey);
 const internalMsg = {
         to: TO,
         from:"noreply@reply.com",
         subject: SUBJECT,
         html: MSG,
};
  sgMail.send(internalMsg,(err,data)=>{
                     if(err){
                       res.send({"Error":err.msg,"status":"failed"});
                     }
                     res.send({
                         "email_to":TO,
                         "email_from":"noreply@reply.com",
                         "subject":SUBJECT,
                         "status_code":data[0].statusCode,
                         "status":"success"
                    })
                   })

})
app.get('/arpit',(req,response)=>{
     // var result = [];
    request('https://jsonplaceholder.typicode.com/todos/1', function(err, res, body) {  
       // result.push(JSON.parse(body));
       console.log(body);
        response.json(body);
        });
     
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    err.msg = 'Page Not Found';  
    res.status(err.status).send(err);
});

//Listening Port
var port = process.env.PORT || 4000;
app.listen(port,()=>{console.log(`port ${port} is connected to server`)});