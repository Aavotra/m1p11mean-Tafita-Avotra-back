const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raharisonavotra02@gmail.com',
        pass: 'uhkb bkfr hhga wqvc'
    }
});

// Fonction pour envoyer un e-mail avec du HTML
const sendEmail = async (to, subject, html) => {
    try {
        // Options de l'email
        const mailOptions = {
            from: 'raharisonavotra02@gmail.com',
            to: to,
            subject: subject,
            html: html // Utilisation de html au lieu de text
        };

        // Envoi de l'email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
};


module.exports = { sendEmail };
