CREATE TABLE OPERATOR
(
    INTERNAL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    EXTERNAL_ID BINARY(16)   NOT NULL UNIQUE DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    CREATED_AT  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT  DATETIME  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    NAME        VARCHAR(300) NOT NULL,
    EMAIL       VARCHAR(150) NOT NULL UNIQUE,
    PASSWORD    TEXT         NOT NULL
);

CREATE TABLE ACTOR
(
    INTERNAL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    EXTERNAL_ID BINARY(16)   NOT NULL UNIQUE DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    CREATED_AT  DATETIME                     DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT  DATETIME                     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    NAME        VARCHAR(300) NOT NULL,
    BIRTHDAY    DATE         NOT NULL,
    ADDED_BY    INT UNSIGNED NOT NULL,
    CONSTRAINT FK_ACTOR_ADDED_BY_OPERATOR
        FOREIGN KEY (ADDED_BY) REFERENCES OPERATOR (INTERNAL_ID),
    EDITED_BY   INT UNSIGNED,
    CONSTRAINT FK_ACTOR_EDITED_BY_OPERATOR
        FOREIGN KEY (EDITED_BY) REFERENCES OPERATOR (INTERNAL_ID)
);

CREATE TABLE MOVIE
(
    INTERNAL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    EXTERNAL_ID BINARY(16)   NOT NULL UNIQUE DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    CREATED_AT  DATETIME                     DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT  DATETIME                     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    TITLE       VARCHAR(150) NOT NULL,
    AUTHOR_NAME VARCHAR(300) NOT NULL,

    ADDED_BY    INT UNSIGNED NOT NULL,
    CONSTRAINT FK_MOVIE_ADDED_BY_OPERATOR
        FOREIGN KEY (ADDED_BY) REFERENCES OPERATOR (INTERNAL_ID),
    EDITED_BY   INT UNSIGNED,
    CONSTRAINT FK_MOVIE_EDITED_BY_OPERATOR
        FOREIGN KEY (EDITED_BY) REFERENCES OPERATOR (INTERNAL_ID)
);

CREATE TABLE MOVIES_CAST
(
    INTERNAL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    EXTERNAL_ID BINARY(16)   NOT NULL UNIQUE DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    FK_MOVIE    INT UNSIGNED NOT NULL,
    FK_ACTOR    INT UNSIGNED NOT NULL,
    ADDED_BY    INT UNSIGNED NOT NULL,
    CONSTRAINT FK_MOVIES_CAST_ADDED_BY_OPERATOR
        FOREIGN KEY (ADDED_BY) REFERENCES OPERATOR (INTERNAL_ID),
    EDITED_BY    INT UNSIGNED,
    CONSTRAINT FK_MOVIES_CAST_EDITED_BY_OPERATOR
        FOREIGN KEY (EDITED_BY) REFERENCES OPERATOR (INTERNAL_ID),
    CONSTRAINT FK_MOVIE_CAST_MOVIE
        FOREIGN KEY (FK_MOVIE) REFERENCES MOVIE (INTERNAL_ID),
    CONSTRAINT FK_MOVIE_CAST_ACTOR
        FOREIGN KEY (FK_ACTOR) REFERENCES ACTOR (INTERNAL_ID)
);

CREATE TABLE STREAM_PLATFORM
(
    INTERNAL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    EXTERNAL_ID BINARY(16)   NOT NULL UNIQUE DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    CREATED_AT  DATETIME                     DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT  DATETIME                     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    NAME        VARCHAR(150) NOT NULL UNIQUE,
    ADDED_BY    INT UNSIGNED NOT NULL,
    CONSTRAINT FK_STREAM_PLATFORM_ADDED_BY_OPERATOR
        FOREIGN KEY (ADDED_BY) REFERENCES OPERATOR (INTERNAL_ID),
    EDITED_BY    INT UNSIGNED,
    CONSTRAINT FK_STREAM_PLATFORM_EDITED_BY_OPERATOR
        FOREIGN KEY (EDITED_BY) REFERENCES OPERATOR (INTERNAL_ID)
);



CREATE TABLE CATALOG
(
    INTERNAL_ID        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    FK_STREAM_PLATFORM INT UNSIGNED,
    FK_MOVIE           INT UNSIGNED,
    CREATED_AT         DATETIME DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT         DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ADDED_BY    INT UNSIGNED NOT NULL,
    CONSTRAINT FK_CATALOG_ADDED_BY_OPERATOR
        FOREIGN KEY (ADDED_BY) REFERENCES OPERATOR (INTERNAL_ID),
   
    CONSTRAINT FK_CATALOG_STREAM_PLATFORM
        FOREIGN KEY (FK_STREAM_PLATFORM) REFERENCES STREAM_PLATFORM (INTERNAL_ID),
    CONSTRAINT FK_CATALOG_MOVIE
        FOREIGN KEY (FK_MOVIE) REFERENCES MOVIE (INTERNAL_ID)
);



CREATE TABLE REVIEWER
(
    INTERNAL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    EXTERNAL_FK BINARY(16)   NOT NULL,
    CREATED_AT  DATETIME DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    NAME        VARCHAR(300) NOT NULL
);

CREATE TABLE ACTOR_REVIEW
(
    INTERNAL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    REVIEW      TEXT         NOT NULL,
    FK_MOVIE    INT UNSIGNED NOT NULL,
    FK_ACTOR    INT UNSIGNED NOT NULL,
    FK_REVIEWER INT UNSIGNED NOT NULL,
    CONSTRAINT FK_ACTOR_REVIEW_MOVIE
        FOREIGN KEY (FK_MOVIE) REFERENCES MOVIE (INTERNAL_ID),
    CONSTRAINT FK_ACTOR_REVIEW_ACTOR
        FOREIGN KEY (FK_ACTOR) REFERENCES ACTOR (INTERNAL_ID),
    CONSTRAINT FK_ACTOR_REVIEW_REVIEWER
        FOREIGN KEY (FK_REVIEWER) REFERENCES REVIEWER (INTERNAL_ID)
);

CREATE TABLE REVIEW_TOPIC
(
    INTERNAL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    TITLE       VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE FULL_MOVIE_REVIEW
(
    INTERNAL_ID        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    EXTERNAL_ID        BINARY(16)   NOT NULL UNIQUE DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    CREATED_AT         DATETIME                     DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT         DATETIME                     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FK_REVIEWER        INT UNSIGNED NOT NULL,
    FK_MOVIE           INT UNSIGNED NOT NULL,
    TITLE              VARCHAR(150) NOT NULL,
    REVIEW_DESCRIPTION VARCHAR(600) NOT NULL,
    NEGATIVES_POINTS   VARCHAR(200),
    POSITIVE_POINTS    VARCHAR(200),
    CONSTRAINT FK_FULL_MOVIE_REVIEW_REVIEWER
        FOREIGN KEY (FK_REVIEWER) REFERENCES REVIEWER (INTERNAL_ID),
    CONSTRAINT FK_FULL_MOVIE_REVIEW_MOVIE
        FOREIGN KEY (FK_MOVIE) REFERENCES MOVIE (INTERNAL_ID)

);

CREATE TABLE MOVIE_SCORE_ON_TOPIC
(
    INTERNAL_ID          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    EXTERNAL_ID          BINARY(16)   NOT NULL,
    SCORE                TINYINT      NOT NULL,
    FK_FULL_MOVIE_REVIEW INT UNSIGNED NOT NULL,
    FK_TOPIC             INT UNSIGNED NOT NULL,
    CONSTRAINT FK_MOVIE_SCORE_ON_TOPIC_MOVIE
        FOREIGN KEY (FK_FULL_MOVIE_REVIEW) REFERENCES FULL_MOVIE_REVIEW (INTERNAL_ID),
    CONSTRAINT FK_MOVIE_SCORE_ON_TOPIC_TOPIC
        FOREIGN KEY (FK_TOPIC) REFERENCES REVIEW_TOPIC (INTERNAL_ID)
);