


CREATE SCHEMA IF NOT EXISTS `database`;
USE `database`;


CREATE TABLE IF NOT EXISTS `User` (
    'id' int(11) NOT NULL AUTO_INCREMENT,
    'email' varchar(128) COLLATE utf8_unicode_ci NOT NULL
    )