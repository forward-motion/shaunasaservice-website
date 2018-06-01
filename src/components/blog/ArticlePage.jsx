import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import CommentBox from 'react-commentbox';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import Prism from 'prismjs';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import request from 'superagent';


import contentfulClient from '../../utils/contentfulClient';
import firebase from '../../utils/firebase';

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

import 'prismjs/themes/prism-tomorrow.css'
import '../../styles/blog/ArticlePage.scss';


TimeAgo.locale(en);

const timeAgo = new TimeAgo('en-US');

class ArticlePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            underFold: false,
            user: null,
            idToken: null,
            loading: false
        };

        this.onScroll = this.onScroll.bind(this);
        this.getComments = this.getComments.bind(this);
        this.normalizeComment = this.normalizeComment.bind(this);
        this.comment = this.comment.bind(this);
        this.reply = this.reply.bind(this);
        this.flag = this.flag.bind(this);
        this.disabledComponent = this.disabledComponent.bind(this);
    }

    componentDidMount() {

        window.addEventListener('scroll', this.onScroll);

        Prism.highlightAllUnder(ReactDOM.findDOMNode(this));

        let user = null;
        let idToken = null;

        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(firebaseUser => {

            if (firebaseUser) {

                this.setState({
                    loading: true
                });

                user = firebaseUser;
                user.getIdToken().then(firebaseIdToken => {

                    idToken = firebaseIdToken;

                    return contentfulClient.getEntries({
                        'content_type': 'commentAuthor',
                        'sys.id': user.uid
                    });

                }).then(response => {

                    if (response.items.length) {
                        const commentAuthor = response.items[0].fields;
                        if (commentAuthor.displayName === user.displayName && commentAuthor.avatarUrl === user.photoURL) {
                            return user;
                        }

                        return request.post('/.netlify/functions/update-comment-author').send({ idToken });
                    }

                    return request.post('/.netlify/functions/create-comment-author').send({ idToken });

                }).then(() => {

                    this.setState({ user, idToken, loading: false });
                }).catch(() => {
                    this.setState({ loading: false });
                });

            } else {

                this.setState({ user: null, idToken: null });
            }
        });
    }

    componentWillUnmount() {

        window.removeEventListener('scroll', this.onScroll);

        this.unregisterAuthObserver();
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

    getComments() {

        const { pathContext: { contentful_id: postId } } = this.props;

        return contentfulClient.getEntries({
            'order': 'sys.createdAt',
            'content_type': 'comment',
            'fields.blogPost.sys.id': postId,
            'include': 2
        }).then((response) => {

            return response.items;

        }).catch(console.error);
    }

    normalizeComment(comment) {

        const { id, createdAt } = comment.sys;
        const { body, author, parentComment, flagged } = comment.fields;

        console.log('author', author);

        return {
            id,
            flagged,
            bodyDisplay: body,
            userNameDisplay: author.fields.displayName,
            userAvatarUrl: author.fields.avatarUrl,
            timestampDisplay: timeAgo.format(new Date(createdAt)),
            belongsToAuthor: this.state.user ? (this.state.user.uid === author.fields.id) : false,
            parentCommentId: parentComment ? parentComment.sys.id : null
        };
    }

    comment(body) {

        const { pathContext: { contentful_id: postId } } = this.props;

        this.setState({ loading: true });

        return request.post('/.netlify/functions/create-comment').send({
            body,
            idToken: this.state.idToken,
            blogPostId: postId
        }).then(() => {

            this.setState({ loading: false });
        });
    }

    reply(body, commentId) {

        this.setState({ loading: true });

        const { pathContext: { contentful_id: postId } } = this.props;

        return request.post('/.netlify/functions/create-comment').send({
            body,
            idToken: this.state.idToken,
            blogPostId: postId,
            parentCommentId: commentId
        }).then(() => {

            this.setState({ loading: false });
        });
    }

    flag(commentId) {

        return request.post('/.netlify/functions/flag-comment').send({
            idToken: this.state.idToken,
            commentId: commentId
        });
    }

    disabledComponent() {

        if (this.state.loading) {
            return (
                <div>
                    <h5>
                        Please wait...
                    </h5>
                </div>
            );
        }

        const uiConfig = {
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                signInSuccess: () => false
            }
        };

        return (
            <div>
                <h5>
                    Please login to comment:
                </h5>
                <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }

    render() {

        const { pathContext: post } = this.props;
        const url = `https://shaunasaservice.com/blog/${post.slug}/`;

        console.log('user', this.state.user);

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
                    <meta property="og:image" content={post.hero ? post.hero.file.url : ''} />

                    <meta name="twitter:title" content={post.title} />
                    <meta name="twitter:description" content={post.summary} />
                    <meta name="twitter:image" content={post.hero ? post.hero.file.url : ''} />

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
                            <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
                                <h4>
                                    {post.summary}
                                </h4>
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
                                    className="post-content language-javascript"
                                    dangerouslySetInnerHTML={{
                                        __html: post.description.childMarkdownRemark.html,
                                    }}
                                />
                            </div>
                            <div className="col-lg-8 col-md-8">
                                <div className="comments">
                                    <h4>
                                        Comments
                                    </h4>

                                    <CommentBox
                                        usersHaveAvatars={true}
                                        disabled={!this.state.user}
                                        getComments={this.getComments}
                                        normalizeComment={this.normalizeComment}
                                        comment={this.comment}
                                        reply={this.reply}
                                        flag={this.flag}
                                        disabledComponent={this.disabledComponent}
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

export default ArticlePage;
