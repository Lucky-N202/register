const formiddable = require('formidable');//Helps capture file uploads
const { formValidation } = require('./formDataValidation');//contains data validation functions
const pool = require('../db_connect');//Allows access to database
const fs = require('fs');//file system that allows you to read, create and delete files
const { emailSender } = require('./emailSender');// Function that sends one or more emails

//Function that registers one user
const register_one = async (req, res) => {
    //initialising function that allows us to upload files.
    const form = new formiddable.IncomingForm({ multiples: false });

    //Query returns all employee roles
    const findRoleId = async () => {
        const getRoleId = await pool.query(`SELECT * FROM roles`);
        return getRoleId.rows;;
    }
    
    //Deletes any file that is uploaded because this route is not made for file uploads.
    const deleteUnwantedFile = (filePath) => {
        return fs.unlink(filePath, (err) => {
            if(err) throw err;

            console.log(`${filePath} sucessfully deleted`);
        })
    }
    
    //Function that parses(turns into an object) the data recieved from client especially file uploads
    form.parse(req, async (err, fields, files) => {
        
        //Checks if a file was uploaded, if so then it deletes the file.
        if(Object.keys(files).length){
            const { filepath } = files.file;
            deleteUnwantedFile(filepath);
            return res.status(409).json({
                message: 'file uploads not allowed on this route!'
            })
        }

        const validator = new formValidation();// initialises function that holds validation for input field data
        const { username, surname, email, role } = fields;
        console.log(fields);
        //Returns boolean on whether the input data is empty or not. if empty then its true
        const checkEmpty = !validator.checkEmpty(username) || !validator.checkEmpty(surname) || !validator.checkEmpty(email) || !validator.checkEmpty(role);
        
        //if statement that checks for validation errors.
        if(checkEmpty || !validator.emailValidation(email) || !validator.roleValidation(role)){
           if(checkEmpty){
            return res.status(400).json({
                message: "All fields need to be filled"
            })
           }else if(!validator.emailValidation(email)){
               return res.status(400).json({
                   message: "Invalid email"
               })
           }else if(!validator.roleValidation(role)){
               return res.status(400).json({
                   message: 'Invalid role'
               })
           }
        }else{
            
            try{
                //query that checks if user already exists
                const emailExists = await pool.query(`SELECT * FROM users WHERE email= $1`, [email]);
                
                //if user exists return a error message to the client
                if(emailExists.rowCount){
                    return res.status(409).json({
                        message: 'The email you provided is of a user that has already been registered.'
                    })
                }else{

                    //queries for employees
                    const allRoles = await findRoleId();

                    //Find and return the role id for the employee being register
                    const roleId = allRoles.filter((role) => {
                        return role.user_roles === fields.role;
                    })
                    
                    const { role_id } = roleId[0];// emplyee role_id number

                    //Query that inserts user into the database
                    const newUser = await pool.query(`INSERT INTO users (username, surname, email, role_id) 
                    VALUES($1, $2, $3, $4) RETURNING *`, [username, surname, email, role_id]);
                    
                    //Function that sends an email containing a create password link.
                    const sendEmailResult = await emailSender(email)

                    //If email was sent successfully a success status is sent to client and vice versa
                    
                    if(sendEmailResult.Success){
                        return res.status(200).json({
                            message: `Successful registration`
                        });
                    }else{
                        console.log(process.env.EMAILPWD);
                        return res.status(502).json({
                            message: `Failed to send email containing link to password reset`
                        });
                    }

                }
                
            }catch(err){
                console.log(err)
                //Returns any internal server errors
                res.status(503).json({
                    message: `Internal server error`,
                    error: err
                })
            }
            
        }
    })
}

module.exports = {
    register_one
}