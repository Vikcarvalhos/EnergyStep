import { Link, useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();

    // Verifica se o usuário está logado (verifica se o ID está no localStorage)
    const isLoggedIn = !!localStorage.getItem("userId");

    // Função para realizar logout
    const handleLogout = () => {
        localStorage.removeItem("userId"); // Remove o ID do localStorage
        navigate("/"); // Redireciona para a página de login
    };

    return (
        <header className='menu'>
            <nav className='nav-menu'>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Link to="/user">User</Link> {/* Link para página do usuário */}
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button> {/* Botão de logout */}
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link> {/* Link para página de login */}
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Nav;
