package sv.edu.udb.sistema_escolar.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.sistema_escolar.Repository.ProfesorRepository;
import sv.edu.udb.sistema_escolar.enity.Profesor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfesorService {

    private final ProfesorRepository profesorRepository;

    public List<Profesor> findAll() {
        return profesorRepository.findAll();
    }

    public Profesor findById(Long id) {
        return profesorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado id: " + id));
    }

    public Profesor save(Profesor profesor) {
        return profesorRepository.save(profesor);
    }

    public Profesor update(Long id, Profesor profesor) {
        Profesor existing = findById(id);
        existing.setNombre(profesor.getNombre());
        return profesorRepository.save(existing);
    }

    public void delete(Long id) {
        profesorRepository.deleteById(id);
    }
}



