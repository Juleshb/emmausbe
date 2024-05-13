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
    pass: 'rxjl hjlq ejmp htip'
  }
});

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, phone, checkInDate, checkOutDate, roomNumber, category, country, otherRequest } = req.body;

  // Email content
  const mailOptions = {
    from: 'hostelemmaus@gmail.com',
    to: 'hostelemmaus@gmail.com',
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

app.post('/contact', (req, res) => {
  const { names, emails, message } = req.body;

  // Email content
  const mailOptions = {
    from: 'hostelemmaus@gmail.com',
    to: 'hostelemmaus@gmail.com',
    subject: 'Contact us message',
    html: `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${names}</p>
      <p><strong>Email:</strong> ${emails}</p>
      <p><strong>Message:</strong> ${message}</p>
      
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
  to: emails,
  subject: 'Contact form Submission',
  html: `
    <h4>Contact form Submission</h4>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <img src="https://emmaus.vercel.app/static/media/logo.caae3e16f2670b31435d.png" alt="Banner Image" style="width: 100%; max-width: 600px;">
        <h2 style="color: #333333;"> Emmaus Hostel</h2>
        <hr>
        <p>Dear ${names},</p>
        <p>Thank you for reaching out to us! We have received your email and appreciate you taking the time to contact us.</p>
        <p>We are currently reviewing your message and will get back to you as soon as possible. Our team aims to respond within 3h during regular business hours 24/24.</p>
        <p>In the meantime, if you have any urgent concerns or additional information to share, please feel free to reach out to us directly at [your contact information].</p>
        <p>Thank you for your patience and interest in Emmaus Hostel. We look forward to assisting you!</p>
        <br>
        <p>Best regards,</p>
        <p>Habarurema jules<br>Customacare<br>Emmaus Hostel<br>+25089028283</p>
    </div>
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
