const Sequelize = require('sequelize');
const RoleUtilisateur = require('../config/index').RoleUtilisateur;

async function getAllRoles() {
    const roles = await RoleUtilisateur.findAll();
    return roles;
}

async function getRoleIdsByNames(roleNames) {
    if (!Array.isArray(roleNames)) {
        throw new Error('roleNames must be an array');
    }

    const roles = await RoleUtilisateur.findAll({
        where: {
            role: {
                [Sequelize.Op.in]: roleNames
            }
        }
    });

    if (roles.length !== roleNames.length) {
        const foundRoleNames = roles.map(role => role.role);
        const missingRoleNames = roleNames.filter(roleName => !foundRoleNames.includes(roleName));
        console.error(`One or more roles not found: ${missingRoleNames.join(', ')}`);
        throw new Error(`One or more roles not found: ${missingRoleNames.join(', ')}`);
    }

    return roles.map(role => role.id);
}

module.exports = { 
    getAllRoles,
    getRoleIdsByNames 
};
