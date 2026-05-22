package sv.edu.udb.sistema_escolar.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.sistema_escolar.enity.Profesor;
import sv.edu.udb.sistema_escolar.service.ProfesorService;
import java.util.List;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProfesorController {

    private final ProfesorService profesorService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public List<Profesor> findAll() { return profesorService.findAll(); }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public Profesor findById(@PathVariable Long id) { return profesorService.findById(id); }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public Profesor save(@RequestBody Profesor profesor) { return profesorService.save(profesor); }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public Profesor update(@PathVariable Long id, @RequestBody Profesor profesor) {
        return profesorService.update(id, profesor);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public void delete(@PathVariable Long id) { profesorService.delete(id); }
}