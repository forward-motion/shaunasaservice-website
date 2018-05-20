import React from 'react';
import Helmet from 'react-helmet';

import Sidebar from './Sidebar.jsx';

import '../../styles/blog/ArticlePage.scss';

class ArticlePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            underFold: false
        };

        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {

        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {

        window.removeEventListener('scroll', this.onScroll);
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

    render() {

        const { pathContext: post } = this.props;

        return (
            <div className="article-page">

                <Helmet
                    title={`Shaun (as a service) - ${post.title}`}
                    meta={[
                        { name: 'description', content: post.summary },
                    ]}
                >

                    <meta property="og:title" content={post.title} />
                    <meta property="og:url" content={`https://shaunasaservice.com/blog/${post.slug}/`} />
                    <meta property="og:description" content={post.summary} />
                    <meta property="og:image" content={post.hero.file.url} />

                </Helmet>

                <div
                    className="hero"
                    ref={(div => { this.heroDiv = div })}
                >

                    <div className="container">

                        <div className="row">
                            <div className="col-xs-12">
                                <h1>
                                    {post.title}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <Sidebar underFold={this.state.underFold} />


                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                <div
                                    className="post-content"
                                    dangerouslySetInnerHTML={{
                                        __html: post.description.childMarkdownRemark.html,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticlePage;