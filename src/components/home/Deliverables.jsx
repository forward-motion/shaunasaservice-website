import React from 'react';

import landingPages from '../../assets/img/landing-pages.svg';
import frontEndDemos from '../../assets/img/front-end-demos.svg';
import proofOfConcepts from '../../assets/img/proof-of-concepts.svg';

import '../../styles/home/Deliverables.scss';

const Deliverables = (props) => {

    return (
        <div className="deliverables">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h2>
                            There's no better way to validate your idea than with real code.
                        </h2>
                    </div>
                    <div className="col-md-4">
                        <img src={landingPages} />
                        <h4>
                            Landing pages
                        </h4>
                    </div>
                    <div className="col-md-4">
                        <img src={frontEndDemos} />
                        <h4>
                            Front-end demos
                        </h4>
                    </div>
                    <div className="col-md-4">
                        <img src={proofOfConcepts} />
                        <h4>
                            Fully-functional proof-of-concepts
                        </h4>

                    </div>
                </div>
            </div>
        </div>
    );

};

export default Deliverables;