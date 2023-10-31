const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const hbs = require('hbs');
const conn = require('./db/conn'); 
// Assuming that 'conn.js' is your database connection file
const User = require('./models/usermsg');
// var bodyParser=require("body-parser");

// Set up static paths
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
const staticPath = path.join(__dirname, '../public');

// Middleware for form data
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.static(staticPath));

// Set up the view engine
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);

// Define routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/weather', (req, res) => {
  res.render('weather');
});

app.get('/contact', (req, res) => {
  res.render('contact');
  // res.send(req.body)
});


app.post('/contact', async (req, res) => {
  // console.log('Received form data:', req.body);
  try {
    const userData = new User(req.body);
    await userData.save();
    // console.log('Data saved successfully:', userData);
    res.status(201).render('index');
    // res.send(req.body)
  } catch (error) {
    console.error('Error saving data:', error); // Log the specific error
    res.status(500).send(error);
  }
});

app.get('*', (req, res) => {
  res.render('error', {
    errorMsg: 'Oops, page not found',
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
