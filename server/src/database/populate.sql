USE db;
DELETE FROM Users;
DELETE FROM AccountTypes;
DELETE FROM CarOffers;
DELETE FROM Equipments;
DELETE FROM Ratings;
DELETE FROM Services;
DELETE FROM OpeningHours;

INSERT INTO Users (firstName, lastName, email, pwdHash, accountType) VALUES
('Vincent', 'Parrot', 'vincent.parrot@garagevp.fr', 'e1893179c42a9e132b759bbf23c46207', 1),
('Simone', 'Martin', 'simone.martin@garagevp.fr', '38882c09b8a54c96f4ea816a0de505c7', 2),
('Charles', 'Li', 'charles.li@garagevp.fr', 'd4425da531cb43242cd11c8c4c340d32', 2);

INSERT INTO AccountTypes (name) VALUES
('Administrator'),
('Employee');

INSERT INTO CarOffers (title, description, priceInCents, manufacturer, model, year, mileageInKm, fuelType, gearboxType, carType, color, numberOfDoors, numberOfSeats, taxHorsePower, horsePower, equipments, creationDateUnix, authorId, sold) VALUES
('Renault Clio Essence 2021 91ch', 'Super voiture !', 1425000, 'Renault', 'Clio', 2021, 24000, 'Essence', 'Manuelle', 'Berline', 'Grise', 5, 5, 5, 91, '1,2,4,9,10,14,15,16,19,20,21,22', UNIX_TIMESTAMP(), 1, 1),
('Peugeot 108 Essence 2019 72ch', 'Super voiture !', 899000, 'Peugeot', '108', 2019, 63010, 'Essence', 'Manuelle', 'Berline', 'Grise', 5, 4, 3, 72, '1,4,10,12,16,17,20,21', UNIX_TIMESTAMP(), 2, 0),
('Fiat 500 Essence 2012 85ch', 'Super voiture !', 950000, 'Fiat', '500', 2012, 28000, 'Essence', 'Automatique', 'Berline', 'Blanche', 3, 4, 4, 85, '16,17,20,21', UNIX_TIMESTAMP(), 3, 0),
('Volkswagen Polo Diesel 2010 90ch', 'Super voiture !', 700000, 'Volkswagen', 'Polo', 2010, 220509, 'Diesel', 'Automatique', 'Berline', 'Noire', 3, 5, 5, 90, '1,2,4,10,11,13,16,17,20,21', UNIX_TIMESTAMP(), 3, 0),
('Kia e-Niro Electrique 2022 204ch', 'Super voiture !', 2190000, 'Kia', 'e-Niro', 2022, 126000, 'Electrique', 'Automatique', 'SUV', 'Blanche', 5, 5, 3, 204, '1,2,3,5,9,10,11,12,14,15,16,18,20,21,22,23,24,25', UNIX_TIMESTAMP(), 2, 0);

INSERT INTO Equipments (name) VALUES
('Navigation'),
('Allumage automatique des essuie-glaces'),
('Allumage automatique des feux de croisement'),
('Jantes alu 16"'),
('Jantes alu 17"'),
('Jantes alu 18"'),
('Jantes alu 19"'),
('Jantes alu 20"'),
('Rétroviseurs extérieurs rabattables électriquement'),
('Climatisation automatique'),
('Climatisation bizone'),
('Siège conducteur réglable électriquement'),
('Feux avant xénon'),
('Feux avant LED'),
('Feux arrière LED'),
('Régulateur de vitesse'),
('Sellerie tissu'),
('Sellerie cuir'),
('Sellerie cuir vegan'),
('Airbags frontaux'),
('Airbags latéraux'),
('Assistance au frénage d''urgence'),
('Sièges avant chauffants'),
('Sièges avant ventilés'),
('Volant chauffant');

INSERT INTO Ratings (authorName, comment, rating, creationDateUnix, approved, approverId) VALUES
('niceVisitor1', 'Très satisfait des services de ce garage ! Je recommande.', 5, 1693984973, 1, 1),
('niceVisitor2', 'Employés très compétents et accueillants mais tarifs un peu élevés.', 4, 1694987973, 1, 2),
('trollDuNet666', 'Tous des bouffons et leurs bagnoles sont pourries !! Ils peuvent se les mettre où je pense.', 1, 1695989973, 0, 3),
('niceVisitor3', 'J''ai été pris en charge rapidement et la qualité des réparations est impeccable !', 5, 1696982973, 0, null),
('angryVisitor1', 'J''ai dû attendre deux semaines pour récupérer ma voiture et aucun geste commercial n''a été fait. Très déçue.', 2, UNIX_TIMESTAMP(), 0, null);

INSERT INTO Services (name, description) VALUES
('Réparations mécanique', 'Toutes réparations de la mécanique de votre véhicule. Merci de contacter le garage pour prendre rendez-vous et effectuer un devis.'),
('Réparations carrosserie', 'Toutes réparations de la carrosserie de votre véhicule. Merci de contacter le garage pour prendre rendez-vous et effectuer un devis.'),
('Peinture carrosserie', 'Complément de réparation de carrosserie, rajeunissement de couleur ou changement de look. Merci de contacter le garage pour obtenir un devis.'),
('Entretien', 'Changement de toute pièce d''usure, vidange, contrôle des niveaux de fluides, etc... Merci de contacter le garage pour prendre rendez-vous.'),
('Géométrie', 'Changement de pneumatiques, parallélisme, équilibrage. Merci de contacter le garage pour prendre rendez-vous.'),
('Vente véhicules d''occasion', 'Nous proposons une liste des véhicules d''occasion en vente dans notre garage. Vous pouvez la consulter dans la section dédiée. N''hésitez pas à nous contacter pour obtenir plus d''informations.');

INSERT INTO OpeningHours (dayOfWeek, openingTime, closingTime, breakStartTime, breakEndTime) VALUES
('Lundi', '7:00', '19:00', '12:00', '14:00'),
('Mardi', '7:00', '19:00', '12:00', '14:00'),
('Mercredi', '7:00', '19:00', null, null),
('Jeudi', '7:00', '19:00', '12:00', '14:00'),
('Vendredi', '7:00', '19:00', '12:00', '14:00'),
('Samedi', '7:00', '19:00', null, null),
('Dimanche', null, null, null, null);
