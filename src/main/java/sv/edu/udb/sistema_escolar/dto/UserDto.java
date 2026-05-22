package sv.edu.udb.sistema_escolar.dto;

import lombok.Data;
import sv.edu.udb.sistema_escolar.model.User;

@Data
public class UserDto {
    private Integer idUser;
    private String username;
    private String firstname;
    private String lastname;
    private Integer age;

    public UserDto(User user) {
        this.idUser    = user.getIdUser();
        this.username  = user.getUsername();
        this.firstname = user.getFirstname();
        this.lastname  = user.getLastname();
        this.age       = user.getAge();
    }
}