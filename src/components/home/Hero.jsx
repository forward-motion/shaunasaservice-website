import React from 'react';

import hello from '../../assets/img/hello.svg';

import Form from '../_global/ui/Form.jsx';

import '../../styles/home/Hero.scss';

const Hero = (props) => (
    <div className="hero">
        <div className="container">
            <div className="row">
                <div className="col-md-8">


                    <div className="row">
                        <div className="col-sm-3">
                            <img src={hello} alt="hello!" />
                        </div>
                        <div className="col-sm-9">

                            <h1>
                                Hi, I'm Shaun. I can help validate your ideas with rapid prototyping.
                            </h1>
                        </div>
                    </div>

                    <h3 className="subtext">
                        Send me your product idea, and I'll build your prototype in 30 days or less.
                    </h3>
                    <h3 className="tagline">
                        You think it, I build it.
                    </h3>

                </div>
                <div className="col-md-4">
                    <Form large={false} rows={5} />
                </div>
            </div>
        </div>
    </div>
);

export default Hero;