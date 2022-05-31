/* Jwt creates data thats encrypted in the form of 
tokens that are created with a private/public key*/
const jwt = require('jsonwebtoken');
const pool = require('../db_connect');//This holds access to the psql database

//Function that gets data of user that is logged in
const getLoggedInUser = (req, res) => {
    const token = req.cookies.jwt;
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        if(err){
          return res.status(400).json({
                message: 'User not logged in'
            })
        }

        const { id } = decodedToken
        
        try{
            const findUser = await pool.query('SELECT * FROM users Where user_id = $1',[id]);
            const findRole = (roleId) => {
                if(roleId === 1){
                    return 'admin';
                }else if(roleId === 2){
                    return 'employee';
                }else{
                    return 'help_desk';
                }
            }
            
            if(findUser.rowCount){
                return res.status(200).json({
                    user_id: findUser.rows[0].user_id,
                    username: findUser.rows[0].username,
                    surname: findUser.rows[0].surname,
                    email: findUser.rows[0].email,
                    image: findUser.rows[0].images,
                    role: findRole(findUser.rows[0].role_id)
                })
            }else{
                res.status(404).json({
                    message: 'User cannot be found on system.'
                })
            }

        }catch(err){
            console.log(err)
            res.status(503).json({
                message: `Internal server error`,
                error:err
            })
        }

    })
}

//Gets a specific user by finding that user_id via a query
const getUserById = async (req, res) => {
    const { id } = req.params;

    try{
        const getUserProfile = await pool.query('select * from users where user_id=$1',[id]);

        if(getUserProfile.rowCount){
            const { username, surname, email, images, user_id } = getUserProfile.rows[0];
            const user = { user_id, username, surname, email, image:images };

            return res.status(200).json(user);
        }else{
            res.status(404).json({
                message: `User cannot be found on system.`
            })
        }
 
        
    }catch(err){
        console.log(err)
        res.status(503).json({
            message: `Internal server error`,
            error:err
        })
    }
}

//Queries for all employees that arent admins;
const getAllEmployees = async (req, res) => {
    try{

        const users = await pool.query('SELECT user_id,role_id,username,surname,email,status,created_at FROM users WHERE NOT role_id=1');
        
        res.status(200).json(users.rows);

    }catch(err){
        console.log(err)
        res.status(503).json({
            message: `Internal server error`,
            error:err
        })
    }
}

module.exports = {
    getLoggedInUser,
    getUserById,
    getAllEmployees
}