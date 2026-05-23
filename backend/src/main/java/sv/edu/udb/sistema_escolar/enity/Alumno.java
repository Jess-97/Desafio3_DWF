package sv.edu.udb.sistema_escolar.enity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "alumno")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nombre obligatorio")
    @Size(min = 3, max = 50)
    @Column(nullable = false)
    private String nombre;

    @NotBlank(message = "Apellido obligatorio")
    @Column(nullable = false)
    private String apellido;

    @ManyToMany
    @JoinTable(
            name = "alumno_materia",
            joinColumns = @JoinColumn(name = "id_alumno"),
            inverseJoinColumns = @JoinColumn(name = "id_materia")
    )
    private Set<Materia> materias;

    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL)
    private List<Nota> notas;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}