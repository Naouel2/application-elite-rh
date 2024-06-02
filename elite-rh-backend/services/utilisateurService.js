const bcrypt = require('bcrypt');
const Sequelize = require('../config/database');
const { includes } = require('mysql2/lib/constants/charset_encodings');
const Utilisateur = require('../config/index').Utilisateur;
const RoleUtilisateur = require('../config/index').RoleUtilisateur;

async function getAllUsers() {
    return await Utilisateur.findAll({
         attributes: [
            'id', 
            'nom_utilisateur',
            'prenom_utilisateur',
            'email_utilisateur',
            'telephone_utilisateur',
            'createdAt',
            'updatedAt'
        ],
        include: RoleUtilisateur     
    });
}

async function getUser(id) {
    return await Utilisateur.findByPk(id);
}

async function getUserByEmail(email) {
    return await Utilisateur.findOne({
        where: {email_utilisateur: email},
        include: RoleUtilisateur
    });
}

async function createUserWithRoles(userData, roleIds) {
    const transaction = await Sequelize.transaction();
    try {
        // Créer l'utilisateur dans une transaction
        const newUser = await Utilisateur.create(userData, { transaction });

        // Associer les rôles à l'utilisateur dans la même transaction
        const roles = await RoleUtilisateur.findAll({
            where: { id: roleIds },
            transaction
        });
        await newUser.addRole_utilisateurs(roles, { transaction });

        await transaction.commit();
        return newUser;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}


async function updateUser(id, updatedData) {
    try {
        // Fetch the existing user
        const user = await getUser(id);
        if (!user) {
            throw new Error('User not found');
        }

        // Check if password needs to be updated and hash it
        if (updatedData.mdp_utilisateur) {
            updatedData.mdp_utilisateur = await bcrypt.hash(updatedData.mdp_utilisateur, 10);
        }

        // Update the user data
        await Utilisateur.update(updatedData, { where: { id } });

        // Fetch the updated user data
        const updatedUser = await getUser(id);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

async function updateUserRoles(userId, roleNames) {
    try {
        const user = await getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Fetch all role instances corresponding to the role names
        const roles = await RoleUtilisateur.findAll({
            where: {
                role: roleNames
            }
        });

        // Update the user's roles
        await user.setRole_utilisateurs(roles);

        // Fetch the updated user data
        const updatedUser = await getUser(userId);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

async function getUser(id) {
    try {
        return await Utilisateur.findByPk(id, {
            include: RoleUtilisateur
        });
    } catch (error) {
        throw error;
    }
}


async function deleteUser(id) {
    try {

        // Check if user exists
        const user = await getUser(id);
        if (!user) {
            throw new Error('User not found');
        }
        // Delete the user in the database
        await Utilisateur.destroy({
            where: {id: id }
        });
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllUsers,
    getUser,
    getUserByEmail,
    createUserWithRoles,
    updateUser,
    updateUserRoles,
    deleteUser
};