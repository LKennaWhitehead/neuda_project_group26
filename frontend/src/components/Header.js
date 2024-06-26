import React from 'react';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-transparent fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" aria-current="page" href="#">Submit</a>
                        <a className="nav-link" href="#">Admin</a>
                        <a className="nav-link" href="#">About</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;