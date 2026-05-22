package sv.edu.udb.sistema_escolar.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.sistema_escolar.enity.Nota;
import sv.edu.udb.sistema_escolar.Repository.NotaRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotaService {

    private final NotaRepository notaRepository;

    public List<Nota> findAll() { return notaRepository.findAll(); }

    public Nota findById(Long id) {
        return notaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada id: " + id));
    }

    public Nota save(Nota nota) { return notaRepository.save(nota); }

    public Nota update(Long id, Nota nota) {
        Nota existing = findById(id);
        existing.setValor(nota.getValor());
        existing.setAlumno(nota.getAlumno());
        existing.setMateria(nota.getMateria());
        return notaRepository.save(existing);
    }

    public void delete(Long id) { notaRepository.deleteById(id); }
}