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

    await mailer.sendEmail(email, userSubject, userText);
    await mailer.sendEmail(
      process.env.NODEMAILER_USER,
      adminSubject,
      adminText
    );

    res
      .status(201)
      .json({ message: 'Contact message saved, emails sent successfully' });
  } catch (err) {
    console.error('Error in contact form:', err);
    res
      .status(500)
      .json({ message: 'Something went wrong, please try again later.' });
  }
};

module.exports = { createContact };
