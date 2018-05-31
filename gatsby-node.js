/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {

    const { createPage } = boundActionCreators;
    const articlePage = path.resolve(`./src/components/blog/ArticlePage.jsx`);
    const limit = 1000;

    return new Promise((resolve, reject) => {

        graphql(`
            {
              allContentfulBlogPost {
                totalCount
              }
            }
        `).then(result => {

            if (result.errors) {
                return reject(result.errors);
            }

            const numFetches = Math.ceil(result.data.allContentfulBlogPost.totalCount / limit);
            let p = Promise.resolve();

            for (let i = 0; i < numFetches; i++) {

                const skip = i * limit;

                p = p.then(() => {

                    return new Promise((resolve, reject) => {

                        graphql(`
                            {
                              allContentfulBlogPost(skip: ${skip}, limit: ${limit}) {
                                totalCount
                                edges {
                                  node {
                                    title
                                    slug
                                    summary
                                    hero {
                                      file {
                                        url
                                      }
                                    }
                                    description {
                                      childMarkdownRemark {
                                        html
                                      }
                                    }
                                    tags {
                                      body
                                    }
                                    tweet
                                  }
                                }
                              }
                            }
                        `).then(result => {

                            if (result.errors) {
                                return reject(result.errors);
                            }

                            result.data.allContentfulBlogPost.edges.forEach(({ node: post }) => {

                                createPage({
                                    // Each page is required to have a `path` as well
                                    // as a template component. The `context` is
                                    // optional but is often necessary so the template
                                    // can query data specific to each page.
                                    path: `/blog/${post.slug}/`,
                                    component: articlePage,
                                    context: post,
                                });
                            });

                            resolve();
                        });
                    });
                });
            }

            return p;
        }).then(() => {

            resolve();
        });
    });
};