import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/user.css";

function User() {
    const [usuario, setUsuario] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [tipoConta, setTipoConta] = useState("Conta de Luz");
    const [valor, setValor] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const VALOR_KWH = 0.656; // Valor do kWh em reais
    const VALOR_MOEDA = VALOR_KWH * 25; // Valor de 1 moeda em reais

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:8080/api/usuario/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    const valorEmReais = (data.saldo_moedas * VALOR_MOEDA).toFixed(2);
                    setUsuario({ ...data, valor_em_reais: valorEmReais });
                }
            })
            .catch((error) => console.error("Erro ao buscar informações do usuário:", error));
    }, [userId, navigate]);

    const handlePagar = () => {
        fetch(`http://localhost:8080/api/usuario/${userId}/pagar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tipo_conta: tipoConta, valor: parseFloat(valor) }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    const novoSaldo = data.saldo_moedas_restante;
                    const novoValorReais = (novoSaldo * VALOR_MOEDA).toFixed(2);

                    setUsuario((prev) => ({
                        ...prev,
                        saldo_moedas: novoSaldo,
                        valor_em_reais: novoValorReais,
                    }));
                    setMessage(data.message);
                    setModalOpen(false);
                }
            })
            .catch((error) => console.error("Erro ao processar pagamento:", error));
    };

    return (
        <div className="user-page">
            <header>
                <h1>Informações do Usuário</h1>
            </header>
            {usuario ? (
                <div className="user-info">
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Saldo de Moedas:</strong> {usuario.saldo_moedas}</p>
                    <p><strong>Valor em Reais:</strong> R$ {usuario.valor_em_reais}</p>
                    <button className="pagar-btn" onClick={() => setModalOpen(true)}>
                        Pagar Conta
                    </button>
                </div>
            ) : (
                <p>Carregando informações do usuário...</p>
            )}

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Pagar Conta</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>
                                Tipo de Conta:
                                <select
                                    value={tipoConta}
                                    onChange={(e) => setTipoConta(e.target.value)}
                                >
                                    <option value="Conta de Luz">Conta de Luz</option>
                                    <option value="Conta de Água">Conta de Água</option>
                                    <option value="Boleto">Boleto</option>
                                </select>
                            </label>
                            <label>
                                Valor (R$):
                                <input
                                    type="number"
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    min="0"
                                />
                            </label>
                            <p>Saldo disponível: <strong>R$ {usuario.valor_em_reais}</strong></p>
                            <div className="modal-buttons">
                                <button
                                    type="button"
                                    className="confirmar-btn"
                                    onClick={handlePagar}
                                >
                                    Confirmar Pagamento
                                </button>
                                <button
                                    type="button"
                                    className="cancelar-btn"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {message && <p className="success-message">{message}</p>}
        </div>
    );
}

export default User;
