const path = require('path');
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */


// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.

exports.createPages = ({ graphql, boundActionCreators }) => {

    const { createPage, createRedirect } = boundActionCreators;

    return new Promise((resolve, reject) => {

        // The “graphql” function allows us to run arbitrary
        // queries against the local Contentful graphql schema. Think of
        // it like the site has a built-in database constructed
        // from the fetched data that you can run queries against.
        graphql(
            `
            {
              allContentfulBlogPost {
                totalCount
              }
            }`
        ).then(result => {

            if (result.errors) {
                return reject(result.errors);
            }

            // Create pages
            const blogPage = path.resolve(`./src/components/blog/BlogPage.jsx`);
            const totalCount = result.data.allContentfulBlogPost.totalCount;
            const limit = 1;
            const totalNumPages = Math.ceil(totalCount / limit);
            let page = 0;


            while (page <= totalCount) {

                // Gatsby uses Redux to manage its internal state.
                // Plugins and sites can use functions like "createPage"
                // to interact with Gatsby.
                page++;

                if (page === 1) {

                    createPage({
                        // Each page is required to have a `path` as well
                        // as a template component. The `context` is
                        // optional but is often necessary so the template
                        // can query data specific to each page.
                        path: `/blog/`,
                        component: blogPage,
                        context: {
                            page,
                            totalNumPages,
                            limit,
                            skip: limit * (page - 1)
                        },
                    });

                    createRedirect({
                        fromPath: '/blog/page/1',
                        isPermanent: true,
                        redirectInBrowser: true,
                        toPath: `/blog/`,
                    });

                    continue;
                }

                createPage({
                    // Each page is required to have a `path` as well
                    // as a template component. The `context` is
                    // optional but is often necessary so the template
                    // can query data specific to each page.
                    path: `/blog/page/${page}/`,
                    component: blogPage,
                    context: {
                        page,
                        totalNumPages,
                        limit,
                        skip: limit * (page - 1)
                    },
                });
            }

        }).then(() => {

            resolve();
        });
    });
};