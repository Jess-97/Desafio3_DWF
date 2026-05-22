package sv.edu.udb.sistema_escolar.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.sistema_escolar.enity.Materia;

public interface MateriaRepository extends JpaRepository<Materia, Long> {
}