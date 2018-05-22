import React from 'react';
import Helmet from 'react-helmet';
import TweetEmbed from 'react-tweet-embed';

import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    EmailShareButton,
} from 'react-share';

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
        const url = `https://shaunasaservice.com/blog/${post.slug}/`;

        return (
            <div className="article-page">

                <Helmet
                    title={`Shaun (as a service) - ${post.title}`}
                    meta={[
                        { name: 'description', content: post.summary },
                    ]}
                >

                    <meta property="og:title" content={post.title} />
                    <meta property="og:url" content={url} />
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

                <Sidebar underFold={this.state.underFold}>

                    <ul className="share-buttons">
                        <li>
                            <FacebookShareButton url={url}>
                                <span className="icon-facebook" />
                            </FacebookShareButton>
                        </li>
                        <li>
                            <TwitterShareButton url={url}>
                                <span className="icon-twitter" />
                            </TwitterShareButton>
                        </li>
                        <li>
                            <LinkedinShareButton url={url}>
                                <span className="icon-linkedin2" />
                            </LinkedinShareButton>
                        </li>
                        <li>
                            <RedditShareButton url={url}>
                                <span className="icon-reddit" />
                            </RedditShareButton>
                        </li>
                        <li>
                            <TelegramShareButton url={url}>
                                <span className="icon-telegram" />
                            </TelegramShareButton>
                        </li>
                        <li>
                            <WhatsappShareButton url={url}>
                                <span className="icon-whatsapp" />
                            </WhatsappShareButton>
                        </li>
                        <li>
                            <EmailShareButton url={url}>
                                <span className="icon-envelop2" />
                            </EmailShareButton>
                        </li>
                    </ul>

                </Sidebar>


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
                        <div className="row comments">
                            <div className="col-xs-12">
                                <h4>
                                    Want to leave a comment? Reply to the tweet below:
                                </h4>
                                {post.tweet ? (
                                    <TweetEmbed id={post.tweet} options={{
                                        cards: 'hidden',
                                        theme: 'light',
                                        linkColor: '#6C63FF',
                                        borderColor: '#6C63FF',
                                        dnt: true
                                    }}/>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticlePage;