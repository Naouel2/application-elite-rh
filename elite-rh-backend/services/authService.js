const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtOptions').jwtOptions;
const utilisateurService = require('./utilisateurService');
const RoleService = require('./roleService');

async function registerUser(userData) {
    try {
        const existingUser = await utilisateurService.getUserByEmail(userData.email_utilisateur);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        let userPassword;
        if (!userData.mdp_utilisateur) {
            userPassword = 'password123';
        } else {
            userPassword = userData.mdp_utilisateur;
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // Obtenir les IDs des rôles à partir de leurs noms
        const roleIds = await RoleService.getRoleIdsByNames(userData.roles);
        
        const newUser = await utilisateurService.createUserWithRoles(
            {
                nom_utilisateur: userData.nom_utilisateur,
                prenom_utilisateur: userData.prenom_utilisateur,
                email_utilisateur: userData.email_utilisateur,
                mdp_utilisateur: hashedPassword,
                telephone_utilisateur: userData.telephone_utilisateur
            },
            roleIds
        );

        return newUser;
    } catch (error) {
        throw error;
    }
}

async function logUser(userCredentials) {
    const { email_utilisateur, mdp_utilisateur } = userCredentials;

    if (!email_utilisateur || !mdp_utilisateur) {
        throw new Error('Email and password are required');
    }

    const user = await utilisateurService.getUserByEmail(email_utilisateur);
    if (!user) {
        throw new Error('No such user found');
    }

    const isMatch = await bcrypt.compare(mdp_utilisateur, user.mdp_utilisateur);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }
    const userRoles = user.role_utilisateurs.map(role => role.id);
    const payload = { id: user.id, email: user.email_utilisateur, roles: userRoles};
    const token = jwt.sign(payload, jwtOptions.secretOrKey);

    return {
        token, 
        userId: user.id,
        roles: userRoles
    };
}

module.exports = {
    registerUser,
    logUser,
};
