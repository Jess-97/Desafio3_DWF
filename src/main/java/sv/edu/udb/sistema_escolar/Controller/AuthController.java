package sv.edu.udb.sistema_escolar.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.sistema_escolar.dto.AuthRequest;
import sv.edu.udb.sistema_escolar.dto.AuthResponse;
import sv.edu.udb.sistema_escolar.dto.RegisterRequest;
import sv.edu.udb.sistema_escolar.dto.UserDto;
import sv.edu.udb.sistema_escolar.model.User;
import sv.edu.udb.sistema_escolar.Repository.UserRepository;
import sv.edu.udb.sistema_escolar.segurity.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        if (authentication.isAuthenticated()) {
            User userDetails = (User) authentication.getPrincipal();
            String jwtToken     = jwtService.generateToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);
            return ResponseEntity.ok(new AuthResponse(jwtToken, refreshToken));
        }
        throw new UsernameNotFoundException("Credenciales inválidas");
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .age(request.getAge())
                .build();
        User saved = userRepository.save(user);
        return ResponseEntity.ok(new UserDto(saved));
    }
}