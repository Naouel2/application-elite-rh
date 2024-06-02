// Check if user has the requested roles
module.exports = (roles) => {
    return (req, res, next) => {
        if (req.userData && roles.some(role => req.userData.roles.includes(role))) {
            next();
        } else {
            return res.status(403).json({
                message: 'Access denied'
            });
        }
    };
};
