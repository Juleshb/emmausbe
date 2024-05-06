// app.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4700;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  const { name, email, phone, checkInDate, checkOutDate } = req.body;

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
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
