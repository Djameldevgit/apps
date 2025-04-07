import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle">

                <Link to="/" className="logo d-flex align-items-center"
                    onClick={() => window.scrollTo({ top: 0 })}>
                    {/* Logo desde la carpeta public */}
                    <img 
                        src="/logoalgeria.png"  // Ruta directa desde /public
                        alt="Logo alegeia" 
                        style={{ height: '40px', marginRight: '10px' }} 
                    />
                    <h1 className="navbar-brand text-uppercase p-0 m-0">
                    Aps Algérie
                    </h1>
                </Link>

                <Search />
                <Menu />
            </nav>
        </div>
    );
};

export default Header;

 

