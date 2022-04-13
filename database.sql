CREATE TABLE guests(
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,

    UNIQUE(username)
);

CREATE TABLE rooms(
    number INT NOT NULL PRIMARY KEY,
    price INT NOT NULL,
    advance INT NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'free',
    type VARCHAR(255) NOT NULL,

    UNIQUE(number)
);