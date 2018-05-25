import React from 'react';

import landingPages from '../../assets/img/landing-pages.svg';
import frontEndDemos from '../../assets/img/front-end-demos.svg';
import proofOfConcepts from '../../assets/img/proof-of-concepts.svg';
import saasProducts from '../../assets/img/saas-products.svg';
import chatBots from '../../assets/img/chat-bots.svg';
import realtimeApps from '../../assets/img/realtime-apps.svg';

import '../../styles/home/Deliverables.scss';

const types = [
    {
        title: 'SaaS Products',
        image: saasProducts
    },
    {
        title: 'Chat Bots',
        image: chatBots
    },
    {
        title: 'Realtime Apps',
        image: realtimeApps
    },
    {
        title: 'Proof-of-Concepts',
        image: frontEndDemos
    },
    {
        title: 'Front-end Demos',
        image: proofOfConcepts
    },
    {
        title: 'Landing Pages',
        image: landingPages
    }
];

const Deliverables = (props) => (

    <div className="deliverables centered-text">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="large-text">
                        There's no better way to validate your idea than with <span>real code</span>.
                    </h2>
                </div>
                {types.map(type => (
                    <div className="col-md-4 col-sm-6" key={type.title}>
                        <img src={type.image} />
                        <h4>
                            {type.title}
                        </h4>
                    </div>
                ))}
                <div className="col-xs-12">
                    <h3 className="large-text">
                        Prototypes start at <strong>$500</strong>.
                    </h3>
                </div>
            </div>
        </div>
    </div>
);

export default Deliverables;