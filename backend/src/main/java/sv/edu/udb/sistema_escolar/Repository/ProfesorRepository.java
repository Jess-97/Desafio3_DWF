package sv.edu.udb.sistema_escolar.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.sistema_escolar.enity.Profesor;

public interface ProfesorRepository extends JpaRepository<Profesor, Long> {
}
