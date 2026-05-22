package sv.edu.udb.sistema_escolar.enity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "nota")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double valor;

    @ManyToOne
    @JoinColumn(name = "id_alumno", nullable = false)
    @JsonIgnoreProperties({"materias", "notas", "createdAt", "updatedAt"})
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "id_materia", nullable = false)
    @JsonIgnoreProperties({"alumnos", "notas", "profesor", "createdAt", "updatedAt"})
    private Materia materia;

    @CreationTimestamp
    private LocalDateTime createdAt;
}