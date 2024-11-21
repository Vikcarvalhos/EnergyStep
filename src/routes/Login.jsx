import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userId", data.id);
                navigate("/user");
            } else {
                setError(data);
            }
        } catch (err) {
            setError("Erro ao conectar ao servidor.");
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">
                        E-mail:
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="senha">
                        Senha:
                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Entrar</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
