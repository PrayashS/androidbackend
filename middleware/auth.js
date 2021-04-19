
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


module.exports.verifyUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, 'secretkey');

        User.findOne({ _id: userData.accData })
            .then(function (result) {
                req.result = result
                next();
            })
            .catch(function (e) {
                res.status(401).json({ message: "Auth Failedllll" })
            })
    }

    catch (err) {
        res.status(401).json({ message: "Auth Failed" })
    }
}
//next guard for admin
module.exports.verifyAdmin = function (req, res, next) {
    if (!res.user) {
        return res.status(401).json({ message: "Unauthorized User!" })
    }
    else if (req.user.userType !== 'Admin') {
        return res.status(401).json({ message: "Unauthorized User!" })
    }
    next();
}
//next guard for buyer
module.exports.verifyBuyer = function (req, res, next) {
    if (!res.user) {
        return res.status(401).json({ message: "Unauthorized User!" })
    }
    else if (req.user.userType !== 'Buyer') {
        return res.status(401).json({ message: "Unauthorized User!" })
    }
    next();
}
