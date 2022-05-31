const jwt = require('jsonwebtoken');
const pool = require('../db_connect');

const authMiddlewareLogin = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(err){
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            }else{
                
                return res.status(406).json({
                    message: 'Only users that arent loggen in have access to this page'
                })
            }
        })
    }else{
        next();
    }
}

const routeProtector = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(err){
                res.cookie('jwt', '', { maxAge: 1 });
                return res.status(406).json({
                    message: 'You need to login to get access to the page you are looking for.',
                    redirect: true
                })
            }else{
                next();
            }
        })
    }else{
        return res.status(406).json({
            message: 'You need to login to get access to the page you are looking for.'
        })
    }
}

const adminRouteProtector = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            
            if(err){
                res.cookie('jwt', '', { maxAge: 1 });
                return res.status(406).json({
                    message: 'You need to login to get access to the page you are looking for.'
                })
            }else{
                
                const { role } = decodedToken;
                const findUserRole = await pool.query('SELECT * FROM roles WHERE role_id = $1', [role]);
                const { user_roles } = findUserRole.rows[0];
                
                if(user_roles !== 'admin'){
                    return res.status(200).json({
                        message: 'You not allowed access to this route'
                    })
                }else{
                    
                    next();
                }

            }
        })
    }else{
        return res.status(406).json({
            message: 'You need to login to get access to the page you are looking for.'
        })
    }
}

const employeeRouteProtector = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if(err){
                res.cookie('jwt', '', { maxAge: 1 });
                return res.status(406).json({
                    message: 'You need to login to get access to the page you are looking for.',
                    redirect: true
                })
            }else{
                const { role } = decodedToken;
                const findUserRole = await pool.query('SELECT * FROM roles WHERE role_id = $1', [role]);
                const { user_roles } = findUserRole.rows[0];
                
                if(user_roles !== 'employee'){
                    return res.status(200).json({
                        message: 'You not allowed access to this route'
                    })
                }else{
                    next();
                }

            }
        })
    }else{
        res.status(406).json({
            message: 'You need to login to get access to the page you are looking for.'
        })
    }
}

const help_deskRouteProtector = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if(err){
                res.cookie('jwt', '', { maxAge: 1 });
                return res.status(406).json({
                    message: 'You need to login to get access to the page you are looking for.',
                    redirect: true
                })
            }else{
                console.log(decodedToken);
                const { role } = decodedToken;
                const findUserRole = await pool.query('SELECT * FROM roles WHERE role_id = $1', [role]);
                const { user_roles } = findUserRole.rows[0];
                
                if(user_roles !== 'help_desk'){
                    return res.status(200).json({
                        message: 'You not allowed access to this route'
                    })
                }else{
                    next();
                }

            }
        })
    }else{
        return res.status(406).json({
            message: 'You need to login to get access to the page you are looking for.'
        })
    }
}

module.exports = {
    authMiddlewareLogin,
    routeProtector,
    help_deskRouteProtector,
    employeeRouteProtector,
    adminRouteProtector
}