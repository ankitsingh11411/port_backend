const Contact = require('../models/Contact');
const mailer = require('../utils/mailer');

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();

    const userSubject = 'Thank you for contacting me!';
    const userText =
      'I will respond to your message at my earliest convenience.';

    const adminSubject = `New message from ${name}`;
    const adminText = `  
      Name: ${name}  
      Email: ${email}  
      Message: ${message}  
    `;

    await mailer.sendEmail(email, userSubject, userText).catch((error) => {
      console.error('Failed to send user email:', error);
      throw new Error('User email failed');
    });

    await mailer
      .sendEmail(process.env.NODEMAILER_USER, adminSubject, adminText)
      .catch((error) => {
        console.error('Failed to send admin email:', error);
        throw new Error('Admin email failed');
      });

    res
      .status(201)
      .json({ message: 'Contact message saved, emails sent successfully' });
  } catch (err) {
    console.error('Error in contact form:', err.message);
    res.status(500).json({ message: `Email error: ${err.message}` });
  }
};

module.exports = { createContact };
