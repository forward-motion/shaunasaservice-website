import React from 'react';
import Helmet from 'react-helmet';

import '../../../styles/_global/templates/DefaultTemplate.scss';

import '../ui/Header.jsx';
import Header from "../ui/Header";

const DefaultTemplate = (props) => {

    return (
        <div className="default-template">

            <Helmet
                title="Shaun (as a service) - You think it, I build it."
                meta={[
                    { name: 'description', content: `Send me your product idea, and I'll build you a prototype in 30 days or less.` },
                    { name: 'keywords', content: 'mvp, consulting, freelancer, developer' },
                ]}
            >


                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6c63ff" />
                <meta name="msapplication-TileColor" content="#4db6ac" />
                <meta name="theme-color" content="#ffffff" />


                <meta property="og:url" content="https://shaunasaservice.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Shaun (as a service) - You think it, I build it." />
                <meta property="og:description" content={`Send me your product idea, and I'll build you a prototype in 30 days or less.`} />
                {/*<meta property="og:image" content="/recv-icon.png" />*/}

            </Helmet>


            <Header />
            {props.children()}
        </div>
    );
};

export default DefaultTemplate;