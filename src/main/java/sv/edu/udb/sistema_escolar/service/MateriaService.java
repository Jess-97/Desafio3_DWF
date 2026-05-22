package sv.edu.udb.sistema_escolar.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.sistema_escolar.Repository.MateriaRepository;
import sv.edu.udb.sistema_escolar.enity.Materia;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MateriaService {

    private final MateriaRepository materiaRepository;

    public List<Materia> findAll() {
        return materiaRepository.findAll();
    }

    public Materia findById(Long id) {
        return materiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada id: " + id));
    }

    public Materia save(Materia materia) {
        return materiaRepository.save(materia);
    }

    public Materia update(Long id, Materia materia) {
        Materia existing = findById(id);
        existing.setNombre(materia.getNombre());
        return materiaRepository.save(existing);
    }

    public void delete(Long id) {
        materiaRepository.deleteById(id);
    }
}

