import React from 'react';

import hello from '../../assets/img/hello.svg';

import Form from '../_global/ui/Form.jsx';

import '../../styles/home/Hero.scss';

const Hero = (props) => {

    return (
        <div className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <h1>
                            Validate your ideas with rapid prototyping.
                        </h1>

                        <div className="row">
                            <div className="col-xs-12">
                                <h2>
                                    Hi, my name is Shaun.
                                </h2>
                            </div>
                            <div className="col-sm-3">
                                <img src={hello} alt="hello!" />
                            </div>
                            <div className="col-sm-9">
                                <h3>
                                    I'm a grizzled full-stack web developer at your service. Send me your product ideas, and I'll build your MVP in 30 days or less.
                                </h3>
                            </div>
                        </div>


                    </div>
                    <div className="col-md-6">
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Hero;