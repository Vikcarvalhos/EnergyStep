package br.com.energy.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Leitura {

    private int id;

    @JsonProperty("data")
    private String data;

    @JsonProperty("energia_gerada")
    private double energiaGerada;

    @JsonProperty("moedas_atribuidas")
    private double moedasAtribuidas;

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public double getEnergiaGerada() {
        return energiaGerada;
    }

    public void setEnergiaGerada(double energiaGerada) {
        this.energiaGerada = energiaGerada;
    }

    public double getMoedasAtribuidas() {
        return moedasAtribuidas;
    }

    public void setMoedasAtribuidas(double moedasAtribuidas) {
        this.moedasAtribuidas = moedasAtribuidas;
    }
}
