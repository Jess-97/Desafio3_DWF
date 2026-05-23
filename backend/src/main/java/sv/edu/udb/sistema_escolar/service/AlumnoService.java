package sv.edu.udb.sistema_escolar.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.sistema_escolar.Repository.AlumnoRepository;
import sv.edu.udb.sistema_escolar.enity.Alumno;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlumnoService {


    private final AlumnoRepository alumnoRepository;

    public List<Alumno> findAll() {
        return alumnoRepository.findAll();
    }

    public Alumno findById(Long id) {
        return alumnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado id: " + id));
    }

    public Alumno save(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    public Alumno update(Long id, Alumno alumno) {
        Alumno existing = findById(id);
        existing.setNombre(alumno.getNombre());
        existing.setApellido(alumno.getApellido());
        return alumnoRepository.save(existing);
    }

    public void delete(Long id) {
        alumnoRepository.deleteById(id);
    }
}

