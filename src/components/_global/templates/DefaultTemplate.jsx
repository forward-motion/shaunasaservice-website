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
                    { name: 'keywords', content: 'mvp, consulting, freelancer, developer, blog' },
                    {
                        name: 'og:url', content: 'https://shaunasaservice.com'
                    },
                    {
                        name: 'og:type', content: 'website'
                    },
                    {
                        name: 'og:title', content: 'Shaun (as a service) - You think it, I build it.'
                    },
                    {
                        name: 'og:description', content: `Send me your product idea, and I'll build you a prototype in 30 days or less.`
                    },
                    {
                        name: 'og:image', content: 'https://shaunasaservice.com/shaun-as-a-service-shareable.png'
                    },
                    {
                        name: 'twitter:title', content: 'Shaun (as a service) - You think it, I build it.'
                    },
                    {
                        name: 'twitter:description', content: `Send me your product idea, and I'll build you a prototype in 30 days or less.`
                    },
                    {
                        name: 'twitter:image', content: 'https://shaunasaservice.com/shaun-as-a-service-shareable.png'
                    }
                ]}
            >


                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6c63ff" />
                <link rel="me" href="https://twitter.com/shaunpersad" />
                <meta name="msapplication-TileColor" content="#4db6ac" />
                <meta name="theme-color" content="#ffffff" />


                <meta name="twitter:widgets:theme" content="light" />
                <meta name="twitter:widgets:link-color" content="#6C63FF" />
                <meta name="twitter:widgets:border-color" content="#6C63FF" />
                <meta name="twitter:dnt" content="on" />
                <meta name="twitter:widgets:csp" content="on" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@shaunpersad" />
                <meta name="twitter:site" content="@shaunpersad" />

            </Helmet>


            <Header />
            {props.children()}
        </div>
    );
};

export default DefaultTemplate;