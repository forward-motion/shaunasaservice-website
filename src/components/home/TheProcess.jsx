import React from 'react';

import Form from '../_global/ui/Form.jsx';

import describeYourIdea from '../../assets/img/describe-your-idea.svg';
import approved from '../../assets/img/approved.svg';
import workBegins from '../../assets/img/work-begins.svg';
import delivery from '../../assets/img/delivery.svg';

import '../../styles/home/TheProcess.scss';

const steps = [
    {
        component: (
            <div>
                <h4>
                    Describe your digital product in the form below:
                </h4>
                <div>
                    <Form rows={2} />
                </div>
            </div>
        ),
        image: describeYourIdea
    },
    {
        component: (
            <div>
                <h4>
                    If approved, I'll email you package options that include:
                </h4>
                <ul>
                    <li>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        pricing and project start and end dates
                    </li>
                    <li>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        full descriptions of features and all technical decisions
                    </li>
                    <li>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        QA criteria
                    </li>
                </ul>
                <p>
                    Additional case-specific details such as hosting and design options are included as well.
                </p>
            </div>
        ),
        image: approved
    },
    {
        component: (
            <div>
                <h4>
                    You then select your preferred option, which are approximately:
                </h4>
                <ul>
                    <li>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        <strong>low</strong>: $100+ | 1-2 weeks
                    </li>
                    <li>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        <strong>medium</strong>: $2500+ | 2-3 weeks
                    </li>
                    <li>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        <strong>high</strong>: $4000+ | 3-4 weeks
                    </li>
                </ul>
                <p>
                    Submit a 20% deposit, and work begins.
                </p>
            </div>
        ),
        image: workBegins
    },
    {
        component: (
            <div>
                <h4>
                    At the end of the project, you receive:
                </h4>
                <ul>
                    <li>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        the completed, hosted prototype
                    </li>
                    <li>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        the source code
                    </li>
                    <li>
                        <span className="glyphicon glyphicon-record" aria-hidden="true" />
                        instructions for building, running, and hosting your prototype yourself
                    </li>
                </ul>
                <p>
                    You also get a chance to submit revisions and other feedback.
                </p>
            </div>
        ),
        image: delivery
    }
];

const Step = ({ number, component, image }) => {

    const down = number === 1 ? null : (
        <span className="glyphicon glyphicon-chevron-down" aria-hidden="true" />
    );

    return (

        <div className="step">

            <h2>
                {down}
            </h2>

            <div className="panel panel-default">
                <div className="panel-body">

                    <div className="col-md-1">
                        <div className="step-number">
                            {number}
                        </div>
                    </div>
                    <div className="col-md-8">
                        {component}
                    </div>
                    <div className="col-md-3 hidden-xs hidden-sm">
                        <img src={image} />
                    </div>

                </div>
            </div>
        </div>
    );
};

const TheProcess = (props) => {

    return (
        <div className="the-process">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h2 className="large-text">
                            From idea to demo in a <span className="glyphicon glyphicon-flash" aria-hidden="true" />.
                        </h2>
                        <h3 className="small-text">
                            Here's how it works:
                        </h3>
                    </div>
                </div>

                {steps.map(({ component, image }, index) => (

                    <div className="row" key={index}>
                        <div className="col-xs-12">
                            <Step number={index + 1} component={component} image={image} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default TheProcess;