## Functions to persist authentication state to a RDMS via [knex](https://knexjs.org)

#### DDL
		CREATE TABLE `user` (
		`pk` int(10) unsigned NOT NULL AUTO_INCREMENT,
		`username` varchar(50) NOT NULL,
		`password` varchar(255) NOT NULL,
		`password_secondary` varchar(255) DEFAULT NULL,
		`password_expiry_date` datetime DEFAULT NULL,
		`login_expiry_date` datetime DEFAULT NULL,
		`created_time` datetime DEFAULT NULL,
		`deactivate` varchar(3) NOT NULL DEFAULT 'no',
		`password_new` varchar(64) DEFAULT NULL,
		`last_login` datetime DEFAULT NULL,
		`type` enum('HUMAN','SYSTEM') NOT NULL DEFAULT 'HUMAN',
		`login_failed_count` int(10) unsigned DEFAULT 0,
		`last_login_failed` datetime DEFAULT NULL,
		PRIMARY KEY (`pk`),
		UNIQUE KEY `unique_1` (`username`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8
