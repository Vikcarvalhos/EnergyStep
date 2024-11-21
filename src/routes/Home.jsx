import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "../css/home.css";
import { FaBolt, FaCoins, FaUsers } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function Home() {
    const [data, setData] = useState([]);
    const [dia, setDia] = useState("2024-11-18");
    const [totalEnergia, setTotalEnergia] = useState(0);
    const [totalMoedas, setTotalMoedas] = useState(0);
    const [mediaPessoas, setMediaPessoas] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/api/leituras?dia=${dia}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na API: " + response.status);
                }
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error("Dados inválidos: o backend não retornou um array.");
                }

                setData(data);

                // Calcular indicadores
                const totalEnergiaGerada = data.reduce(
                    (acc, curr) => acc + (curr.energia_gerada || 0),
                    0
                );
                const totalMoedasCriadas = totalEnergiaGerada * 1; // 1 moeda por kWh gerado
                const pessoas = totalEnergiaGerada / 0.00015; // Exemplo: cada pessoa gera 0.00015 kWh

                setTotalEnergia(totalEnergiaGerada.toFixed(2));
                setTotalMoedas(totalMoedasCriadas.toFixed(2));
                setMediaPessoas(Math.round(pessoas));
            })
            .catch((error) => {
                console.error("Erro ao buscar leituras:", error);
                setData([]);
                setTotalEnergia(0);
                setTotalMoedas(0);
                setMediaPessoas(0);
            });
    }, [dia]);

    const chartData = {
        labels: data.map((d) => d.hora),
        datasets: [
            {
                label: "Energia Gerada (kWh)",
                data: data.map((d) => d.energia_gerada),
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
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
        <main className="dashboard">
            <header className="dashboard-container">
                <h1>Dashboard de Energia</h1>
                <div className="date-picker">
                    <input
                        id="date"
                        type="date"
                        value={dia}
                        onChange={(e) => setDia(e.target.value)}
                    />
                </div>
            </header>

            <section className="indicators">
                <div className="indicator">
                    <FaBolt className="icon" />
                    <h3>Total de Energia</h3>
                    <p>{totalEnergia} kWh</p>
                </div>
                <div className="indicator">
                    <FaCoins className="icon" />
                    <h3>Total de Moedas</h3>
                    <p>{totalMoedas}</p>
                </div>
                <div className="indicator">
                    <FaUsers className="icon" />
                    <h3>Média Pessoas</h3>
                    <p>{mediaPessoas}</p>
                </div>
            </section>
                
            {/* Gráfico */}
            <section className="chart-container">
                {data.length > 0 ? <Line data={chartData} /> : <p>Nenhum dado disponível.</p>}
            </section>
        </main>
    );
}

export default Home;
