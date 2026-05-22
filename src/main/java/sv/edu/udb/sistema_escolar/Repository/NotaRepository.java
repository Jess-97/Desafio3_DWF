package sv.edu.udb.sistema_escolar.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sv.edu.udb.sistema_escolar.enity.Nota;

// Acceso a datos notas

public interface NotaRepository
        extends JpaRepository<Nota, Long> {
}