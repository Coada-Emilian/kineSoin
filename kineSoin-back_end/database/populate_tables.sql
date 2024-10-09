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



COMMIT;