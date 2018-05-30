import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import CommentBox from 'react-commentbox';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import Prism from 'prismjs';
import Promise from 'promise-polyfill';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import firebase from 'firebase';
import 'firebase/auth';
import { createClient } from 'contentful';


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

const config = {
    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID
};

TimeAgo.locale(en);

const timeAgo = new TimeAgo('en-US');

const client = createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
    accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
    host: process.env.GATSBY_CONTENTFUL_HOST
});

firebase.initializeApp(config);


function postRequest(url, data) {

    return new Promise((resolve, reject) => {

        const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        xhr.open('POST', url);
        xhr.onreadystatechange = () => {

            if (xhr.readyState > 3 && xhr.status === 200) {

                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error('A server error occurred.'));
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(data));
    });
}


class ArticlePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            underFold: false,
            user: null,
            idToken: null
        };

        this.onScroll = this.onScroll.bind(this);
        this.getComments = this.getComments.bind(this);
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
                user = firebaseUser;
                user.getIdToken().then(firebaseIdToken => {

                    idToken = firebaseIdToken;
                    return client.getEntries({
                        'content_type': 'commentAuthor',
                        'fields.id': user.uid
                    });
                }).then(response => {

                    if (response.items.length) {
                        const commentAuthor = response.items[0].fields;
                        if (commentAuthor.displayName === user.displayName && commentAuthor.avatarUrl === user.photoURL) {
                            return user;
                        }

                        return postRequest('/.netlify/functions/update-comment-author', {
                            idToken: this.state.idToken
                        });
                    }

                    return postRequest('/.netlify/functions/create-comment-author', {
                        idToken: this.state.idToken
                    });
                }).then(() => {

                    this.setState({ user, idToken });
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

        return this.props.contentfulClient.getEntries({
            'order': 'sys.createdAt',
            'content_type': 'comment',
            'fields.blogPost.sys.id': this.props.blogPostId,
        }).then((response) => {

            return response.items;

        }).catch(console.error);
    }

    normalizeComment(comment) {

        const { id, createdAt } = comment.sys;
        const { body, author, parentComment, flagged } = comment.fields;

        return {
            id,
            flagged,
            bodyDisplay: body,
            userNameDisplay: author.fields.displayName,
            userAvatarUrl: author.field.avatarUrl,
            timestampDisplay: timeAgo.format(new Date(createdAt)),
            belongsToAuthor: this.props.user ? (this.props.user.uid === author.fields.id) : false,
            parentCommentId: parentComment ? parentComment.sys.id : null
        };
    }

    comment(body) {

        return postRequest('/.netlify/functions/create-comment', {
            body,
            idToken: this.state.idToken,
            blogPostId: this.props.blogPostId
        });
    }

    reply(body, commentId) {

        return postRequest('/.netlify/functions/create-comment', {
            body,
            idToken: this.state.idToken,
            blogPostId: this.props.blogPostId,
            parentCommentId: commentId
        });
    }

    flag(commentId) {

        return postRequest('/.netlify/functions/flag-comment', {
            idToken: this.state.idToken,
            commentId: commentId
        });
    }

    disabledComponent() {

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
            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        );
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

                    <meta name="twitter:title" content={post.title} />
                    <meta name="twitter:description" content={post.summary} />
                    <meta name="twitter:image" content={post.hero.file.url} />

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
                        </div>
                        <div className="row comments">
                            <div className="col-xs-12">
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
        );
    }
}

export default ArticlePage;