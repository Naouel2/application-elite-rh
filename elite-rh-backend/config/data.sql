-- Utilisateurs (admin)
INSERT INTO utilisateurs (nom_utilisateur, prenom_utilisateur, email_utilisateur, mdp_utilisateur, telephone_utilisateur, createdAt, updatedAt)
VALUES ('Bar', 'Michel', 'michel.bar@gmail.com', 'password123', '0712324376', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Roles
INSERT INTO role_utilisateurs (role, createdAt, updatedAt)
VALUES 
('admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('manager-rh', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Formateurs
INSERT INTO formateurs (nom_formateur, prenom_formateur, telephone_formateur, email_formateur, specialite_formateur, createdAt, updatedAt)
VALUES
('Leroy', 'Jean', '0612345678', 'jean.leroy@example.com', 'Gestion des Ressources Humaines', NOW(), NOW()),
('Martin', 'Sophie', '0623456789', 'sophie.martin@example.com', 'Recrutement et Sélection', NOW(), NOW()),
('Dupont', 'Luc', '0634567890', 'luc.dupont@example.com', 'Droit du Travail', NOW(), NOW()),
('Bernard', 'Marie', '0645678901', 'marie.bernard@example.com', 'Développement des Compétences', NOW(), NOW()),
('Petit', 'Alain', '0656789012', 'alain.petit@example.com', 'Gestion des Conflits', NOW(), NOW());

-- Salles
INSERT INTO salles (nom_salle, batiment_salle, createdAt, updatedAt)
VALUES 
('Salle Red', 'Bâtiment A', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Salle Blue', 'Bâtiment B', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Salle Green', 'Bâtiment C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Salle Yellow', 'Bâtiment D', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Formations
INSERT INTO formations (nom_formation, domaine_formation, description_formation, date_debut_formation, date_fin_formation, id_salle, id_formateur, createdAt, updatedAt)
VALUES 
('Bases RH', 'Ressources Humaines', 'Introduction aux concepts et pratiques des ressources humaines.', '2024-06-01 09:00:00', '2024-06-01 17:00:00', 1, 2, NOW(), NOW()),
('Recrutement Avancé', 'Ressources Humaines', 'Techniques avancées de recrutement et de sélection.', '2024-06-02 09:00:00', '2024-06-02 17:00:00', 2, 1, NOW(), NOW()),
('Relations Employés', 'Ressources Humaines', 'Gestion et amélioration des relations avec les employés au travail.', '2024-06-03 09:00:00', '2024-06-03 17:00:00', 3, 1, NOW(), NOW()),
('Gestion de la Performance', 'Ressources Humaines', 'Stratégies pour une gestion efficace de la performance.', '2024-06-04 09:00:00', '2024-06-04 17:00:00', 4, 2, NOW(), NOW()),
('Conformité Juridique RH', 'Ressources Humaines', 'Comprendre la conformité juridique en ressources humaines.', '2024-06-05 09:00:00', '2024-06-05 17:00:00', 4, 4, NOW(), NOW());
