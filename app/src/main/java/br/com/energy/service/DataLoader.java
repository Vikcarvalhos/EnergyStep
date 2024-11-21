package br.com.energy.service;

import br.com.energy.model.Leitura;
import br.com.energy.model.Usuario;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Service
public class DataLoader {

    private static final String LEITURAS_FILE_PATH = "data/leituras.json";
    private static final String USUARIOS_FILE_PATH = "data/usuarios.json";

    public List<Leitura> carregarLeituras() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(LEITURAS_FILE_PATH)) {
            if (inputStream == null) {
                throw new IOException("Arquivo leituras.json não encontrado!");
            }
            return Arrays.asList(objectMapper.readValue(inputStream, Leitura[].class));
        }
    }

    public List<Usuario> carregarUsuarios() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(USUARIOS_FILE_PATH)) {
            if (inputStream == null) {
                throw new IOException("Arquivo usuarios.json não encontrado!");
            }
            return Arrays.asList(objectMapper.readValue(inputStream, Usuario[].class));
        }
    }

    public void salvarUsuarios(List<Usuario> usuarios) throws IOException {
        throw new UnsupportedOperationException("Salvar arquivos diretamente em resources não é suportado.");
    }
}
