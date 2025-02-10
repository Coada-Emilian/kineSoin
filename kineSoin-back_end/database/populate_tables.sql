/**
 * @description Populates multiple tables in the database with initial data for insurance organisms, body regions, afflictions, prescriptions, appointments, patient messages, therapist messages, and patient insurances.
 *
 * This module:
 * - Sets the encoding to UTF8 for database operations.
 * - Inserts data into the "insurance_organisms" table, including insurance company details such as name, contact information, and administrative ID.
 * - Populates the "body_regions" table with predefined regions of the body relevant to physical therapy.
 * - Fills the "afflictions" table with various medical conditions linked to specific body regions, including their description, insurance codes, and whether they have been operated upon.
 * - Inserts data into the "prescriptions" table, including details such as medic ID, patient ID, affliction ID, appointment quantity, completion status, at-home care, date, picture URL, and creation timestamp.
 * - Inserts data into the "appointments" table, including details such as prescription ID, therapist ID, patient ID, appointment date, time, acceptance status, and creation timestamp.
 * - Inserts data into the "patient_messages" table, including details such as receiver ID, sender ID, message content, message date, message time, and creation timestamp.
 * - Inserts data into the "therapist_messages" table, including details such as sender ID, receiver ID, message content, message date, message time, and creation timestamp.
 * - Inserts data into the "patient_insurances" table, including details such as patient ID, insurance ID, adherent code, contract number, start date, end date, creation timestamp, and update timestamp.
 * - Ensures each data insertion is timestamped with the current date and time.
 *
 * Ensure that all required tables exist and are properly structured before running this script to populate the database.
 */


-- Set the encoding to UTF8
SET client_encoding = 'UTF8';

BEGIN;

-- Insert data into insurance_organisms table
INSERT INTO "insurance_organisms" ("admin_id", "name", "amc_code", "street_number", "street_name", "postal_code", "city", "prefix", "phone_number", "created_at", "updated_at")
VALUES
(1, 'Mutuelle Générale', 'AMC001', '12', 'Rue de la Paix', '75002', 'Paris', '+33', '1 42 60 00 00', NOW(), NOW()),
(1, 'Harmonie Mutuelle', 'AMC002', '34', 'Avenue des Champs-Élysées', '75008', 'Rennes', '+33', '1 70 10 10 10', NOW(), NOW()),
(1, 'Mutuelle Mieux-Etre', 'AMC003', '56', 'Boulevard de la République', '69002', 'Lyon', '+33', '4 78 00 00 00', NOW(), NOW()),
(1, 'Macif Mutuelle', 'AMC004', '78', 'Rue de la Gare', '79000', 'Niort', '+33', '5 49 00 00 00', NOW(), NOW()),
(1, 'MGEN', 'AMC005', '90', 'Place de la Bastille', '75011', 'Paris', '+33', '1 53 27 50 00', NOW(), NOW()),
(1, 'Mutuelle de Poitiers', 'AMC006', '12', 'Rue des Lilas', '86000', 'Poitiers', '+33', '5 49 88 00 00', NOW(), NOW()),
(1, 'AG2R La Mondiale', 'AMC007', '45', 'Avenue de la République', '75011', 'Paris', '+33', '1 76 77 10 00', NOW(), NOW()),
(1, 'Apivia Macif Mutuelle', 'AMC008', '23', 'Rue du Port', '17000', 'La Rochelle', '+33', '5 46 00 00 00', NOW(), NOW()),
(1, 'SMIP', 'AMC009', '5', 'Place Gambetta', '33000', 'Bordeaux', '+33', '5 57 85 00 00', NOW(), NOW()),
(1, 'Mutuelle Entrain', 'AMC010', '14', 'Rue de Rivoli', '75001', 'Paris', '+33', '1 42 60 00 01', NOW(), NOW());


-- Insert data body_regions table
INSERT INTO "body_regions" ("admin_id", "name", "created_at") VALUES
(1, 'Cou', NOW()),
(1, 'Épaule', NOW()),
(1, 'Bras', NOW()),
(1, 'Coude', NOW()),
(1, 'Avant-bras', NOW()),
(1, 'Poignet', NOW()),
(1, 'Main', NOW()),
(1, 'Dos', NOW()),
(1, 'Thorax', NOW()),
(1, 'Abdomen', NOW()),
(1, 'Hanche', NOW()),
(1, 'Jambe', NOW()),
(1, 'Genou', NOW()),
(1, 'Pied', NOW()),
(1, 'Affection neurologique', NOW()),
(1, 'Affection cardiovasculaire', NOW()),
(1, 'Autre', NOW());


-- Insert data into afflictions table
INSERT INTO "afflictions" ("admin_id", "body_region_id", "name", "description", "insurance_code", "is_operated", "created_at") VALUES
(1, 8, 'Douleur Lombaire', 'Douleur ou inconfort dans la région lombaire, souvent dû à une entorse musculaire ou des problèmes de disque.', 'LBP001', FALSE, NOW()),
(1, 13, 'Ostéoarthrite du Genou', 'Dégénérescence du cartilage dans l’articulation du genou, entraînant douleur et raideur.', 'OA001', TRUE, NOW()),
(1, 13, 'Déchirure du Ménisque du Genou', 'Déchirure du cartilage du genou, provoquant douleur et gonflement.', 'MT001', TRUE, NOW()),
(1, 2, 'Lésion de la Coiffe des Rotateurs', 'Lésion des muscles ou tendons de l’épaule, provoquant douleur et mobilité limitée.', 'RC001', TRUE, NOW()),
(1, 2, 'Impingement de l’Épaule', 'Douleur à l’épaule causée par les tendons de la coiffe des rotateurs devenant coincés.', 'SI001', TRUE, NOW()),
(1, 2, 'Épaule Gelée', 'Raideur et douleur dans l’articulation de l’épaule, limitant l’amplitude des mouvements.', 'FS001', FALSE, NOW()),
(1, 15, 'Fasciite Plantaire', 'Inflammation du fascia plantaire, causant une douleur au talon, surtout le matin.', 'PF001', FALSE, NOW()),
(1, 15, 'Tendinite d’Achille', 'Inflammation du tendon d’Achille, causant douleur à l’arrière du talon.', 'AT001', FALSE, NOW()),
(1, 6, 'Syndrome du Canal Carpien', 'Pression sur le nerf médian au niveau du poignet, entraînant douleur et engourdissement de la main.', 'CTS001', TRUE, NOW()),
(1, 8, 'Hernie Discale', 'État où le gel interne d’un disque spinal se prolonge, provoquant douleur au dos et problèmes nerveux.', 'HD001', TRUE, NOW()),
(1, 8, 'Sciatique', 'Douleur qui irradie le long du nerf sciatique, souvent due à une hernie discale.', 'SCA001', FALSE, NOW()),
(1, 15, 'Entorse de la Cheville', 'Blessure aux ligaments de la cheville, causant douleur, gonflement et mobilité limitée.', 'AS001', FALSE, NOW()),
(1, 1, 'Coup de Lapin', 'Blessure au cou causée par un mouvement soudain, souvent lors d’accidents de voiture.', 'WH001', FALSE, NOW()),
(1, 1, 'Radiculopathie Cervicale', 'Douleur nerveuse qui provient du cou en raison d’un nerf pincé.', 'CR001', FALSE, NOW()),
(1, 4, 'Épicondylite Latérale', 'Douleur et inflammation à l’extérieur du coude en raison d’un surmenage.', 'TE001', FALSE, NOW()),
(1, 9, 'Syndrome de la Sortie Thoracique', 'Compression des nerfs ou des vaisseaux sanguins dans le cou, entraînant douleur aux épaules et au cou.', 'TOS001', FALSE, NOW()),
(1, 16, 'Réhabilitation Post-Chirurgicale', 'Thérapie physique après une chirurgie pour restaurer la force et la mobilité.', 'PSR001', TRUE, NOW()),
(1, 17, 'Réhabilitation après AVC', 'Thérapie pour aider à retrouver la mobilité et la fonction après un AVC.', 'SR001', FALSE, NOW());


-- Insert data into prescriptions table
INSERT INTO "prescriptions" ("medic_id", "patient_id", "affliction_id", "appointment_quantity", "is_completed", "at_home_care", "date", "picture_url", "created_at") VALUES
(1, 1, 1, 15, false, true, '2022-03-15', 'https://as2.ftcdn.net/v2/jpg/00/51/75/59/1000_F_51755902_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 1, 2, 30, false, true, '2022-03-30', 'https://as2.ftcdn.net/v2/jpg/00/51/75/59/1000_F_51755902_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 2, 2, 10, false, false, '2022-04-20', 'https://as2.ftcdn.net/v2/jpg/00/51/75/59/1000_F_51755902_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 3, 3, 8, false, true, '2022-05-11', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 4, 4, 12, false, true, '2022-01-10', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 5, 5, 5, false, false, '2022-07-22', 'https://as2.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 6, 6, 20, false, true, '2022-06-18', 'https://as4.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 7, 7, 14, false, false, '2022-08-29', 'https://as5.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 8, 8, 16, false, true, '2022-09-11', 'https://as2.ftcdn.net/v2/jpg/00/51/75/59/1000_F_51755902_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 9, 9, 7, false, false, '2022-10-15', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 10, 10, 4, false, true, '2022-11-30', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 11, 11, 15, false, true, '2022-12-12', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 12, 12, 10, false, false, '2022-01-02', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 13, 13, 8, false, true, '2022-03-03', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 14, 14, 12, false, true, '2022-02-14', 'https://as2.ftcdn.net/v2/jpg/00/51/75/59/1000_F_51755902_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 15, 15, 6, false, false, '2022-04-04', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 16, 1, 20, false, true, '2022-05-05', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 17, 2, 10, false, false, '2022-06-15', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 18, 3, 18, false, true, '2022-07-25', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 19, 4, 14, false, true, '2022-08-05', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 20, 5, 10, false, false, '2022-09-05', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 21, 6, 15, false, true, '2022-10-15', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 22, 7, 7, false, false, '2022-11-25', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 23, 8, 6, false, true, '2022-12-15', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 24, 9, 20, false, true, '2022-01-20', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 25, 10, 11, false, false, '2022-02-10', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 26, 11, 5, false, true, '2022-03-15', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 27, 12, 8, false, false, '2022-04-20', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 28, 13, 9, false, true, '2022-05-11', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 29, 14, 12, false, true, '2022-01-10', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 30, 15, 15, false, false, '2022-07-22', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 31, 1, 4, false, true, '2022-06-18', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 32, 2, 13, false, true, '2022-08-29', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 33, 3, 16, false, false, '2022-09-11', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 34, 4, 5, false, true, '2022-10-15', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 35, 5, 8, false, false, '2022-11-30', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 36, 6, 9, false, true, '2022-12-12', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 37, 7, 10, false, false, '2022-01-02', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 38, 8, 11, false, true, '2022-03-03', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 39, 9, 12, false, false, '2022-04-04', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 40, 10, 18, false, true, '2022-05-05', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 41, 11, 15, false, true, '2022-06-15', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 42, 12, 7, false, false, '2022-07-25', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 43, 13, 6, false, true, '2022-08-05', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 44, 14, 5, false, true, '2022-09-05', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 45, 15, 20, false, false, '2022-10-15', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 46, 1, 15, false, true, '2022-11-20', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 47, 2, 10, false, false, '2022-12-05', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 48, 3, 8, false, true, '2022-01-12', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 49, 4, 12, false, true, '2022-02-15', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 50, 5, 18, false, false, '2022-03-10', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW());

-- Insert data into appointments table
INSERT INTO "appointments" ("prescription_id", "therapist_id", "patient_id", "date", "time", "is_accepted", "created_at") VALUES
(1, 1, 1, '2024-11-10', '11:15:00', true, NOW()),
(1, 1, 1, '2024-12-01', '13:30:00', false, NOW()),
(1, 1, 1, '2025-02-05', '10:30:00', false, NOW()),
(1, 1, 1, '2025-03-22', '09:00:00', true, NOW()),
(1, 1, 1, '2025-10-17', '14:45:00', false, NOW()),
(1, 1, 1, '2025-10-17', '15:00:00', true, NOW()),
(2, 1, 1, '2024-10-17', '09:00:00', true, NOW()),
(3, 2, 1, '2022-01-15', '11:00:00', false, NOW()),
(4, 3, 3, '2022-01-16', '10:30:00', true, NOW()),
(5, 4, 4, '2022-01-20', '14:00:00', false, NOW()),
(6, 5, 5, '2022-01-22', '16:00:00', true, NOW()),
(7, 1, 6, '2024-10-17', '13:00:00', true, NOW()),
(8, 2, 7, '2022-01-28', '17:00:00', false, NOW()),
(9, 3, 8, '2022-02-01', '15:30:00', true, NOW()),
(10, 4, 9, '2022-02-05', '10:00:00', false, NOW()),
(11, 5, 10, '2022-02-07', '14:30:00', true, NOW()),
(12, 1, 11, '2024-10-15', '09:00:00', true, NOW()),
(13, 2, 12, '2022-02-12', '16:15:00', false, NOW()),
(14, 3, 13, '2022-02-15', '11:45:00', true, NOW()),
(15, 4, 14, '2022-02-18', '10:00:00', false, NOW()),
(16, 5, 15, '2022-02-20', '13:30:00', true, NOW()),
(17, 1, 16, '2022-02-22', '09:30:00', false, NOW()),
(18, 2, 17, '2022-02-25', '14:00:00', true, NOW()),
(19, 3, 18, '2022-03-01', '11:00:00', false, NOW()),
(20, 4, 19, '2022-03-05', '15:00:00', true, NOW()),
(21, 5, 20, '2022-03-08', '10:30:00', false, NOW()),
(22, 1, 21, '2022-03-10', '14:15:00', true, NOW()),
(23, 2, 22, '2022-03-12', '09:45:00', false, NOW()),
(24, 3, 23, '2022-03-15', '16:00:00', true, NOW()),
(25, 4, 24, '2022-03-18', '13:00:00', false, NOW()),
(26, 5, 25, '2022-03-20', '11:30:00', true, NOW()),
(27, 1, 26, '2022-03-22', '10:00:00', false, NOW()),
(28, 2, 27, '2022-03-25', '15:30:00', true, NOW()),
(29, 3, 28, '2022-03-30', '09:00:00', false, NOW()),
(30, 4, 29, '2022-04-01', '14:30:00', true, NOW()),
(31, 5, 30, '2022-04-05', '11:15:00', false, NOW()),
(32, 1, 31, '2022-04-10', '16:45:00', true, NOW()),
(33, 2, 32, '2022-04-12', '09:30:00', false, NOW()),
(34, 3, 33, '2022-04-15', '13:00:00', true, NOW()),
(35, 4, 34, '2022-04-18', '10:00:00', false, NOW()),
(36, 5, 35, '2022-04-20', '15:00:00', true, NOW()),
(37, 1, 36, '2022-04-22', '10:30:00', false, NOW()),
(38, 2, 37, '2022-04-25', '14:15:00', true, NOW()),
(39, 3, 38, '2022-04-28', '11:45:00', false, NOW()),
(40, 4, 39, '2022-05-01', '16:00:00', true, NOW()),
(41, 5, 40, '2022-05-05', '13:00:00', false, NOW()),
(42, 1, 41, '2022-05-08', '09:30:00', true, NOW()),
(43, 2, 42, '2022-05-12', '14:00:00', false, NOW()),
(44, 3, 43, '2022-05-15', '11:00:00', true, NOW()),
(45, 4, 44, '2022-05-20', '15:30:00', false, NOW()),
(46, 5, 45, '2022-05-22', '10:00:00', true, NOW()),
(47, 1, 46, '2022-05-25', '14:30:00', false, NOW()),
(48, 2, 47, '2022-05-28', '11:15:00', true, NOW()),
(49, 3, 48, '2022-06-01', '16:45:00', false, NOW()),
(50, 4, 49, '2022-06-05', '13:00:00', true, NOW());

-- Insert data into patient_messages table
INSERT INTO "patient_messages" ("receiver_id", "sender_id", "content", "date", "time", "created_at") VALUES
(1, 1, 'Bonjour!', NOW(), CURRENT_TIME, NOW()),
(1, 2, 'Comment ça va?', NOW(), CURRENT_TIME, NOW()),
(2, 3, 'Merci pour votre aide.', NOW(), CURRENT_TIME, NOW()),
(2, 4, 'J''ai des questions sur ma prescription.', NOW(), CURRENT_TIME, NOW()),
(3, 5, 'Je me sens mieux aujourd''hui!', NOW(), CURRENT_TIME, NOW()),
(3, 6, 'Peut-on changer mon rendez-vous?', NOW(), CURRENT_TIME, NOW()),
(4, 7, 'Quel type d''exercices devrais-je faire?', NOW(), CURRENT_TIME, NOW()),
(4, 8, 'Merci pour vos conseils!', NOW(), CURRENT_TIME, NOW()),
(5, 9, 'Je vais bien, merci!', NOW(), CURRENT_TIME, NOW()),
(5, 10, 'Pouvez-vous m''aider avec mes douleurs?', NOW(), CURRENT_TIME, NOW()),
(1, 11, 'Quand est mon prochain rendez-vous?', NOW(), CURRENT_TIME, NOW()),
(2, 12, 'Avez-vous reçu mes documents?', NOW(), CURRENT_TIME, NOW()),
(3, 13, 'Je suis très satisfait de mes progrès.', NOW(), CURRENT_TIME, NOW()),
(4, 14, 'Dois-je faire des tests supplémentaires?', NOW(), CURRENT_TIME, NOW()),
(5, 15, 'Je voudrais parler de mes symptômes.', NOW(), CURRENT_TIME, NOW()),
(1, 16, 'J''ai besoin de conseils pour ma rééducation.', NOW(), CURRENT_TIME, NOW()),
(2, 17, 'Merci pour votre écoute.', NOW(), CURRENT_TIME, NOW()),
(3, 18, 'Je suis inquiet pour ma prochaine séance.', NOW(), CURRENT_TIME, NOW()),
(4, 19, 'J''ai des douleurs dans le dos.', NOW(), CURRENT_TIME, NOW()),
(5, 20, 'Est-ce que je dois suivre un régime spécial?', NOW(), CURRENT_TIME, NOW());

-- Insert data into therapist_messages table
INSERT INTO "therapist_messages" ("sender_id", "receiver_id", "content", "date", "time", "created_at") VALUES
(1, 1, 'Bonjour! Comment puis-je vous aider?', NOW(), CURRENT_TIME, NOW()),
(1, 2, 'N''oubliez pas de suivre vos exercices.', NOW(), CURRENT_TIME, NOW()),
(2, 3, 'Merci de votre message. Nous allons travailler sur vos préoccupations.', NOW(), CURRENT_TIME, NOW()),
(2, 4, 'Je suis là si vous avez besoin d''aide.', NOW(), CURRENT_TIME, NOW()),
(3, 5, 'Ravi d''entendre que vous vous sentez mieux!', NOW(), CURRENT_TIME, NOW()),
(3, 6, 'Oui, nous pouvons changer votre rendez-vous.', NOW(), CURRENT_TIME, NOW()),
(4, 7, 'Voici quelques exercices à essayer.', NOW(), CURRENT_TIME, NOW()),
(4, 8, 'Je suis content que mes conseils vous aident!', NOW(), CURRENT_TIME, NOW()),
(5, 9, 'Votre progrès est impressionnant!', NOW(), CURRENT_TIME, NOW()),
(5, 10, 'Discutons de vos douleurs lors de notre prochaine séance.', NOW(), CURRENT_TIME, NOW()),
(1, 11, 'Votre prochain rendez-vous est prévu pour la semaine prochaine.', NOW(), CURRENT_TIME, NOW()),
(2, 12, 'J''ai bien reçu vos documents, merci.', NOW(), CURRENT_TIME, NOW()),
(3, 13, 'Continuez comme ça, vous faites de grands progrès!', NOW(), CURRENT_TIME, NOW()),
(4, 14, 'Nous devrions envisager des tests supplémentaires.', NOW(), CURRENT_TIME, NOW()),
(5, 15, 'Parlons de vos symptômes lors de notre prochaine séance.', NOW(), CURRENT_TIME, NOW()),
(1, 16, 'Je suis disponible pour répondre à vos questions.', NOW(), CURRENT_TIME, NOW()),
(2, 17, 'Merci pour votre patience.', NOW(), CURRENT_TIME, NOW()),
(3, 18, 'Ne vous inquiétez pas pour votre prochaine séance, tout ira bien.', NOW(), CURRENT_TIME, NOW()),
(4, 19, 'Je vous conseille de consulter un spécialiste pour votre dos.', NOW(), CURRENT_TIME, NOW()),
(5, 20, 'Un régime équilibré peut vraiment aider votre réhabilitation.', NOW(), CURRENT_TIME, NOW());

-- Insert data into patient_insurances table
INSERT INTO "patient_insurances" ("patient_id", "insurance_id", "adherent_code", "contract_number", "start_date", "end_date", "created_at", "updated_at")
VALUES
(1, 1, 'ADH000001', 'CNTR000001', '2023-01-01', '2024-01-01', NOW(), NOW()),
(2, 2, 'ADH000002', 'CNTR000002', '2023-02-01', '2024-02-01', NOW(), NOW()),
(3, 3, 'ADH000003', 'CNTR000003', '2023-03-01', '2024-03-01', NOW(), NOW()),
(4, 4, 'ADH000004', 'CNTR000004', '2023-04-01', '2024-04-01', NOW(), NOW()),
(5, 5, 'ADH000005', 'CNTR000005', '2023-05-01', '2024-05-01', NOW(), NOW()),
(6, 1, 'ADH000006', 'CNTR000006', '2023-06-01', '2024-06-01', NOW(), NOW()),
(7, 2, 'ADH000007', 'CNTR000007', '2023-07-01', '2024-07-01', NOW(), NOW()),
(8, 3, 'ADH000008', 'CNTR000008', '2023-08-01', '2024-08-01', NOW(), NOW()),
(9, 4, 'ADH000009', 'CNTR000009', '2023-09-01', '2024-09-01', NOW(), NOW()),
(10, 5, 'ADH000010', 'CNTR000010', '2023-10-01', '2024-10-01', NOW(), NOW()),
(11, 1, 'ADH000011', 'CNTR000011', '2023-11-01', '2024-11-01', NOW(), NOW()),
(12, 2, 'ADH000012', 'CNTR000012', '2023-12-01', '2024-12-01', NOW(), NOW()),
(13, 3, 'ADH000013', 'CNTR000013', '2023-01-15', '2024-01-15', NOW(), NOW()),
(14, 4, 'ADH000014', 'CNTR000014', '2023-02-15', '2024-02-15', NOW(), NOW()),
(15, 5, 'ADH000015', 'CNTR000015', '2023-03-15', '2024-03-15', NOW(), NOW()),
(16, 1, 'ADH000016', 'CNTR000016', '2023-04-15', '2024-04-15', NOW(), NOW()),
(17, 2, 'ADH000017', 'CNTR000017', '2023-05-15', '2024-05-15', NOW(), NOW()),
(18, 3, 'ADH000018', 'CNTR000018', '2023-06-15', '2024-06-15', NOW(), NOW()),
(19, 4, 'ADH000019', 'CNTR000019', '2023-07-15', '2024-07-15', NOW(), NOW()),
(20, 5, 'ADH000020', 'CNTR000020', '2023-08-15', '2024-08-15', NOW(), NOW()),
(21, 1, 'ADH000021', 'CNTR000021', '2023-09-15', '2024-09-15', NOW(), NOW()),
(22, 2, 'ADH000022', 'CNTR000022', '2023-10-15', '2024-10-15', NOW(), NOW()),
(23, 3, 'ADH000023', 'CNTR000023', '2023-11-15', '2024-11-15', NOW(), NOW()),
(24, 4, 'ADH000024', 'CNTR000024', '2023-12-15', '2024-12-15', NOW(), NOW()),
(25, 5, 'ADH000025', 'CNTR000025', '2023-01-30', '2024-01-30', NOW(), NOW()),
(26, 1, 'ADH000026', 'CNTR000026', '2023-02-28', '2024-02-28', NOW(), NOW()),
(27, 2, 'ADH000027', 'CNTR000027', '2023-03-30', '2024-03-30', NOW(), NOW()),
(28, 3, 'ADH000028', 'CNTR000028', '2023-04-30', '2024-04-30', NOW(), NOW()),
(29, 4, 'ADH000029', 'CNTR000029', '2023-05-30', '2024-05-30', NOW(), NOW()),
(30, 5, 'ADH000030', 'CNTR000030', '2023-06-30', '2024-06-30', NOW(), NOW()),
(31, 1, 'ADH000031', 'CNTR000031', '2023-07-01', '2024-07-01', NOW(), NOW()),
(32, 2, 'ADH000032', 'CNTR000032', '2023-08-01', '2024-08-01', NOW(), NOW()),
(33, 3, 'ADH000033', 'CNTR000033', '2023-09-01', '2024-09-01', NOW(), NOW()),
(34, 4, 'ADH000034', 'CNTR000034', '2023-10-01', '2024-10-01', NOW(), NOW()),
(35, 5, 'ADH000035', 'CNTR000035', '2023-11-01', '2024-11-01', NOW(), NOW()),
(36, 1, 'ADH000036', 'CNTR000036', '2023-12-01', '2024-12-01', NOW(), NOW()),
(37, 2, 'ADH000037', 'CNTR000037', '2023-01-15', '2024-01-15', NOW(), NOW()),
(38, 3, 'ADH000038', 'CNTR000038', '2023-02-15', '2024-02-15', NOW(), NOW()),
(39, 4, 'ADH000039', 'CNTR000039', '2023-03-15', '2024-03-15', NOW(), NOW()),
(40, 5, 'ADH000040', 'CNTR000040', '2023-04-15', '2024-04-15', NOW(), NOW()),
(41, 1, 'ADH000041', 'CNTR000041', '2023-05-15', '2024-05-15', NOW(), NOW()),
(42, 2, 'ADH000042', 'CNTR000042', '2023-06-15', '2024-06-15', NOW(), NOW()),
(43, 3, 'ADH000043', 'CNTR000043', '2023-07-15', '2024-07-15', NOW(), NOW()),
(44, 4, 'ADH000044', 'CNTR000044', '2023-08-15', '2024-08-15', NOW(), NOW()),
(45, 5, 'ADH000045', 'CNTR000045', '2023-09-15', '2024-09-15', NOW(), NOW()),
(46, 1, 'ADH000046', 'CNTR000046', '2023-10-15', '2024-10-15', NOW(), NOW()),
(47, 2, 'ADH000047', 'CNTR000047', '2023-11-15', '2024-11-15', NOW(), NOW()),
(48, 3, 'ADH000048', 'CNTR000048', '2023-12-15', '2024-12-15', NOW(), NOW()),
(49, 4, 'ADH000049', 'CNTR000049', '2023-01-30', '2024-01-30', NOW(), NOW()),
(50, 5, 'ADH000050', 'CNTR000050', '2023-02-28', '2024-02-28', NOW(), NOW()),
(51, 1, 'ADH000051', 'CNTR000051', '2023-03-01', '2024-03-01', NOW(), NOW()),
(52, 2, 'ADH000052', 'CNTR000052', '2023-04-01', '2024-04-01', NOW(), NOW()),
(53, 3, 'ADH000053', 'CNTR000053', '2023-05-01', '2024-05-01', NOW(), NOW()),
(54, 4, 'ADH000054', 'CNTR000054', '2023-06-01', '2024-06-01', NOW(), NOW()),
(55, 5, 'ADH000055', 'CNTR000055', '2023-07-01', '2024-07-01', NOW(), NOW()),
(56, 1, 'ADH000056', 'CNTR000056', '2023-08-01', '2024-08-01', NOW(), NOW()),
(57, 2, 'ADH000057', 'CNTR000057', '2023-09-01', '2024-09-01', NOW(), NOW()),
(58, 3, 'ADH000058', 'CNTR000058', '2023-10-01', '2024-10-01', NOW(), NOW()),
(59, 4, 'ADH000059', 'CNTR000059', '2023-11-01', '2024-11-01', NOW(), NOW()),
(60, 5, 'ADH000060', 'CNTR000060', '2023-12-01', '2024-12-01', NOW(), NOW()),
(61, 1, 'ADH000061', 'CNTR000061', '2023-01-15', '2024-01-15', NOW(), NOW()),
(62, 2, 'ADH000062', 'CNTR000062', '2023-02-15', '2024-02-15', NOW(), NOW()),
(63, 3, 'ADH000063', 'CNTR000063', '2023-03-15', '2024-03-15', NOW(), NOW()),
(64, 4, 'ADH000064', 'CNTR000064', '2023-04-15', '2024-04-15', NOW(), NOW()),
(65, 5, 'ADH000065', 'CNTR000065', '2023-05-15', '2024-05-15', NOW(), NOW()),
(66, 1, 'ADH000066', 'CNTR000066', '2023-06-15', '2024-06-15', NOW(), NOW()),
(67, 2, 'ADH000067', 'CNTR000067', '2023-07-15', '2024-07-15', NOW(), NOW()),
(68, 3, 'ADH000068', 'CNTR000068', '2023-08-15', '2024-08-15', NOW(), NOW()),
(69, 4, 'ADH000069', 'CNTR000069', '2023-09-15', '2024-09-15', NOW(), NOW()),
(70, 5, 'ADH000070', 'CNTR000070', '2023-10-15', '2024-10-15', NOW(), NOW()),
(71, 1, 'ADH000071', 'CNTR000071', '2023-11-15', '2024-11-15', NOW(), NOW()),
(72, 2, 'ADH000072', 'CNTR000072', '2023-12-15', '2024-12-15', NOW(), NOW()),
(73, 3, 'ADH000073', 'CNTR000073', '2023-01-30', '2024-01-30', NOW(), NOW()),
(74, 4, 'ADH000074', 'CNTR000074', '2023-02-28', '2024-02-28', NOW(), NOW()),
(75, 5, 'ADH000075', 'CNTR000075', '2023-03-31', '2024-03-31', NOW(), NOW()),
(76, 1, 'ADH000076', 'CNTR000076', '2023-04-30', '2024-04-30', NOW(), NOW()),
(77, 2, 'ADH000077', 'CNTR000077', '2023-05-30', '2024-05-30', NOW(), NOW()),
(78, 3, 'ADH000078', 'CNTR000078', '2023-06-30', '2024-06-30', NOW(), NOW()),
(79, 4, 'ADH000079', 'CNTR000079', '2023-07-30', '2024-07-30', NOW(), NOW()),
(80, 5, 'ADH000080', 'CNTR000080', '2023-08-30', '2024-08-30', NOW(), NOW());

COMMIT;