require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin:"https://potential-space-meme-pjrv9pp4r6wqh975v-3000.app.github.dev"
}));
app.use(express.json());

// POST Route to handle email submission
app.post('/api/contact', async (req, res)=>{
    const {fullName, email, phone, message} = req.body;

    // Configure transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your app password
        },
    });

    // Email content
    const mailOptions ={
        from: process.env.EMAIL_USER,
        to: email, // Receiver's email
        subject: `Contact Form Submission from ${fullName}`,  // Fixed the template string
        text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,  // Fixed the template string
    };

    try{
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result); // Log success in the terminal
        res.status(200).json({message: 'Email sent successfully', result});
    }catch (error){
        console.error('Error sending email:', error); // Log error in the terminal
        res.status(500).json({error: 'Failed to send email'});
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));  // Fixed template string
