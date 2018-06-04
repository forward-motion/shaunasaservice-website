const proxy = require('http-proxy-middleware');

module.exports = {
    siteMetadata: {
        title: 'Shaun as a service - Blog',
        description: 'Thoughts on coding, product development, and indie hacking.',
        siteUrl: 'https://shaunasaservice.com/blog/'
    },
    developMiddleware: app => {
        app.use(
            '/.netlify/functions/',
            proxy({
                target: 'http://lambda:9000',
                pathRewrite: {
                    '/.netlify/functions/': '',
                }
            })
        );
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
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                    {
                      site {
                        siteMetadata {
                          title
                          description
                          siteUrl
                          site_url: siteUrl
                        }
                      }
                    }
                  `
                ,
                feeds: [
                    {
                        serialize: ({ query: { site, allContentfulBlogPost } }) => {
                            return allContentfulBlogPost.edges.map(edge => {

                                return {
                                    title: edge.node.title,
                                    description: edge.node.summary,
                                    url: site.siteMetadata.siteUrl + edge.node.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.slug
                                };
                            });
                        },
                        query: `
                            {
                              allContentfulBlogPost(limit: 1000) {
                                edges {
                                  node {
                                    title
                                    slug
                                    summary
                                  }
                                }
                              }
                            }
                          `
                        ,
                        output: "/rss.xml",
                    },
                ],
            },
        },
    ],
};
