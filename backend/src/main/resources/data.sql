INSERT INTO profesor (nombre) VALUES ('Carlos');
INSERT INTO profesor (nombre) VALUES ('Ana');
INSERT INTO profesor (nombre) VALUES ('Luis');
INSERT INTO profesor (nombre) VALUES ('Miguel');
INSERT INTO profesor (nombre) VALUES ('Angel');

INSERT INTO materia (nombre, id_profesor) VALUES ('Matematicas', 1);
INSERT INTO materia (nombre, id_profesor) VALUES ('Ciencias', 2);
INSERT INTO materia (nombre, id_profesor) VALUES ('Programacion', 3);
INSERT INTO materia (nombre, id_profesor) VALUES ('BaseDatos', 4);
INSERT INTO materia (nombre, id_profesor) VALUES ('Redes', 5);

INSERT INTO alumno (nombre, apellido) VALUES ('Alexandra', 'Perez');
INSERT INTO alumno (nombre, apellido) VALUES ('Maria', 'Gomez');
INSERT INTO alumno (nombre, apellido) VALUES ('Mario', 'Lopez');
INSERT INTO alumno (nombre, apellido) VALUES ('Sofia', 'Martinez');
INSERT INTO alumno (nombre, apellido) VALUES ('Pedro', 'Ramirez');

INSERT INTO alumno_materia (id_alumno, id_materia) VALUES (1,1);
INSERT INTO alumno_materia (id_alumno, id_materia) VALUES (2,2);
INSERT INTO alumno_materia (id_alumno, id_materia) VALUES (3,3);
INSERT INTO alumno_materia (id_alumno, id_materia) VALUES (4,4);
INSERT INTO alumno_materia (id_alumno, id_materia) VALUES (5,5);

INSERT INTO nota (valor, id_alumno, id_materia) VALUES (8.5, 1, 1);
INSERT INTO nota (valor, id_alumno, id_materia) VALUES (7.0, 2, 2);
INSERT INTO nota (valor, id_alumno, id_materia) VALUES (9.5, 3, 3);
INSERT INTO nota (valor, id_alumno, id_materia) VALUES (6.5, 4, 4);
INSERT INTO nota (valor, id_alumno, id_materia) VALUES (10.0, 5, 5);