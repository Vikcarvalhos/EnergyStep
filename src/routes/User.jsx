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

    // Obter o ID do usuário do localStorage
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:5000/usuario/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setUsuario(data);
                }
            })
            .catch((error) => console.error("Erro ao buscar informações do usuário:", error));
    }, [userId, navigate]);

    const handlePagar = () => {
        fetch(`http://localhost:5000/usuario/${userId}/pagar`, {
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
                    setUsuario((prev) => ({
                        ...prev,
                        saldo_moedas: data.saldo_moedas_restante,
                    }));
                    setMessage(data.message);
                    setModalOpen(false);
                }
            })
            .catch((error) => console.error("Erro ao processar pagamento:", error));
    };

    return (
        <div>
            <h1>Informações do Usuário</h1>
            {usuario ? (
                <div>
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Saldo de Moedas:</strong> {usuario.saldo_moedas}</p>
                    <p><strong>Valor em Reais:</strong> R$ {usuario.valor_em_reais}</p>
                    <button onClick={() => setModalOpen(true)}>Pagar Conta</button>
                </div>
            ) : (
                <p>Carregando informações do usuário...</p>
            )}

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Pagar Conta</h2>
                        <label>
                            Tipo de Conta:
                            <select value={tipoConta} onChange={(e) => setTipoConta(e.target.value)}>
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
                            />
                        </label>
                        <p>Saldo disponível: R$ {usuario.valor_em_reais}</p>
                        <button onClick={handlePagar}>Pagar</button>
                        <button onClick={() => setModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
    );
}

export default User;
