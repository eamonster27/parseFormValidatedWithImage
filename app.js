const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const app = express();

app.engine('mustache', mustacheExpress() )

app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.listen(3000, function(){
  console.log("Server connected!");
});

app.get('/form', function(request, response){
  response.render('form', {pageTitle: "Home page"});

})

app.post('/thankyou', function(request, response){

  request.checkBody("name", "You must enter a name!").notEmpty();
  request.checkBody("name", "100 characters max.").isLength({min:0, max: 100});

  request.checkBody("email", "You must enter a email! 100 characters max.").notEmpty();
  request.checkBody("email", "100 characters max.").isLength({min: 0, max: 100});

  request.checkBody("birthYear", "Must be after 1899.").isAfter("1899");
  request.checkBody("birthYear", "Must be before 2017.").isBefore("2017");

  request.checkBody("position", "You must enter a position!").notEmpty();

  request.checkBody("password", "You must enter a password!").notEmpty();
  request.checkBody("password", "Password must be at least 8 characters long.").isLength({min:8, max:30});

  var errors = request.validationErrors();

  if(errors){
    var html = errors;
    response.send(html);
  }
  else {
    response.render("thankyou", {
      name: request.body.name,
      email: request.body.email,
      birthYear: request.body.birthYear,
      position: request.body.position,
      password: request.body.password
    });

  }
});
