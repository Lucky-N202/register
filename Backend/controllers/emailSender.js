const nodeMailer = require('nodemailer');// Helps send emails via server

//Function that sends one or more emails
const emailSender = async (userEmail) => {
    
    const isArray = Array.isArray(userEmail);
    const emailMsg = `<h1>Greetings</h1>
    <p>You have been successfully registered</p>
    <p>In order to login to your account you need to create a password.</p>
    <p>Please <a href="${process.env.CLIENT_URL}/create-password">click here</a> to create a password for your account.</p>
    <b>The Ontime team</b><br>
	Copyright &copy; Ontime All rights reserved.`;

    if(isArray){
        userEmail = userEmail.toString();   
    }

    const emailTransporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPWD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail.trim(),
        subject: 'Successful Registration',
        html: emailMsg
    }
    
    try{
        const mailTranspoter = await emailTransporter.sendMail(mailOptions);
        return { Success: mailTranspoter };
        
    }catch(err){
        return { error: err };
    }

}

module.exports = {
    emailSender
}