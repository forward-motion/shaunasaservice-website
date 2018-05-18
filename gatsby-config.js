module.exports = {
    siteMetadata: {
        title: 'Shaun as a service - You think it, I build it.',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-118354853-2",
                // Puts tracking script in the head instead of the body
                head: false,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
            },
        },
        {
            resolve: `gatsby-plugin-facebook-pixel`,
            options: {
                pixelId: '2063281123996963',
            },
        },
    ],
};
