import React from 'react';
import Link from 'gatsby-link';

function pagination(currentPage, totalNumPages) {

    const maxNumPages = 10;
    const numbers = [];
    let page = currentPage - (maxNumPages / 2);
    if (page < 1) {
        page = 1;
    }

    if (currentPage > 1) {
        numbers.push(
            <li key="previous" aria-label="previous">
                <Link to={`/blog/page/${currentPage - 1}`}>
                    <span aria-hidden="true">&laquo;</span>
                </Link>
            </li>
        );
    }

    for (let x = 0; x < maxNumPages; x++) {

        if (page > totalNumPages) {
            break;
        }

        numbers.push(
            <li key={page}>
                <Link to={`/blog/page/${page}`}>
                    {page}
                </Link>
            </li>
        );

        page++;
    }

    if (currentPage !== totalNumPages) {

        numbers.push(
            <li key="next" aria-label="next">
                <Link to={`/blog/page/${currentPage + 1}`}>
                    <span aria-hidden="true">&raquo;</span>
                </Link>
            </li>
        );
    }

    return numbers;
}

const BlogPostSummary = ({ post }) => (
    <div className="blog-post-summary">
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="media">
                    <div className="media-left">
                        <Link to={`/blog/${post.slug}`}>
                            <img className="media-object" src={post.hero.file.url} />
                        </Link>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">{post.title}</h4>
                        {post.summary}
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const BlogPage = ({ pathContext: { page, totalNumPages }, data: { allContentfulBlogPost: { edges } } }) => {

    return (
        <div className="blog-page">
            <ul>
                {edges.map(({ node: post }) => (
                    <li key={post.slug}>
                        <BlogPostSummary post={post} />
                    </li>
                ))}
            </ul>
            <nav aria-label="page navigation">
                <ul className="pagination">
                    {pagination(page, totalNumPages)}
                </ul>
            </nav>
        </div>
    );
};

export default BlogPage;

export const pageQuery = graphql`
    query allBlogPostsQuery($limit: Int, $skip: Int) {
        allContentfulBlogPost(
            limit: $limit
            skip: $skip            
            sort: {
                fields: [createdAt]
                order: DESC
            }
        ) {
            edges {
                node {
                    title
                    slug
                    hero {
                      file {
                        url
                      }
                      title
                    }
                    summary
                }
            }
        }
    }
`;