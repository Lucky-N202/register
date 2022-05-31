const multer = require('multer');
const fs = require('fs');
const {cloudinary} = require('../cloudinary/cloudinary');

//Used to encrypt and compare encrypted data
const bcrypt = require('bcrypt');
/* Jwt creates data thats encrypted in the form of 
tokens that are created with a private/public key*/
const jwt = require('jsonwebtoken');

//Holds all the functions that validate data.
const { formValidation } = require('./formDataValidation');

//This holds access to the psql database
const pool = require('../db_connect');
const { request } = require('http');

/*This is the calculation of the expiry date 
that will be used in the calculation of the jwt token*/
const maxAge = 1 * 24 * 60 * 60;

/* Function that creates the jwt token, which will be used to hold infomation of
the user that is logged in and help the server track who that user is that is logged in.
The function takes in 2 parameters, one that will hold the user_id of the logged in user and 
the other which will hold the role of the user that has been logged in. Jwt.sign helps create the
token by giving it a private key and assiging an expiration date to it*/
const createToken = (id, role=null) => {
   return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
       'expiresIn': maxAge
   });
}

//Function that will log in a user
const login = async (req, res) => {
    const { email, pwd } = req.body;// Input field data recieved from frontend
    const validator = new formValidation();/* initialising class that contains validation for 
    different type of data and the new key word allows access to those functions*/
    
    /*Contains the returned value from the functions that validate whether an 
    input is empty or not, returns false for empty and the input if its not*/
    const checkEmpty = !validator.checkEmpty(email) || !validator.checkEmpty(pwd);
    
    //This if statement checks of the data is empty if so it returns a status 400 error to the client
    if(checkEmpty){
        return res.status(400).json({
            message: 'You are required to fill all fields!'
        })
    }else{
        
        try{
            //Query that searchs for user by email
            const findUser = await pool.query(`SELECT * FROM users WHERE email= $1 AND status = true`, [email]);

            //console.log(findUser)
            if(findUser.rows[0]){
                const { user_id, role_id } = findUser.rows[0];
                const auth = await bcrypt.compare(pwd, findUser.rows[0].passwrd);/*checks if password sent from
                client matches the one in the database. Returns true if there is a match and false if not*/
                
                /*If there is a match, create a jwt for user and sends the token to client in the form of a cookie and return a success status to the client. 
                if the isnt a match that would mean incorrect data has 
                been submitted and a error status gets sent to client*/
                if(auth){
                    const token = createToken(user_id, role_id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    //sconsole.log(token)
                    res.status(200).json({
                        message: 'You have successfully logged in',
                        role: role_id
                    })
                    
                }else{
                    res.status(403).json({
                        message: 'Inavlid login attempt for invalid combination or your account might be deactivated'
                    })
                }
            }else{
                res.status(403).json({
                    message: 'Inavlid login attempt for invalid combination or your account might be deactivated'
                })
            }
        }catch(err){
            //any internal server errors are captured by this catch handler and sends them to client
            console.log(err)
            res.status(503).json({
                message: `Internal server error`,
                error:err
            })
        }

    }
}

//Logs out a user by deleting the cookie that held the token used to logged them in.
const logOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    
    res.status(200).json({
        message: 'You have been logged out'
    })
}
    //  Updating employee profile Queries
const UpdateProfile = async (req, res) => {
    const {username,surname, email} =req.body;
    console.log(req.body)
    const validator = new formValidation();
    const {user_id} = req.params;
    const checkEmpty = !validator.checkEmpty(username) || !validator.checkEmpty(surname) || !validator.checkEmpty(email);
    const isEmailValid = !validator.emailValidation(email);

    try{

        if(checkEmpty || isEmailValid){
            if(isEmailValid)
            {
                return res.status(401).json({ 
                    message:'Email is not valid'
                });
            }else{
                return res.status(401).json({ 
                    message:'Fields must not be empty'
                });
            }
         }

        const UpdateUserProfile = await pool.query(`update users set username = $1, surname = $2, email = $3
        where user_id = $4 RETURNING *`, [username,surname, email, user_id]);
        console.log(UpdateUserProfile.rows);

        res.status(200).json(UpdateUserProfile.rows);

    }catch(err){
        console.log(err)
        res.status(503).json({
            message: `Internal server error`,
            error:err
        })
    }
    
}

// upload image to cloudinay and sending the image url to the database
const uploadProfilePicture = async(req,res) =>{
    const images = req.file
    const id =parseInt(req.params.id);
    console.log(id);
    console.log(images);
    try{

        if(!images){
            return res.status(200).json({ message: 'no file added'})
        }
    
        const fileStr = req.file.path
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'images',
            resource_type: 'image'
        })
        const filePath = req.file.path
        fs.unlinkSync(filePath)
        imageUrl = uploadResponse.url;
        console.log(imageUrl);
        console.log(id)
    
        pool.query('update users set images = $1, updated_at = NOW() where user_id = $2 RETURNING *', [imageUrl, id], 
        (error,results)=> {
            if(error)
            {
                res.status(500).json(error)
            }
            //console.log(results)
           res.status(200).json(results.rows)
        })
    } catch(err)
    {
        console.error(err);
        res.status(500).json({err:'something went wrong'})
    }
}


//Makes functions available for use by other files.
module.exports = {
    login,
    logOut,
    UpdateProfile,
    uploadProfilePicture
}