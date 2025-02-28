﻿CREATE TABLE user (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash BLOB NOT NULL,
    password_salt BLOB NOT NULL,
    is_admin INTEGER NOT NULL DEFAULT 0
);