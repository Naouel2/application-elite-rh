const userService = require('../services/utilisateurService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id != req.userData.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const user = await userService.getUser(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id != req.userData.id) {
            if (!req.userData.roles.includes(1)) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }

        const updatedData = req.body;

        // Ensure roles are updated correctly
        if (updatedData.roles) {
            await userService.updateUserRoles(id, updatedData.roles);
            // Remove roles from updatedData to prevent overwriting the user's roles in the user update
            delete updatedData.roles;
        }

        const updatedUser = await userService.updateUser(id, updatedData);

        res.status(200).json({
            message: 'User updated successfully!',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).json({
            message: 'User deleted successfully!'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
