const isAccessible = (accessType) =>{
    return function (req, res, next) {
        if (req.user.role != undefined && accessType.indexOf(req.user.role) > -1) {
            next();
        } else {
            res.status(403).json({ status: 403, message: "Not Authorize to access." });
        }
    };
}

module.exports = isAccessible;