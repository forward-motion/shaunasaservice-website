import { createClient } from 'contentful';

const contentfulClient = createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
    accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
    host: process.env.GATSBY_CONTENTFUL_HOST
});

export default contentfulClient;
