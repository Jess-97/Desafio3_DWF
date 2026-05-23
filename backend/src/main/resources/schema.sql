CREATE DATABASE IF NOT EXISTS sistema_escolar;
USE sistema_escolar;

CREATE TABLE IF NOT EXISTS profesor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS materia (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    id_profesor BIGINT,
    CONSTRAINT fk_materia_profesor
        FOREIGN KEY (id_profesor) REFERENCES profesor(id)
);

CREATE TABLE IF NOT EXISTS alumno (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS alumno_materia (
    id_alumno BIGINT NOT NULL,
    id_materia BIGINT NOT NULL,
    PRIMARY KEY (id_alumno, id_materia),
    CONSTRAINT fk_alumno
        FOREIGN KEY (id_alumno) REFERENCES alumno(id),
    CONSTRAINT fk_materia
        FOREIGN KEY (id_materia) REFERENCES materia(id)
);

CREATE TABLE IF NOT EXISTS nota (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    valor DOUBLE NOT NULL,
    id_alumno BIGINT NOT NULL,
    id_materia BIGINT NOT NULL,
    created_at DATETIME,
    CONSTRAINT fk_nota_alumno
        FOREIGN KEY (id_alumno) REFERENCES alumno(id),
    CONSTRAINT fk_nota_materia
        FOREIGN KEY (id_materia) REFERENCES materia(id)
);

CREATE TABLE IF NOT EXISTS usuario (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    age INT,
    password VARCHAR(255) NOT NULL
);