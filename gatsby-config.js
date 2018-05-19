module.exports = {
    siteMetadata: {
        title: 'Shaun as a service - You think it, I build it.',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
                accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
                host: process.env.GATSBY_CONTENTFUL_HOST
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
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
                pixelId: process.env.GATSBY_FACEBOOK_PIXEL_ID,
            },
        },
    ],
};
