const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 4700;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer().none()); // Parse multipart/form-data

// Log the request body
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hostelemmaus@gmail.com',
    pass: 'pdhn tsxj ntxn jejm'
  }
});

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, phone, checkInDate, checkOutDate, roomNumber, category, country, otherRequest } = req.body;

  // Email content
  const mailOptions = {
    from: 'hostelemmaus@gmail.com',
    to: 'habaruremajules@gmail.com',
    subject: 'New Booking',
    html: `
      <h2>New Booking Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Check-in Date:</strong> ${checkInDate}</p>
      <p><strong>Check-out Date:</strong> ${checkOutDate}</p>
      <p><strong>No of Rooms:</strong> ${roomNumber}</p>
      <p><strong>Room Category:</strong> ${category}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Other Request:</strong> ${otherRequest}</p>
    `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
      res.status(500).send('Error occurred, form submission failed.');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Form submitted successfully.');
    }
  });

 // Email content
 const mailOptions2 = {
  from: 'hostelemmaus@gmail.com',
  to: email,
  subject: 'Your reservation has well received',
  html: `
    <p>Your reservation has well received. We will get back to you soon for confirming your reservation. Thanks for booking with us!</p>
    <h4>Booking  Submission</h4>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Check-in Date:</strong> ${checkInDate}</p>
    <p><strong>Check-out Date:</strong> ${checkOutDate}</p>
    <p><strong>No of Rooms:</strong> ${roomNumber}</p>
    <p><strong>Room Category:</strong> ${category}</p>
    <p><strong>Country:</strong> ${country}</p>
    <p><strong>Other Request:</strong> ${otherRequest}</p>
  `
};

// Send email
transporter.sendMail(mailOptions2, (error, info) => {
  if (error) {
    console.log('Error occurred:', error);
    res.status(500).send('Error occurred, form submission failed.');
  } else {
    console.log('Email sent:', info.response);
    res.status(200).send('Form submitted successfully.');
  }
});


});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
