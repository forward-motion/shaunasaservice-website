import React from 'react';

import '../../styles/home/Contact.scss';

const Contact = (props) => (

    <div className="contact">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="large-text">
                        Contact me
                    </h2>
                </div>
                <div className="col-xs-12">

                    <ul>
                        <li><a target="_blank" href="mailto:shaun@shaunasaservice.com">Email</a></li>
                        <li><a target="_blank" href="https://twitter.com/shaunpersad">Twitter</a></li>
                        <li><a target="_blank" href="https://github.com/shaunpersad/">GitHub</a></li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
);

export default Contact;