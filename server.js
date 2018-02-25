const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// This port needed for heroku
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {

  var now = new Date().toString();
  var log = `${now}: ${req.method}, ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('Unable to write');
  });

  next(); // If not called, other functions won't work

});

// app.use((req, res, next) => {
//
//   res.render('maintenance.hbs');
//
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase(text));

// Http get request
app.get('/', (request, response) => {

  // Show string
  // res.send('<h1>Hello express!</h1>');

  // Show json
  // response.send({
  //   name: 'Burak',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });

  // Show hbs
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessageProperty: 'Welcome user'
  });

});


app.get('/about', (request, response) => {
  // response.send('About Page');
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// app.get('/bad', (request, response) => {
//   response.send({
//     erorrMessage: 'Unable to find the page'
//   });
// });

// Second function is optional. Runs when server is up
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
