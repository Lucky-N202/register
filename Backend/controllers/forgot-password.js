const nodeMailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db_connect');
const secretKey = process.env.ACCESS_TOKEN_SECRET;

const checkUser = async (req, res) => {
  const { email } = req.body;

  try {
    // look for email in database
    const user = await pool.query(`SELECT * FROM users WHERE email= $1 AND status = true`, [email])
    if(!user.rowCount) {
      return res.status(404).json({ message: "Invalid email or your account might be deactivated." });
    } 
    else{
      // otherwise we need to create a temporary token that expires in 10 mins
      const token = jwt.sign({ user: email.trim() }, 
        secretKey, { expiresIn: '60m' });

        const emailResult = await sendEmail(email, token);

        if(emailResult.Success){
          return res.status(200).json({
              message: `Check your email, please note that it contains a link that will expire in an hour.`
          });
      }else{
          return res.status(502).json({
              message: `Failed to send email containing link to password reset`
          });
      }

    }
  }catch(error) {
    return res.status(500).json({ message: error.message });
    
  }

}

const pwdReset = async (req, res) => {
  // Get the token from params
  const { token } = req.params;
  const { pwd } = req.body;

  if(token) {
    jwt.verify(token, secretKey, async (error, decodedToken) => {
         if(error) {
           return res.status(403).json({ message: 'Incorrect token or expired' })
         }

         const { user } = decodedToken;
         console.log(decodedToken)
         const email = user;

         try {

          const salt = await bcrypt.genSalt();
          const user_password = await bcrypt.hash(pwd.trim(), salt);

          // find user by the temporary token we stored earlier
          const user = await pool.query(`UPDATE users set passwrd = $1 WHERE email = $2 AND passwrd is not null RETURNING *`, [user_password, email]);
          //console.log(user)
          if(user.rowCount){
            return res.status(200).json({ message: 'Password has been successfully updated.' });
          }else{
            return res.status(404).json({ message: 'You must first create a password.' });
          }
            
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
    })
  }
  }

  async function sendEmail(userEmail, token) {

    const emailMsg = `<p>Greetings,</p>
    <p>You have recently requested a password reset.</p>
    <p> Please <a href="${process.env.CLIENT_URL}/reset-password/${token}">click here</a> to reset your password</p>
     <br>
     <b>The Ontime team</b><br>
    Copyright &copy; Ontime All rights reserved.`

    const emailTransporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPWD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail.trim(),
        subject: "Reset password requested",
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
    checkUser,
    pwdReset
  }

