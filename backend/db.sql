CREATE DATABASE nchat;

-- Создание таблиц

CREATE TABLE  users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(300) NOT NULL,
    avatar TEXT NOT NULL
);

CREATE TABLE discussions (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    poster TEXT
);

CREATE TABLE users_discussion (
    user_id INTEGER NOT NULL,
    discussion_id INTEGER NOT NULL,
    creator BOOLEAN NOT NULL,
    PRIMARY KEY(user_id, discussion_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (discussion_id) REFERENCES discussions (id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    date_send TIMESTAMP NOT NULL,
    message_body TEXT NOT NULL,
    image TEXT,
    user_id INTEGER NOT NULL,
    discussion_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (discussion_id) REFERENCES discussions (id) ON DELETE CASCADE
);

-- CREATE TABLE creators_discussions (
--     user_id INTEGER,
--     discussion_id INTEGER NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
--     FOREIGN KEY (discussion_id) REFERENCES discussions (id) ON DELETE CASCADE
-- );


