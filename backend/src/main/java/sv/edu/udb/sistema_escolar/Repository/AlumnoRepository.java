package sv.edu.udb.sistema_escolar.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.sistema_escolar.enity.Alumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
}