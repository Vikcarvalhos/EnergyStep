import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "../css/style.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
    const [data, setData] = useState([]);
    const [dia, setDia] = useState("2024-11-18");
    const [totalEnergia, setTotalEnergia] = useState(0);
    const [totalMoedas, setTotalMoedas] = useState(0);
    const [mediaPessoas, setMediaPessoas] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/leituras?dia=${dia}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setData([]);
                    setTotalEnergia(0);
                    setTotalMoedas(0);
                    setMediaPessoas(0);
                } else {
                    setData(data);

                    // Calcular indicadores
                    const totalEnergiaGerada = data.reduce((acc, curr) => acc + curr.energia_gerada, 0);
                    const totalMoedasCriadas = totalEnergiaGerada * 1; // Exemplo: 1 moeda para cada 10 kWh gerados
                    const pessoas = totalEnergiaGerada / 0.00015; // Exemplo: cada pessoa gera 0.35 kWh em média

                    setTotalEnergia(totalEnergiaGerada.toFixed(2));
                    setTotalMoedas(totalMoedasCriadas.toFixed(2));
                    setMediaPessoas(Math.round(pessoas));
                }
            })
            .catch((error) => console.error("Erro ao buscar leituras:", error));
    }, [dia]);

    const chartData = {
        labels: data.map((d) => d.hora), // Exibir horas completas
        datasets: [
            {
                label: "Energia Gerada (kWh)",
                data: data.map((d) => d.energia_gerada),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar o tamanho via CSS
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Horário (00:00 - 23:59)",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Energia Gerada (kWh)",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h1>Dashboard de Energia</h1>
            <div>
                <label>
                    Dia:
                    <input
                        type="date"
                        value={dia}
                        onChange={(e) => setDia(e.target.value)}
                    />
                </label>
            </div>
            {/* Indicadores */}
            <div className="indicators">
                <div className="indicator">
                    <h3>Total de Energia Gerada</h3>
                    <p>{totalEnergia} kWh</p>
                </div>
                <div className="indicator">
                    <h3>Total de Moedas Criadas</h3>
                    <p>{totalMoedas} moedas</p>
                </div>
                <div className="indicator">
                    <h3>Média de Pessoas</h3>
                    <p>{mediaPessoas} pessoas</p>
                </div>
            </div>
            {/* Gráfico */}
            <div className="chart-container">
                {data.length > 0 ? (
                    <Line data={chartData} options={chartOptions} />
                ) : (
                    <p>Nenhum dado disponível para o dia selecionado.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
