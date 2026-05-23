package sv.edu.udb.sistema_escolar.enity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "profesor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profesor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre obligatorio
    @Column(nullable = false)
    private String nombre;

    // Un profesor puede tener varias materias
    @OneToMany(mappedBy = "profesor", cascade = CascadeType.ALL)

    // mappedBy indica que la relación se controla desde Materia
    private List<Materia> materias;
}