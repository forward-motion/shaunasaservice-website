import React from 'react';
import Link from 'gatsby-link';

import '../../../styles/_global/ui/Header.scss';


const Header = (props) => {

    return (
        <div className="header">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">
                            Shaun (as a service)
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to="/">Home</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;