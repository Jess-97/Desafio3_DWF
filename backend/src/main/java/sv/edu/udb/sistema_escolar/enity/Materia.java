package sv.edu.udb.sistema_escolar.enity;



import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "materia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nombre obligatorio")
    @Size(min = 3, max = 50)
    @Column(nullable = false)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_profesor", nullable = false)
    @JsonIgnoreProperties({"materias", "alumnos", "notas"})
    private Profesor profesor;

    @ManyToMany(mappedBy = "materias")
    @JsonIgnore
    private Set<Alumno> alumnos;

    @OneToMany(mappedBy = "materia")
    @JsonIgnore
    private List<Nota> notas;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}