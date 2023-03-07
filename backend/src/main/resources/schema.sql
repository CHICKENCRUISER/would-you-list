DROP TABLE IF EXISTS todo;
CREATE TABLE todo (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       user VARCHAR (255),
                       todo_name VARCHAR (255),
                       plan_date VARCHAR (255),
                       category VARCHAR (255),
                       todo_content VARCHAR (255),
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
                        review_title VARCHAR (255),
                        review_content VARCHAR (255),
                        done_date VARCHAR (255),
                        place VARCHAR (255),
                        expression VARCHAR (255),
                        review_photo_id BIGINT
);

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user;
SET foreign_key_checks = 1;
CREATE TABLE user (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        email VARCHAR (255) ,
                        password VARCHAR (255),
                        username VARCHAR (255),
                        user_photo_id BIGINT
);