import React from 'react';

import Hero from './Hero.jsx';
import Deliverables from './Deliverables.jsx';
import TheProcess from './TheProcess.jsx';
import Questions from './Questions.jsx';
import Ready from './Ready.jsx';
import Contact from './Contact.jsx';

import '../../styles/home/HomePage.scss';

const HomePage = (props) => (

    <div className="home-page">
        <Hero />
        <Deliverables />
        <hr />
        <TheProcess />
        <hr />
        <Questions />
        <hr />
        <Ready />
        <hr />
        <Contact />
    </div>

);

export default HomePage;