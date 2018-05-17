import React from 'react';
import Link from 'gatsby-link';

import '../../../styles/_global/ui/Header.scss';


const Header = (props) => {

    return (
        <div className="header">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand active" to="/">
                            Shaun (as a <span>service</span>)
                        </Link>
                        <span className="navbar-brand">|</span>
                        <Link className="navbar-brand" to="/blog">Blog</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;