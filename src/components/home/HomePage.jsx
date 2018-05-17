import React from 'react';

import Hero from './Hero.jsx';
import Deliverables from './Deliverables.jsx';
import TheProcess from './TheProcess.jsx';
import Questions from './Questions.jsx';
import Ready from './Ready.jsx';

import '../../styles/home/HomePage.scss';

const HomePage = (props) => (

    <div className="home-page">
        <Hero />
        <Deliverables />
        <TheProcess />
        <Questions />
        <Ready />
    </div>

);

export default HomePage;