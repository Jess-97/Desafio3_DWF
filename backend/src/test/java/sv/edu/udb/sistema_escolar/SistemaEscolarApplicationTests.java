package sv.edu.udb.sistema_escolar;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.annotation.Commit;

import sv.edu.udb.sistema_escolar.Repository
		.AlumnoRepository;

import sv.edu.udb.sistema_escolar.Repository
		.MateriaRepository;

import sv.edu.udb.sistema_escolar.Repository
		.ProfesorRepository;

import sv.edu.udb.sistema_escolar.enity.*;

import java.util.HashSet;

@SpringBootTest

class SistemaEscolarApplicationTests {

	@Autowired
	private ProfesorRepository profesorRepo;

	@Autowired
	private MateriaRepository materiaRepo;

	@Autowired
	private AlumnoRepository alumnoRepo;

	@Test

	@Commit

	void pruebaInsercion() {

		// =========================
		// INSERTAR PROFESORES
		// =========================

		Profesor p1 = Profesor.builder()

				.nombre("Miguel Dias")

				.build();

		Profesor p2 = Profesor.builder()

				.nombre("Sandra Ruiz")

				.build();

		profesorRepo.save(p1);
		profesorRepo.save(p2);

		// =========================
		// INSERTAR MATERIAS
		// =========================

		Materia m1 = Materia.builder()

				.nombre("Calculo")

				.profesor(p1)

				.build();

		Materia m2 = Materia.builder()

				.nombre("Programacion Web")

				.profesor(p2)

				.build();

		materiaRepo.save(m1);
		materiaRepo.save(m2);

		// =========================
		// RELACIONAR MATERIAS
		// =========================

		HashSet<Materia> lista1 =
				new HashSet<>();

		lista1.add(m1);

		HashSet<Materia> lista2 =
				new HashSet<>();

		lista2.add(m2);

		// =========================
		// INSERTAR ALUMNOS
		// =========================

		Alumno a1 = Alumno.builder()

				.nombre("Kevin")

				.apellido("Hernandez")

				.materias(lista1)

				.build();

		Alumno a2 = Alumno.builder()

				.nombre("Paola")

				.apellido("Ramirez")

				.materias(lista2)

				.build();

		alumnoRepo.save(a1);
		alumnoRepo.save(a2);

		// =========================
		// VERIFICACION CONSOLA
		// =========================

		System.out.println(
				"Registros insertados correctamente.");

		System.out.println(
				"Total profesores: "
						+ profesorRepo.count());

		System.out.println(
				"Total materias: "
						+ materiaRepo.count());

		System.out.println(
				"Total alumnos: "
						+ alumnoRepo.count());
	}
}