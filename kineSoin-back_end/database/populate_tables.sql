SET client_encoding = 'UTF8';
BEGIN;

INSERT INTO afflictions ("name", "description", "insurance_code", "created_at") VALUES
('Douleur Lombaire', 'Douleur ou inconfort dans la région lombaire, souvent dû à une entorse musculaire ou des problèmes de disque.', 'LBP001', NOW()),
('Ostéoarthrite du Genou', 'Dégénérescence du cartilage dans l’articulation du genou, entraînant douleur et raideur.', 'OA001', NOW()),
('Tendinite', 'Inflammation d’un tendon, se produisant couramment au niveau du coude, de l’épaule ou du genou.', 'TEN001', NOW()),
('Lésion de la Coiffe des Rotateurs', 'Lésion des muscles ou tendons de l’épaule, provoquant douleur et mobilité limitée.', 'RC001', NOW()),
('Fasciite Plantaire', 'Inflammation du fascia plantaire, causant une douleur au talon, surtout le matin.', 'PF001', NOW()),
('Syndrome du Canal Carpien', 'Pression sur le nerf médian au niveau du poignet, entraînant douleur et engourdissement de la main.', 'CTS001', NOW()),
('Hernie Discale', 'État où le gel interne d’un disque spinal se prolonge, provoquant douleur au dos et problèmes nerveux.', 'HD001', NOW()),
('Sciatique', 'Douleur qui irradie le long du nerf sciatique, souvent due à une hernie discale.', 'SCA001', NOW()),
('Entorse de la Cheville', 'Blessure aux ligaments de la cheville, causant douleur, gonflement et mobilité limitée.', 'AS001', NOW()),
('Tendinite d’Achille', 'Inflammation du tendon d’Achille, causant douleur à l’arrière du talon.', 'AT001', NOW()),
('Épaule Gelée', 'Raideur et douleur dans l’articulation de l’épaule, limitant l’amplitude des mouvements.', 'FS001', NOW()),
('Radiculopathie Cervicale', 'Douleur nerveuse qui provient du cou en raison d’un nerf pincé.', 'CR001', NOW()),
('Épicondylite Latérale', 'Douleur et inflammation à l’extérieur du coude en raison d’un surmenage.', 'TE001', NOW()),
('Impingement de l’Épaule', 'Douleur à l’épaule causée par les tendons de la coiffe des rotateurs devenant coincés.', 'SI001', NOW()),
('Déchirure du Ménisque du Genou', 'Déchirure du cartilage du genou, provoquant douleur et gonflement.', 'MT001', NOW()),
('Coup de Lapin', 'Blessure au cou causée par un mouvement soudain, souvent lors d’accidents de voiture.', 'WH001', NOW()),
('Syndrome du Sortie Thoracique', 'Compression des nerfs ou des vaisseaux sanguins dans le cou, entraînant douleur aux épaules et au cou.', 'TOS001', NOW()),
('Bursite', 'Inflammation de la bourse, provoquant douleur et gonflement des articulations, couramment à l’épaule ou à la hanche.', 'BUR001', NOW()),
('Réhabilitation Post-Chirurgicale', 'Thérapie physique après une chirurgie pour restaurer la force et la mobilité.', 'PSR001', NOW()),
('Réhabilitation après AVC', 'Thérapie pour aider à retrouver la mobilité et la fonction après un AVC.', 'SR001', NOW());

INSERT INTO prescriptions ("medic_id", "patient_id", "affliction_id", "appointment_quantity", "at_home_care", "prescription_date", "picture_url", "created_at") VALUES
(1, 1, 1, 15, true, '2022-03-15', 'https://as2.ftcdn.net/v2/jpg/00/51/75/59/1000_F_51755902_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 2, 2, 10, false, '2022-04-20', 'https://as2.ftcdn.net/v2/jpg/00/51/75/59/1000_F_51755902_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 3, 3, 8, true, '2022-05-11', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 4, 4, 12, true, '2022-01-10', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 5, 5, 5, false, '2022-07-22', 'https://as2.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 6, 6, 20, true, '2022-06-18', 'https://as4.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 7, 7, 14, false, '2022-08-29', 'https://as5.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 8, 8, 16, true, '2022-09-11', 'https://as2.ftcdn.net/v2/jpg/00/51/75/59/1000_F_51755902_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 9, 9, 7, false, '2022-10-15', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 10, 10, 4, true, '2022-11-30', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 11, 11, 15, true, '2022-12-12', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 12, 12, 10, false, '2022-01-02', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 13, 13, 8, true, '2022-03-03', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 14, 14, 12, true, '2022-02-14', 'https://as2.ftcdn.net/v2/jpg/00/51/75/59/1000_F_51755902_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 15, 15, 6, false, '2022-04-04', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 16, 1, 20, true, '2022-05-05', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 17, 2, 10, false, '2022-06-15', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 18, 3, 18, true, '2022-07-25', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 19, 4, 14, true, '2022-08-05', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 20, 5, 10, false, '2022-09-05', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 21, 6, 15, true, '2022-10-15', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 22, 7, 7, false, '2022-11-25', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 23, 8, 6, true, '2022-12-15', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 24, 9, 20, true, '2022-01-20', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 25, 10, 11, false, '2022-02-10', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 26, 11, 5, true, '2022-03-15', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 27, 12, 8, false, '2022-04-20', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 28, 13, 9, true, '2022-05-11', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 29, 14, 12, true, '2022-01-10', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 30, 15, 15, false, '2022-07-22', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 31, 1, 4, true, '2022-06-18', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 32, 2, 13, true, '2022-08-29', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 33, 3, 16, false, '2022-09-11', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 34, 4, 5, true, '2022-10-15', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 35, 5, 8, false, '2022-11-30', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 36, 6, 9, true, '2022-12-12', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 37, 7, 10, false, '2022-01-02', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 38, 8, 11, true, '2022-03-03', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 39, 9, 12, false, '2022-04-04', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 40, 10, 18, true, '2022-05-05', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 41, 11, 15, true, '2022-06-15', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 42, 12, 7, false, '2022-07-25', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(4, 43, 13, 6, true, '2022-08-05', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 44, 14, 5, true, '2022-09-05', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(5, 45, 15, 20, false, '2022-10-15', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 46, 1, 15, true, '2022-11-20', 'https://as3.ftcdn.net/v2/jpg/00/51/75/61/1000_F_51756100_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(1, 47, 2, 10, false, '2022-12-05', 'https://as4.ftcdn.net/v2/jpg/00/51/75/62/1000_F_51756200_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 48, 3, 8, true, '2022-01-12', 'https://as5.ftcdn.net/v2/jpg/00/51/75/63/1000_F_51756300_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(2, 49, 4, 12, true, '2022-02-15', 'https://as2.ftcdn.net/v2/jpg/00/51/75/64/1000_F_51756400_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW()),
(3, 50, 5, 18, false, '2022-03-10', 'https://as1.ftcdn.net/v2/jpg/00/51/75/60/1000_F_51756000_BnBi2Xrc7U24AYt2bZn5eRAV9wo0PsNQ.jpg', NOW());


INSERT INTO appointments ("prescription_id", "date", "time", "created_at") VALUES
(1, '2022-01-12', '15:00:00', NOW()),
(2, '2022-01-13', '09:00:00', NOW()),
(3, '2022-01-15', '11:00:00', NOW()),
(4, '2022-01-16', '10:30:00', NOW()),
(5, '2022-01-20', '14:00:00', NOW()),
(6, '2022-01-22', '16:00:00', NOW()),
(7, '2022-01-25', '13:00:00', NOW()),
(8, '2022-01-28', '17:00:00', NOW()),
(9, '2022-02-01', '15:30:00', NOW()),
(10, '2022-02-05', '10:00:00', NOW()),
(11, '2022-02-07', '14:30:00', NOW()),
(12, '2022-02-10', '09:00:00', NOW()),
(13, '2022-02-12', '16:15:00', NOW()),
(14, '2022-02-15', '11:45:00', NOW()),
(15, '2022-02-18', '10:00:00', NOW()),
(16, '2022-02-20', '13:30:00', NOW()),
(17, '2022-02-22', '09:30:00', NOW()),
(18, '2022-02-25', '14:00:00', NOW()),
(19, '2022-03-01', '11:00:00', NOW()),
(20, '2022-03-05', '15:00:00', NOW()),
(21, '2022-03-08', '10:30:00', NOW()),
(22, '2022-03-10', '14:15:00', NOW()),
(23, '2022-03-12', '09:45:00', NOW()),
(24, '2022-03-15', '16:00:00', NOW()),
(25, '2022-03-18', '13:00:00', NOW()),
(26, '2022-03-20', '11:30:00', NOW()),
(27, '2022-03-22', '10:00:00', NOW()),
(28, '2022-03-25', '15:30:00', NOW()),
(29, '2022-03-30', '09:00:00', NOW()),
(30, '2022-04-01', '14:30:00', NOW()),
(31, '2022-04-05', '11:15:00', NOW()),
(32, '2022-04-10', '16:45:00', NOW()),
(33, '2022-04-12', '09:30:00', NOW()),
(34, '2022-04-15', '13:00:00', NOW()),
(35, '2022-04-18', '10:00:00', NOW()),
(36, '2022-04-20', '15:00:00', NOW()),
(37, '2022-04-22', '10:30:00', NOW()),
(38, '2022-04-25', '14:15:00', NOW()),
(39, '2022-04-28', '11:45:00', NOW()),
(40, '2022-05-01', '16:00:00', NOW()),
(41, '2022-05-05', '13:00:00', NOW()),
(42, '2022-05-08', '09:30:00', NOW()),
(43, '2022-05-12', '14:00:00', NOW()),
(44, '2022-05-15', '11:00:00', NOW()),
(45, '2022-05-20', '15:30:00', NOW()),
(46, '2022-05-22', '10:00:00', NOW()),
(47, '2022-05-25', '14:30:00', NOW()),
(48, '2022-05-28', '11:15:00', NOW()),
(49, '2022-06-01', '16:45:00', NOW()),
(50, '2022-06-05', '13:00:00', NOW());

INSERT INTO patient_messages ("therapist_id", "patient_id", "content", "date", "time", "created_at") VALUES
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

INSERT INTO therapist_messages ("therapist_id", "patient_id", "content", "date", "time", "created_at") VALUES
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


COMMIT;