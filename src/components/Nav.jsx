import { Link, useNavigate } from 'react-router-dom';
import "../css/nav.css";
import logo from '../assets/logo.png'; // Importando a logo

function Nav() {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("userId");

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} alt="EnergyStep Logo" className="logo" /> {/* Substituindo o texto pela logo */}
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/user">User</Link></li>
                        <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Nav;
