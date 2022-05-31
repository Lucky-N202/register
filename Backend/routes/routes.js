const express = require('express');
const router = express.Router();
const { authMiddlewareLogin, routeProtector, employeeRouteProtector, help_deskRouteProtector, adminRouteProtector } = require('../controllers/middleware');
const { login, logOut, UpdateProfile, uploadProfilePicture } = require('../controllers/login');
const { getLoggedInUser, getUserById, getAllEmployees } = require('../controllers/getUser');
const { register_one } = require('../controllers/single-register');
const { register_many } = require('../controllers/bulk-register');
const { createPwd } = require('../controllers/create-password');
const { postCovidDetails, postScanLog, checkIfSignedForm, checkIfScanned, getAllScanLogs,getAllScanLogsFiltered } = require('../controllers/scan-logs');
const { deactivate, reactivate } = require('../controllers/deactivate');
const multer = require('multer');
const imageUploader = multer({dest:'images/'});
const { checkUser } = require('../controllers/forgot-password');
const { pwdReset } = require('../controllers/forgot-password');

router.get('/', (req, res) => {
    res.send('Hello world')
})

//Get-Scan-logs
router.get('/all-scanlogs', adminRouteProtector, getAllScanLogs);
//Get-Scan-logs

router.post('/all-scanlogs-searched', adminRouteProtector, getAllScanLogsFiltered);

//Post-Scan-log
router.post('/post-scan-log/:user_id', help_deskRouteProtector, postScanLog);
//Post-Scan-log

//Post-covid-details
router.put('/post-covid-details', employeeRouteProtector, postCovidDetails);
//Post-covid-details

//Check if user is scanned
router.get('/scan-check', employeeRouteProtector, checkIfScanned);
//Check if user is scanned

//Check if user signed covid form
router.get('/covid-check', employeeRouteProtector, checkIfSignedForm);
//Check if user signed covid form

//Reset-Pwd
router.put('/create-password', createPwd);
//Reset-Pwd

//Get-USER-BY-ID
router.get('/user-profile/:id', help_deskRouteProtector, getUserById);
//Get-USER-BY-ID

//Register-One --start
router.post('/register-single', adminRouteProtector, register_one);
//Register-One --end

//Register-Many --start
router.post('/register-many', adminRouteProtector, register_many);
//Register-Many --end

//Get-All-Employees --start
router.get('/all-employees', adminRouteProtector, getAllEmployees);
//Get-All-Employees  --end

//Login --start
router.post('/login', authMiddlewareLogin, login);
//Login --end

//Logout --start
router.get('/logout', logOut);
//Logout --end

//Logged in User Profile --start
router.get('/user-profile', routeProtector, getLoggedInUser);
//User Profile --end

//Update Profile
router.put('/update-profile/:user_id', employeeRouteProtector, UpdateProfile)

//Deactivate user
router.put('/deactivate/:id', adminRouteProtector, deactivate);
//Deactivate user

//Reactivate user
router.put('/reactivate/:id', adminRouteProtector, reactivate);

router.post('/uploadToCloud/:id',imageUploader.single('images'),uploadProfilePicture);

router.put('/forgot-password', checkUser);

router.put('/reset-password/:token' , pwdReset)

module.exports = router;