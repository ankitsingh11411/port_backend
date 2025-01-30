const Contact = require('../models/Contact');
const mailer = require('../utils/mailer');

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();

    const userSubject = 'Thank you for contacting me!';
    const userText =
      'I will respond to your message at my earliest convenience.';
    mailer.sendEmail(email, userSubject, userText);

    const adminSubject = `New message from ${name}`;
    const adminText = `  
      Name: ${name}  
      Email: ${email}  
      Message: ${message}  
    `;
    mailer.sendEmail('your-email@example.com', adminSubject, adminText);

    res.status(201).json({ message: 'Contact message saved' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
