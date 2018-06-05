import React from 'react';
import Helmet from 'react-helmet';

import Link from 'gatsby-link';
import debounce from 'lodash.debounce';
import {createClient} from 'contentful';

import blogging from '../../assets/img/blogging.svg';

import Sidebar from './Sidebar.jsx';

import '../../styles/blog/BlogPage.scss';


const client = createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
    accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
    host: process.env.GATSBY_CONTENTFUL_HOST
});


class BlogPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            posts: [],
            page: 1,
            underFold: false,
            isQuerying: true,
            moreToLoad: true
        };

        this.onScroll = this.onScroll.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onClearSearch = this.onClearSearch.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);

        this.debouncedSearch = debounce(() => {

            this.setState({
                isQuerying: true
            }, () => {

                const limit = 50;
                const skip = limit * (this.state.page - 1);

                client.getEntries({
                    limit,
                    skip,
                    content_type: 'blog-post',
                    order: '-sys.createdAt',
                    query: this.state.query,
                }).then((response) => {

                    this.setState({
                        posts: this.state.posts.concat(response.items),
                        isQuerying: false,
                        moreToLoad: this.state.posts.length + response.items.length < response.total
                    });

                }).catch(console.error);

            });

        }, 500);
    }

    onScroll() {

        if (window.scrollY > (this.heroDiv.offsetTop + this.heroDiv.offsetHeight)) {

            if (!this.state.underFold) {
                this.setState({
                    underFold: true
                });
            }

        } else {

            if (this.state.underFold) {
                this.setState({
                    underFold: false
                });
            }
        }
    }

    componentDidMount() {

        this.search();

        this.fbq = window.fbq || (() => console.log('fake fbq'));

        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onSearch(e) {

        const query = e.currentTarget.value;

        if (query.length > 1) {
            this.fbq('track', 'Search', {
                search_string: query
            });
        }

        this.setState({ query }, () => {
            this.search();
        });
    }

    onClearSearch(e) {

        this.setState({
            query: ''
        }, () => {
            this.search();
        });
    }

    onLoadMore(e) {

        this.setState({
            page: this.state.page + 1
        }, () => {

            this.debouncedSearch();
        });
    }

    search() {

        this.setState({
            posts: [],
            page: 1
        }, () => {
            this.debouncedSearch();
        });
    }

    get posts() {

        return this.state.posts.map(({fields: post}) => (
            <li key={post.slug}>
                <div className="blog-post-summary">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="media">
                                <div className="media-left hidden-xs hidden-sm">
                                    <Link to={`/blog/${post.slug}`}>
                                        <div className="media-object" style={post.hero ? {backgroundImage: `url(${post.hero.fields.file.url})`} : null} />
                                    </Link>
                                </div>
                                <div className="media-body">
                                    <Link to={`/blog/${post.slug}`}>
                                        <h3 className="media-heading">{post.title}</h3>
                                    </Link>
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

                <Helmet>
                    <title>Shaun (as a service) - You think it, I build it.</title>

                    <meta property="description" content={`Thoughts on coding, product development, and indie hacking.`} />
                    <meta property="og:title" content="Shaun (as a service) - Blog" />
                    <meta property="og:url" content="https://shaunasaservice.com/blog/" />
                    <meta property="og:description" content={`Thoughts on coding, product development, and indie hacking.`} />
                    <meta property="og:image" content="https://shaunasaservice.com/shaun-as-a-service-shareable-blog.png" />

                    <meta name="twitter:title" content="Shaun (as a service) - Blog" />
                    <meta name="twitter:description" content={`Thoughts on coding, product development, and indie hacking.`} />
                    <meta name="twitter:image" content="https://shaunasaservice.com/shaun-as-a-service-shareable-blog.png" />

                </Helmet>

                <div
                    className="hero"
                    ref={(div => { this.heroDiv = div })}
                >

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
                                        placeholder="Looking for something? Search here."
                                        value={this.state.query}
                                        onChange={this.onSearch}
                                    />
                                    <button
                                        type="button"
                                        className={this.state.query.length  > 0 ? '' : 'hidden'}
                                        onClick={this.onClearSearch}
                                    >
                                        <span className="glyphicon glyphicon-remove" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Sidebar underFold={this.state.underFold} />


                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                <ul className="posts">
                                    {this.posts}
                                </ul>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="load-more">
                                            <button
                                                className={`btn${this.state.moreToLoad ? '' : ' hidden'}`}
                                                onClick={this.onLoadMore}
                                                disabled={this.state.isQuerying}
                                            >
                                                {this.state.isQuerying ? 'Loading...' : 'Load more'}
                                            </button>
                                        </div>
                                    </div>
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