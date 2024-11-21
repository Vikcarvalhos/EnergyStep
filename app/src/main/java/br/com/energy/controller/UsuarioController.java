package br.com.energy.controller;

import br.com.energy.service.DataLoader;
import br.com.energy.model.Usuario;
import br.com.energy.model.PagamentoRequest;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private DataLoader dataLoader;

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable int id) throws IOException {
        List<Usuario> usuarios = dataLoader.carregarUsuarios();
        Optional<Usuario> usuario = usuarios.stream()
                .filter(u -> u.getId() == id)
                .findFirst();

        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) throws IOException {
        List<Usuario> usuarios = dataLoader.carregarUsuarios();
        Optional<Usuario> usuario = usuarios.stream()
                .filter(u -> u.getEmail().equals(loginRequest.getEmail()) &&
                        u.getSenha().equals(loginRequest.getSenha()))
                .findFirst();

        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(401).body("E-mail ou senha inválidos");
        }
    }

    @PostMapping("/usuario/{id}/pagar")
    public ResponseEntity<?> pagarConta(@PathVariable int id, @RequestBody PagamentoRequest pagamentoRequest) throws IOException {
        // Carregar a lista de usuários
        List<Usuario> usuarios = dataLoader.carregarUsuarios();
        Optional<Usuario> usuarioOpt = usuarios.stream()
                .filter(u -> u.getId() == id)
                .findFirst();

        if (!usuarioOpt.isPresent()) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }

        Usuario usuario = usuarioOpt.get();

        // Conversão de moedas para reais
        double valorKwh = 0.656; // Valor do kWh em São Paulo
        double valorMoeda = valorKwh * 25; // Valor de uma moeda em reais
        double moedasNecessarias = pagamentoRequest.getValor() / valorMoeda;

        // Verificar se o saldo de moedas é suficiente
        if (usuario.getSaldoMoedas() < moedasNecessarias) {
            return ResponseEntity.status(400).body("Saldo insuficiente");
        }

        // Deduzir as moedas necessárias do saldo do usuário
        usuario.setSaldoMoedas(usuario.getSaldoMoedas() - moedasNecessarias);

        // Salvar as alterações na lista de usuários
        dataLoader.salvarUsuarios(usuarios);

        return ResponseEntity.ok(Map.of(
                "message", "Pagamento de " + pagamentoRequest.getTipoConta() + " no valor de R$ " + pagamentoRequest.getValor() + " realizado com sucesso.",
                "saldo_moedas_restante", usuario.getSaldoMoedas()
        ));
    }

}
