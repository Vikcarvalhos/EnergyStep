package br.com.energy.controller;

import br.com.energy.model.Leitura;
import br.com.energy.service.DataLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class LeituraController {

    @Autowired
    private DataLoader dataLoader;

    @GetMapping("/leituras")
    public List<Map<String, Object>> getLeituras(@RequestParam String dia) throws IOException {
        List<Leitura> leituras = dataLoader.carregarLeituras();

        // Filtrar leituras pelo dia especificado
        List<Leitura> leiturasFiltradas = leituras.stream()
                .filter(leitura -> leitura.getData().startsWith(dia)) // Filtro com dia no formato correto
                .collect(Collectors.toList());

        // Criar mapa de horas completas com energia inicial zerada
        Map<String, Double> horasCompletas = new TreeMap<>();
        for (int i = 0; i < 24; i++) {
            String hora = String.format("%02d:00", i);
            horasCompletas.put(hora, 0.0);
        }

        // Somar energia gerada em cada hora
        leiturasFiltradas.forEach(leitura -> {
            String hora = leitura.getData().substring(11, 13) + ":00"; // Extrair somente a hora (HH:00)
            horasCompletas.put(hora, horasCompletas.get(hora) + leitura.getEnergiaGerada());
        });

        // Converter para lista de mapas (JSON-friendly)
        List<Map<String, Object>> resultado = horasCompletas.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("hora", entry.getKey());
                    map.put("energia_gerada", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        return resultado;
    }
}
