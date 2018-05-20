import React from 'react';

import '../../../styles/_global/ui/Contact.scss';

const Contact = (props) => (

    <ul className="contact">
        <li><a target="_blank" href="mailto:shaun@shaunasaservice.com"><span className="icon-envelop" /></a></li>
        <li><a target="_blank" href="https://twitter.com/shaunpersad"><span className="icon-twitter" /></a></li>
        <li><a target="_blank" href="https://github.com/shaunpersad/"><span className="icon-github" /></a></li>
    </ul>
);

export default Contact;