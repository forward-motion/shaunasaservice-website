import React from 'react';

import Hero from './Hero.jsx';
import Deliverables from './Deliverables.jsx';

import '../../styles/home/HomePage.scss';

const HomePage = (props) => {

    return (
        <div className="home-page">
            <Hero />
            <Deliverables />
        </div>
    );
};

export default HomePage;