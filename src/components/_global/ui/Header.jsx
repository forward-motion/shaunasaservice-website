import React from 'react';
import Link from 'gatsby-link';

import '../../../styles/_global/ui/Header.scss';


const Header = (props) => {

    return (
        <div className="header">
            <div className="container">
                <ul>
                    <li>
                        <Link activeClassName="active" exact to="/">Shaun (<span>as a service</span>)</Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link activeClassName="active" to="/blog">Blog</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;