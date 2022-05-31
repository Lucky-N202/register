const formiddable = require('formidable');
const csv = require('csv-parser');
const path = require('path');
const { formValidation } = require('./formDataValidation');
const pool = require('../db_connect');
const fs = require('fs').promises;
const createReadStream = require('fs').createReadStream;
const { emailSender } = require('./emailSender');
const format = require('pg-format');

const register_many = (req, res) => {
    const form = new formiddable.IncomingForm({ multiples: false });

    const table = [];
    const userTable = [];
    const allUsersEmails = [];
    let error;

    const findRoleId = async () => {
        const getRoleId = await pool.query(`SELECT * FROM roles`);
        return getRoleId.rows;;
    }

    const getAllEmails = async () => {
        const getEmail = await pool.query(`SELECT email FROM users`);
        return getEmail.rows;
    }
    
    const register_bulk = async (oldPath, newFilePath) => {

        const fileData = await fs.readFile(oldPath, 'utf8');
        
        const createNewFile = await fs.writeFile(newFilePath, fileData);
        
        const deleteFile = await fs.unlink(oldPath);

        createReadStream(newFilePath).pipe(csv()).on('data', (row) => {
            
            let { Username,Surname, Email, Role} = row;
            
            const validator = new formValidation();
            const checkEmpty = !validator.checkEmpty(Username) || !validator.checkEmpty(Surname) || !validator.checkEmpty(Email) || !validator.checkEmpty(Role);

            if(checkEmpty || !validator.emailValidation(Email) || !validator.roleValidation(Role)){
                if(checkEmpty){

                    error = "All fields need to be filled"
                    return error;
                }else if(!validator.emailValidation(Email)){
                    
                    error = "Invalid email";
                    return error;
                }else if(!validator.roleValidation(Role)){

                    error = 'Invalid role';
                    return error;
                }
            }else{
                table.push(row);
            }

        }).on('close', async () => {
            
            if(!error){
                
                try{
                    const userEmails = await getAllEmails();
                    let emailExists;

                    table.map((row) => {
                        let { Email } = row;
                        
                        userEmails.map((email) => {
                            if(email.email === Email.trim()){
                                emailExists = true;
                            }
                        })
                    })

                    if(emailExists){
                        await fs.unlink(newFilePath);
                        return res.status(409).json({
                            message: `One or more of the email addresses within the file you provided
                            have already been registered`
                        })
                    }else{

                        const roles = await findRoleId();
                        table.map((row) => {
                            let { Role } = row;
                            
                            roles.map((role) => {
                                if(role.user_roles === Role.trim()){
                                    row.Role = role.role_id;
                                    row.Username = row.Username.trim();
                                    row.Email = row.Email.trim();
                                    row.Surname = row.Surname.trim();
                                    const rowData = Object.values(row);
                                    allUsersEmails.push(row.Email);
                                    userTable.push(rowData);
                                }
                            })
                        })

                        pool.query(format('INSERT INTO users( username, surname, email, role_id ) VALUES %L RETURNING *', userTable), [], async (err, result) => {
                            if (err) {
                                await fs.unlink(newFilePath);
                                return res.status(503).json({
                                    message: `Internal server error`,
                                    error: err
                                })
                            } else {
                                const sendEmailResult = await emailSender(allUsersEmails);
                                await fs.unlink(newFilePath);

                                if(sendEmailResult.Success){
                                    return res.status(200).json({
                                        message: `Successful registration`,
                                    })
                                }else{
                                    return res.status(502).json({
                                        message: `Create password email failed to send to one or more users`
                                    })
                                }
                            }
                        })
                    }

                }catch(err){
                    console.log(err)
                    await fs.unlink(newFilePath);
                    return res.status(503).json({
                        message: `Internal server error`,
                        error: err
                    })
                }

            }else{
                await fs.unlink(newFilePath);
                return res.status(400).json({
                    message: error
                })
            }
            
        })
    }

    form.parse(req, async (err, fields, files) => {
        
        if(Object.keys(fields).length){
            return res.status(409).json({
                message: 'You only allowed to submit files to this route!'
            });
        }else{
            
            if(!Object.keys(files).length){
                return res.status(400).json({
                    message: "You must submit a file!"
                })
            }else{

                const { filepath, mimetype, originalFilename } = files.file;
                if(mimetype !== 'text/csv'){
                    await fs.unlink(filepath);

                    return res.status(415).json({
                        message: "Only csv files are permitted"
                    })
                }else{

                    const oldPath = filepath;
                    const newFilePath = path.join(__dirname, '../', 'csv-files', originalFilename);
                    
                    return register_bulk(oldPath, newFilePath);

                }
            }
        }
    })
}

module.exports = {
    register_many
}