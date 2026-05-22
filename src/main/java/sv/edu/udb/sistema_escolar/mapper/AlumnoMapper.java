package sv.edu.udb.sistema_escolar.mapper;
import sv.edu.udb.sistema_escolar.dto.AlumnoDTO;
import sv.edu.udb.sistema_escolar.enity.Alumno;

// Convierte DTO a entidad
public class AlumnoMapper {
    public static Alumno toEntity(
            AlumnoDTO dto) {

        Alumno alumno = new Alumno();

        alumno.setNombre(dto.getNombre());
        alumno.setApellido(dto.getApellido());

        return alumno;
    }
}

