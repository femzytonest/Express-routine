const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Custom middleware to check working hours
function checkWorkingHours(req, res, next) {
  const currentDate = new Date();
  const day = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = currentDate.getHours(); // 0-23

  // Check if it's Monday-Friday between 9 AM to 5 PM
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // It's working hours, continue
  } else {
    res.status(403).send('The application is only available during working hours (Mon-Fri, 9AM-5PM).');
  }
}

// Apply the middleware globally
app.use(checkWorkingHours);

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Use a template engine (EJS in this case)
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// Our Services route
app.get('/our-services', (req, res) => {
  res.render('our-services');
});

// Contact Us route
app.get('/contact-us', (req, res) => {
  res.render('contact-us');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
