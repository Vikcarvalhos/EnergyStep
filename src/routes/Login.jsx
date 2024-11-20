import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Limpar mensagens de erro

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                // Armazenar o ID do usuário no localStorage
                localStorage.setItem("userId", data.usuario.id);
                navigate("/user"); // Redirecionar para a página do usuário
            } else {
                setError(data.error); // Mostrar mensagem de erro
            }
        } catch (err) {
            setError("Erro ao conectar ao servidor.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        E-mail:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Senha:
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Entrar</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default Login;
