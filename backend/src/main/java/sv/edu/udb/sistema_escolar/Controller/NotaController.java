package sv.edu.udb.sistema_escolar.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.sistema_escolar.enity.Nota;
import sv.edu.udb.sistema_escolar.service.NotaService;
import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class NotaController {

    private final NotaService notaService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public List<Nota> findAll() { return notaService.findAll(); }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public Nota findById(@PathVariable Long id) { return notaService.findById(id); }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Nota> save(@RequestBody Nota nota) {
        return ResponseEntity.ok(notaService.save(nota));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public Nota update(@PathVariable Long id, @RequestBody Nota nota) {
        return notaService.update(id, nota);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public void delete(@PathVariable Long id) { notaService.delete(id); }
}