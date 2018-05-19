import React from 'react';
import Link from 'gatsby-link';
import debounce from 'lodash.debounce';
import {createClient} from 'contentful';

import blogging from '../../assets/img/blogging.svg';

import '../../styles/blog/BlogPage.scss';


const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    host: process.env.CONTENTFUL_HOST
});

class BlogPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            posts: null,
            page: 1
        };

        this.onSearch = this.onSearch.bind(this);
        this.debouncedSearch = debounce(() => {

            const limit = 50;
            const skip = limit * (this.state.page - 1);

            client.getEntries({
                limit,
                skip,
                content_type: 'blog-post',
                query: this.state.query
            }).then((response) => {

                this.setState({
                    posts: response.items
                });

            }).catch(console.error);
        }, 500);
    }

    componentDidMount() {

        this.search();
    }

    onSearch(e) {

        this.setState({
            query: e.currentTarget.value
        }, () => {
            this.search();
        });
    }

    search() {

        this.setState({
            posts: null,
            page: 1
        }, () => {
            this.debouncedSearch();
        });
    }

    get posts() {

        if (!this.state.posts) {
            return (
                <li>
                    loading...
                </li>
            );
        }

        console.log(this.state.posts);

        return this.state.posts.map(({fields: post}) => (
            <li key={post.slug}>
                <div className="blog-post-summary">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="media">
                                <div className="media-left hidden-xs hidden-sm">
                                    <Link to={`/blog/${post.slug}`}>
                                        <div className="media-object" style={{backgroundImage: `url(${post.hero.fields.file.url})`}} />
                                    </Link>
                                </div>
                                <div className="media-body">
                                    <h3 className="media-heading">{post.title}</h3>
                                    {post.summary}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        ));
    }

    render() {

        return (
            <div className="blog-page">

                <div className="hero">

                    <div className="container">

                        <div className="row">
                            <div className="col-xs-12">
                                <h1>
                                    Thoughts on coding, product development, and indie hacking.
                                </h1>
                                <img src={blogging} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Looking for something?"
                                        value={this.state.query}
                                        onChange={this.onSearch}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="posts">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                <ul>
                                    {this.posts}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="container sidebar">
                        <div className="row">
                            <div className="col-lg-4 col-lg-offset-8 col-md-4 col-md-offset-8">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search"
                                        value={this.state.query}
                                        onChange={this.onSearch}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default BlogPage;