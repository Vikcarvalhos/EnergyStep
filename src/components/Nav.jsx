import {Link} from 'react-router-dom'

function Nav(){

    return(
        <>
            <header className='menu'>
                <nav className='nav-menu'>
                    <ul>
                        <Link to="/">Home</Link>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Nav