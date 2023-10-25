CREATE DATABASE IF NOT EXISTS `db`;
USE db;

-- Table that stores all user info, including the password hash and the account type that determines permissions
CREATE TABLE IF NOT EXISTS `Users` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `firstName` varchar(128) NOT NULL COMMENT 'pii',
    `lastName` varchar(128) NOT NULL COMMENT 'pii',
    `email` varchar(128) NOT NULL COMMENT 'pii',
    `pwdHash` varchar(256) NOT NULL,
    `accountType` tinyint(4) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    KEY `email` (`email`)
);

-- Table that stores the different account types available
CREATE TABLE IF NOT EXISTS `AccountTypes` (
    `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(64) NOT NULL,
    PRIMARY KEY (`id`)
);

-- Table that stores all the car offers and their related info
CREATE TABLE IF NOT EXISTS `CarOffers` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `title` varchar(128) NOT NULL,
    `description` varchar(512) DEFAULT NULL,
    `priceInCents` int(11) unsigned NOT NULL,
    `manufacturer` varchar(32) NOT NULL,
    `model` varchar(32) NOT NULL,
    `year` smallint(6) unsigned NOT NULL,
    `mileageInKm` int(11) unsigned NOT NULL,
    `fuelType` varchar(32) NOT NULL,
    `gearboxType` varchar(32) NOT NULL,
    `carType` varchar (32) NOT NULL,
    `color` varchar(16) NOT NULL,
    `numberOfDoors` tinyint(4) unsigned NOT NULL,
    `numberOfSeats` tinyint(4) unsigned NOT NULL,
    `taxHorsePower` tinyint(4) unsigned NOT NULL,
    `horsePower` smallint(6) unsigned NOT NULL,
    `equipments` varchar(1024) DEFAULT NULL, -- List of equipment ids separated by commas
    `creationDateUnix` int(11) unsigned NOT NULL,
    `authorId` int(11) unsigned NOT NULL,
    `sold` boolean NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    KEY `manufacturer` (`manufacturer`),
    KEY `year` (`year`),
    KEY `fuelType` (`fuelType`),
    KEY `authorId` (`authorId`)
);

-- Table that stores all the different equipments that a car can have
CREATE TABLE IF NOT EXISTS `Equipments` (
    `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(128) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
);

-- Table that stores all the ratings and comments
CREATE TABLE IF NOT EXISTS `Ratings` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `authorName` varchar(128) NOT NULL,
    `comment` varchar(512) DEFAULT NULL,
    `rating` tinyint(4) unsigned NOT NULL,
    `creationDateUnix` int(11) unsigned NOT NULL,
    `approved` boolean NOT NULL DEFAULT 0,
    `approverId` int(11) unsigned DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `approverId` (`approverId`)
);

-- Table that stores all the repair services that the garage offers
CREATE TABLE IF NOT EXISTS `Services` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(128) NOT NULL,
    `description` varchar(512) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
);

-- Table that stores the garage's opening hours
CREATE TABLE IF NOT EXISTS `OpeningHours` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `dayOfWeek` varchar(16) NOT NULL,
    `openingTime` varchar(8) DEFAULT NULL,
    `closingTime` varchar(8) DEFAULT NULL,
    `breakStartTime` varchar(8) DEFAULT NULL,
    `breakEndTime` varchar(8) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `dayOfWeek` (`dayOfWeek`)
);
