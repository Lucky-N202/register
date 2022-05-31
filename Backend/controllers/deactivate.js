const pool = require('../db_connect');
 
const deactivate = async (req, res) => {
    const { id } = req.params;

    try{
        const deletedUser = await pool.query('UPDATE users set status = false WHERE user_id = $1', [id]);

        if(deletedUser.rowCount){
            res.status(200).json({
                message: 'User successfully Deactivated.'
            });
        }else{
            res.status(404).json({
                message: 'User you seek to deactivate does not exist.'
            });
        }

    }catch(err){
        console.log(err)
        res.status(503).json({
            message: "Internal server error",
            error:err
        })
    }
}

const reactivate = async (req, res) => {
    const { id } = req.params;

    try{
        const reactivateUser = await pool.query('UPDATE users set status = true WHERE user_id = $1', [id]);

        if(reactivateUser.rowCount){
            res.status(200).json({
                message: 'User successfully reactivated.'
            });
        }else{
            res.status(404).json({
                message: 'User you seek to reactivate does not exist.'
            });
        }

    }catch(err){
        console.log(err)
        res.status(503).json({
            message: "Internal server error",
            error:err
        })
    }
}


module.exports = {
    deactivate,
    reactivate
}