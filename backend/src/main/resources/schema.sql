DROP TABLE IF EXISTS todo;
CREATE TABLE todo (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       user VARCHAR (255),
                       name VARCHAR (255),
                       date VARCHAR (255),
                       category VARCHAR (255),
                       content VARCHAR (255),
                       state BOOLEAN DEFAULT FALSE,
                       review_id BIGINT,
                       user_id BIGINT
);

DROP TABLE IF EXISTS upload_file;
CREATE TABLE upload_file (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        original_file_name VARCHAR (255),
                        full_path VARCHAR (255)
);

DROP TABLE IF EXISTS review;
CREATE TABLE review (
                        Id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR (255),
                        review VARCHAR (255),
                        done_date VARCHAR (255),
                        place VARCHAR (255),
                        expression VARCHAR (255),
                        photo_id BIGINT
);

DROP TABLE IF EXISTS user_account;
CREATE TABLE user_account (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        email VARCHAR (255) ,
                        password VARCHAR (255),
                        name VARCHAR (255),
                        user_photo_id BIGINT
);