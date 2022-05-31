const bcrypt = require('bcryptjs');
const { formValidation } = require('./formDataValidation');
const pool = require('../db_connect');

//Function that creates user password using that input field data sent from client.
const createPwd = async (req, res) => {
    const validator = new formValidation();
    const { email, pwd } = req.body;
    const checkEmpty = !validator.checkEmpty(email) || !validator.checkEmpty(pwd);
    
    if(checkEmpty || !validator.pwdValidation(pwd)){

        if(checkEmpty){
                return res.status(400).json({
                    message: "All fields need to be filled"
                })
           }else if(!validator.pwdValidation(pwd)){
                return res.status(400).json({
                    message: "Password must be atleast 6 or more characters"
                })
           }

    }else{

        try{
            const userExists = await pool.query('SELECT * FROM users WHERE email = $1 AND passwrd is NULL', [email.trim()]); 
            
            if(userExists.rowCount){

                const salt = await bcrypt.genSalt();
				const user_password = await bcrypt.hash(pwd.trim(), salt);
                
                const updateUserPwd = await pool.query(`UPDATE users SET passwrd = $1, updated_at = $2 WHERE email = $3 RETURNING *`, [user_password.trim(), new Date(), email.trim()]);

                res.status(200).json({
                    message: 'Your password was successfully created'
                });

            }else{
                res.status(400).json({
                    message: `You have either entered an invalid combination or the email you provided already has a password. 
                    If so please reset your password on the forgot password page.`
                })
            }

        }catch(err){
            console.log(err)
            res.status(503).json({
                message: `Internal server error`,
                error: err
            })
        }

    }

}

module.exports = {
    createPwd
}