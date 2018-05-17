import React from 'react';

import '../../../styles/_global/templates/DefaultTemplate.scss';

import '../ui/Header.jsx';
import Header from "../ui/Header";

const DefaultTemplate = (props) => {

    return (
        <div className="default-template">
            <Header />
            {props.children()}
        </div>
    );
};

export default DefaultTemplate;