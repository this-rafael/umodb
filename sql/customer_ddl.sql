CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE CUSTOMER
(
    INTERNAL_ID SERIAL PRIMARY KEY,
    EXTERNAL_ID UUID      DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    CREATED_AT  TIMESTAMP DEFAULT now()                     NOT NULL,
    UPDATED_AT  TIMESTAMP DEFAULT now()                     NOT NULL,
    NAME        VARCHAR(300)                                NOT NULL,
    EMAIL       VARCHAR(150)                                NOT NULL UNIQUE,
    PASSWORD    VARCHAR(150)                                NOT NULL,
    GENDER      VARCHAR(100)                                NOT NULL,
    BIRTHDAY    DATE                                        NOT NULL
);

CREATE TABLE MOVIE_SCORE
(
    INTERNAL_ID       SERIAL PRIMARY KEY,
    EXTERNAL_ID       UUID      DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    CREATED_AT        TIMESTAMP DEFAULT now()                     NOT NULL,
    UPDATED_AT        TIMESTAMP DEFAULT now()                     NOT NULL,
    SCORE             SMALLINT                                    NOT NULL,
    FK_CUSTOMER       INTEGER                                     NOT NULL REFERENCES CUSTOMER (INTERNAL_ID),
    EXTERNAL_FK_MOVIE uuid                                        NOT NULL
);

CREATE TABLE REVIEW
(
    INTERNAL_ID       SERIAL PRIMARY KEY,
    EXTERNAL_ID       UUID      DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    CREATED_AT        TIMESTAMP DEFAULT now()                     NOT NULL,
    UPDATED_AT        TIMESTAMP DEFAULT now()                     NOT NULL,
    TITLE             VARCHAR(150)                                NOT NULL,
    DESCRIPTION       TEXT                                        NOT NULL,
    FK_CUSTOMER       INTEGER                                     NOT NULL REFERENCES CUSTOMER (INTERNAL_ID),
    EXTERNAL_FK_MOVIE uuid                                        NOT NULL
);

CREATE TABLE COMMENT_OF_REVIEW
(
    INTERNAL_ID  SERIAL PRIMARY KEY,
    EXTERNAL_ID  UUID      DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    CREATED_AT   TIMESTAMP DEFAULT now()                     NOT NULL,
    UPDATED_AT   TIMESTAMP DEFAULT now()                     NOT NULL,
    COMMENT      TEXT                                        NOT NULL,
    COMMENTED_BY INTEGER                                     NOT NULL REFERENCES CUSTOMER (INTERNAL_ID),
    COMMENT_ON   INTEGER                                     NOT NULL REFERENCES REVIEW (INTERNAL_ID)
);

CREATE TABLE REVIEW_EVALUATION
(
    INTERNAL_ID  SERIAL PRIMARY KEY,
    EXTERNAL_ID  UUID      DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    CREATED_AT   TIMESTAMP DEFAULT now()                     NOT NULL,
    UPDATED_AT   TIMESTAMP DEFAULT now()                     NOT NULL,
    EVALUATION      SMALLINT                                        NOT NULL,
    EVALUATED_BY INTEGER                                     NOT NULL REFERENCES CUSTOMER (INTERNAL_ID),
    COMMENT_ON   INTEGER                                     NOT NULL REFERENCES REVIEW (INTERNAL_ID)
);


CREATE TABLE LOVED_MOVIES
(
    INTERNAL_ID       SERIAL PRIMARY KEY,
    EXTERNAL_ID       UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    EXTERNAL_FK_MOVIE uuid                                   NOT NULL,
    LOVED_BY          INTEGER                                NOT NULL REFERENCES CUSTOMER (INTERNAL_ID)
);