CREATE TABLE guests(
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,

    UNIQUE(username)
);

CREATE TABLE rooms(
    number VARCHAR(64) NOT NULL PRIMARY KEY,
    price INT NOT NULL,
    advance INT NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'free',
    type VARCHAR(255) NOT NULL,

    UNIQUE(number)
);

CREATE TABLE bookings(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    booking_from DATE NOT NULL,
    booking_to DATE NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'done',

    guest_username VARCHAR(255) NOT NULL REFERENCES guests(username),
    room_number VARCHAR(64) NOT NULL REFERENCES rooms(number),

    UNIQUE(id)
);