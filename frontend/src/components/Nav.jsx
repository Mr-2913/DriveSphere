import { Link } from 'react-router-dom';
import './css/Nav.css'
function Navbar(){
    return(
        <>
            <nav className='navbar'>
                <div className="navbar-container">
                <Link to="/" className='navbar-logo'>DriveSphere</Link>

                <div className='navbar-links'>
                    <Link to="/">Home</Link>
                    <Link to="/cars">Cars</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/compare">Compare</Link>
                    <Link to="/profile">Account</Link>
                </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;