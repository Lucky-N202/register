const { formValidation } = require('./formDataValidation');
const pool = require('../db_connect');
const jwt = require('jsonwebtoken');

//Function that post user scan logs
const postCovidDetails = (req, res) => {
    const { symptomControl, temparature } = req.body;
    const validator = new formValidation();
    const checkEmpty = !validator.checkEmpty(symptomControl) || !validator.checkEmpty(temparature);
    const token = req.cookies.jwt;

    if(checkEmpty || !validator.numVal(temparature) || !validator.sypmtomVal(symptomControl)){
        if(checkEmpty){
            return res.status(400).json({
                message: "All fields need to be filled"
            })
       }else if(!validator.numVal(temparature)){
            return res.status(400).json({
                message: "Only numbers will be accepted"
            })
       }else if(!validator.sypmtomVal(symptomControl)){
            return res.status(400).json({
                message: "Answer for symptoms can only be either yes or no"
            })
       }
    }else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {         
            
            try{
                const { id } = decodedToken;
                const dateToday = (new Date()).toLocaleDateString('en-GB');
                const findScan = await pool.query(`SELECT * FROM scanlogs WHERE
                user_id = $1 AND temperature is NULL AND symptoms is NULL AND 
                TO_CHAR(scanned_at :: DATE, 'dd/mm/yyyy') = $2`, [id, dateToday]);

                if(findScan.rowCount){
                    const { log_id } = findScan.rows[0];
                    
                    const updateScanLogs = await pool.query(`UPDATE scanLogs set temperature = $1, 
                    symptoms = $2 WHERE log_id = $3`, [temparature, symptomControl, log_id]);
                    
                    return res.status(200).json({
                        message: 'Covid details successfully posted'
                    })
                }else{
                    return res.status(404).json({
                        message: `You either you have yet to be scanned or you already scanned 
                        and signed the covid form.`
                    })
                }

            }catch(err){
                console.log(err);
                return res.status(401).json({
                    message: 'Internal server error'
                })
            }

        })
    }
}

const postScanLog = (req, res) => {
    const token = req.cookies.jwt;
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        try{
            const { user_id } = req.params;
            const { id } = decodedToken;
            
            const dateToday = (new Date()).toLocaleDateString('en-GB');
            const findEmployeeScan = await pool.query(`SELECT * FROM scanlogs WHERE
            user_id = $1 AND TO_CHAR(scanned_at :: DATE, 'dd/mm/yyyy') = $2`, [user_id, dateToday]);
            const findHelpDesk = await pool.query(`SELECT * FROM users WHERE user_id=$1`, [id]);

            if(!findEmployeeScan.rowCount){
                const { username } = findHelpDesk.rows[0];
                const insertScanLogs = await pool.query(`INSERT INTO scanLogs 
                (user_id, scanned_by) VALUES($1, $2)`,
                [user_id, username]);

                return res.status(200).json({
                    message: 'Succesfully scanned.'
                })
            }else{
                return res.status(404).json({
                    message: 'User has already been scanned.'
                })
            }

        }catch(err){
            console.log(err);
            return res.status(401).json({
                message: 'Internal server error'
            })
        }

    })
}

const checkIfScanned = (req, res) => {
    const token = req.cookies.jwt;
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
       
        try{

            const { id } = decodedToken;
            
            const dateToday = (new Date()).toLocaleDateString('en-GB');
            const findScan = await pool.query(`SELECT * FROM scanlogs WHERE
            user_id = $1 AND TO_CHAR(scanned_at :: DATE, 'dd/mm/yyyy') = $2`, [id, dateToday]);

            if(findScan.rowCount){
                return res.status(406).json({
                    message: `You have already been scanned for the day.`
                })
            }else{
                return res.status(200).json({
                    message: `Please show the QR code to the help desk for scanning.`
                })
            }

        }catch(err){
            console.log(err);
            return res.status(401).json({
                message: 'Internal server error'
            })
        }
    })
}

const checkIfSignedForm = (req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {

        try{
            const { id } = decodedToken;
            const dateToday = (new Date()).toLocaleDateString('en-GB');
            const findScan = await pool.query(`SELECT * FROM scanlogs WHERE
            user_id = $1 AND temperature is NOT NULL AND symptoms is NOT NULL AND 
            TO_CHAR(scanned_at :: DATE, 'dd/mm/yyyy') = $2`, [id, dateToday]);

            if(findScan.rowCount){
                return res.status(406).json({
                    message: `You have already signed the covid form.`
                })
            }else{
                return res.status(200).json({
                    message: `Please sign the covid form.`
                })
            }


        }catch(err){
            console.log(err);
            return res.status(401).json({
                message: 'Internal server error'
            })
        }

    })
}

//Queries for all the employees scan logs
const getAllScanLogs = async (req, res) => {
    const {startDate, endDate} =req.body

    try{

        const getAllScanLogs = await pool.query(`Select users.username, users.surname, users.email, scanlogs.temperature,scanlogs.symptoms, scanlogs.scanned_at
        from users,scanlogs
        where users.user_id = scanLogs.user_id`);
        console.log(getAllScanLogs.rows);

        return res.status(200).json(getAllScanLogs.rows);

    }catch(err){
        console.log(err)
        return res.status(503).json({
            message: `Internal server error`,
            error:err
        })
    }

}

const getAllScanLogsFiltered = async (req, res) => {
    const {startDate, endDate} = req.body;

    try{

        const getAllScanLogs = await pool.query(`Select users.username, users.surname, users.email, scanlogs.temperature, scanlogs.scanned_at
        from users,scanlogs
        where users.user_id = scanLogs.user_id
        and scanned_at BETWEEN $1 AND $2`, [startDate,endDate]);
        console.log(getAllScanLogs.rows);

        return res.status(200).json(getAllScanLogs.rows);

    }catch(err){
        console.log(err)
        return res.status(503).json({
            message: `Internal server error`,
            error:err
        })
    }

}

module.exports = {
    postCovidDetails,
    checkIfScanned,
    postScanLog,
    checkIfSignedForm,
    getAllScanLogs,
    getAllScanLogsFiltered
}