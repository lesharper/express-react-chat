CREATE DATABASE nchat;
\connect nchat

\! chcp 1251
set client_encoding='win1251';

CREATE TABLE  users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(300) NOT NULL,
  avatar VARCHAR(300) NOT NULL
);

CREATE TABLE discussions (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    image VARCHAR(300) NOT NULL,
    creator_id INTEGER NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  dateSend TIMESTAMP,
  messageBody TEXT,
  user_id INTEGER,
  discussion_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (discussion_id) REFERENCES discussions (id) ON DELETE CASCADE
);

CREATE TABLE users_discussion (
  user_id INTEGER,
  discussion_id INTEGER,
  PRIMARY KEY(user_id, discussion_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (discussion_id) REFERENCES discussions (id) ON DELETE CASCADE
);

psql
