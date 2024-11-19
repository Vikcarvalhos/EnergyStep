import React, { useState, useEffect } from "react";
import "../css/user.css";

function User() {
    const [usuario, setUsuario] = useState(null);
    const userId = 1; // ID fixo para teste (pode ser alterado para algo dinâmico)

    useEffect(() => {
        fetch(`http://localhost:5000/usuario/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setUsuario(data);
                }
            })
            .catch((error) =>
                console.error("Erro ao buscar informações do usuário:", error)
            );
    }, []);

    return (
        <div>
            <h1>Informações do Usuário</h1>
            {usuario ? (
                <div>
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Saldo de Moedas:</strong> {usuario.saldo_moedas}</p>
                    <p><strong>Valor em Reais:</strong> R$ {usuario.valor_em_reais}</p>
                </div>
            ) : (
                <p>Carregando informações do usuário...</p>
            )}
        </div>
    );
}

export default User;
