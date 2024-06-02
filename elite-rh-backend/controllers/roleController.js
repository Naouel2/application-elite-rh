const roleService = require('../services/roleService');

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json({
            roles
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
