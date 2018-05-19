import React from 'react';

import Form from '../_global/ui/Form.jsx';
import Contact from '../_global/ui/Contact.jsx';

import '../../styles/home/Ready.scss';

const Ready = (props) => (

    <div className="ready">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="large-text">
                        Ready to see your ideas come to life?
                    </h2>
                </div>
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                    <Form />
                    <Contact />
                </div>
            </div>
        </div>
    </div>
);

export default Ready;