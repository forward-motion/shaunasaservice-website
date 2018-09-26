import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from 'react-commentbox';
import firebase from 'firebase/app';
// import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import request from 'axios';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import linkifyHtml from 'linkifyjs/html';
import Prism from 'prismjs';

import contentfulClient from '../../utils/contentfulClient';

import 'prismjs/themes/prism.css'
import '../../styles/blog/ArticleComments.scss';


TimeAgo.locale(en);

const timeAgo = new TimeAgo('en-US');

const config = {
    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID
};

class ArticleComments extends React.Component {

    state = { user: null, idToken: null, loading: false };

    componentDidMount() {

        if (typeof window !== 'undefined') {
            // firebase.initializeApp(config);
        }

        // let user = null;
        // let idToken = null;
        //
        // this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(firebaseUser => {
        //
        //     if (firebaseUser) {
        //
        //         this.setState({
        //             loading: true
        //         });
        //
        //         user = firebaseUser;
        //         user.getIdToken().then(firebaseIdToken => {
        //
        //             idToken = firebaseIdToken;
        //
        //             return contentfulClient.getEntries({
        //                 'order': 'sys.createdAt',
        //                 'content_type': 'commentAuthor',
        //                 'fields.userId': user.uid
        //             });
        //
        //         }).then(response => {
        //
        //             if (response.items.length) {
        //                 const commentAuthor = response.items[0].fields;
        //                 if (commentAuthor.displayName === user.displayName &&
        //                     commentAuthor.avatarUrl === user.photoURL) {
        //                     return user;
        //                 }
        //
        //                 return request.post('/.netlify/functions/update-comment-author', { idToken });
        //             }
        //
        //             return request.post('/.netlify/functions/create-comment-author', { idToken });
        //
        //         }).then(() => {
        //
        //             this.setState({ user, idToken, loading: false });
        //         }).catch((err) => {
        //             console.error(err);
        //             this.setState({ loading: false });
        //         });
        //
        //     } else {
        //
        //         this.setState({ user: null, idToken: null });
        //     }
        // });
    }

    componentWillUnmount() {

        // this.unregisterAuthObserver();
    }

    getComments = () => {

        return contentfulClient.getEntries({
            'order': 'sys.createdAt',
            'content_type': 'comment',
            'fields.subject': this.props.blogPostId,
            'include': 2
        }).then((response) => {

            return response.items;

        }).catch(console.error);
    };

    normalizeComment = (comment) => {

        const { id, createdAt } = comment.sys;
        const { body, author, parentComment } = comment.fields;

        const html = marked(body, {
            breaks: true
        });
        const cleanHtml = sanitizeHtml(html, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'br', 'p', 'pre', 'code' ],
            allowedAttributes: {
                'code': ['class']
            }
        });
        const linkifiedHtml = linkifyHtml(cleanHtml, {
            target: {
                url: '_blank'
            }
        });

        return {
            id,
            bodyDisplay: (
                <div
                    dangerouslySetInnerHTML={{
                        __html: linkifiedHtml
                    }}
                    ref={div => div ? Prism.highlightAllUnder(div) : null}
                />
            ),
            userNameDisplay: author.fields.displayName || 'Unnamed Commenter',
            userAvatarUrl: author.fields.avatarUrl,
            timestampDisplay: timeAgo.format(new Date(createdAt)),
            belongsToAuthor: this.state.user ? (this.state.user.uid === author.fields.userId) : false,
            parentCommentId: parentComment ? parentComment.sys.id : null
        };
    };

    comment = (body, parentCommentId) => {

        this.setState({ loading: true });

        return request.post('/.netlify/functions/create-comment', {
            body,
            parentCommentId,
            subjectId: this.props.blogPostId,
            idToken: this.state.idToken
        }).then(() => {

            this.setState({ loading: false });
        });
    };

    disabledComponent = () => {

        if (this.state.loading) {
            return (
                <div>
                    <h5>
                        Please wait...
                    </h5>
                </div>
            );
        }

        return (
            <div>
                <h5>
                    Please login above to comment.
                </h5>
            </div>
        );
    };

    authComponent = () => {

        return (<div>hey</div>);

        // if (this.state.user) {
        //
        //     return (
        //         <div className="logout">
        //             <button onClick={this.logout}>
        //                 <span>
        //                 {`Logout ${this.state.user.displayName ? this.state.user.displayName : 'Unnamed Commenter'}`}
        //                 </span>
        //             </button>
        //         </div>
        //     );
        // }
        //
        // const uiConfig = {
        //     signInFlow: 'popup',
        //     signInOptions: [
        //         firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //         firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //     ],
        //     callbacks: {
        //         signInSuccess: () => false
        //     }
        // };
        //
        // return (
        //     <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        // );
    };

    logout = (e) => {
        // firebase.auth().signOut();
    };

    render() {

        return (
            <div className="article-comments">
                <div className="titles">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <h3 id="comments" className="title">Comments</h3>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <div className="title">
                                <this.authComponent />
                            </div>
                        </div>
                    </div>
                </div>

                <CommentBox
                    usersHaveAvatars={true}
                    levelPadding={50}
                    disabled={!this.state.user || this.state.loading}
                    getComments={this.getComments}
                    normalizeComment={this.normalizeComment}
                    comment={this.comment}
                    disabledComponent={this.disabledComponent}
                    showReplyButtonContent={this.props.showReplyButtonContent}
                    hideReplyButtonContent={this.props.hideReplyButtonContent}
                    postButtonExtraContent={this.props.postButtonExtraContent}
                />
            </div>
        );
    }

    static get defaultProps() {
        return {
            showReplyButtonContent: (
                <span>reply</span>
            ),
            hideReplyButtonContent: (
                <span>cancel</span>
            ),
            postButtonExtraContent: (
                <div className="instructions">
                    <div className="row">
                        <div className="col-xs-12">
                            <span className="icon-info2" />
                        </div>
                    </div>
                    <div className="row formatting">
                        <div className="col-xs-3">
                            <strong>bold</strong>
                            <p>**text**</p>
                        </div>
                        <div className="col-xs-3">
                            <i>
                                italic
                            </i>
                            <p>
                                *text*
                            </p>
                        </div>
                        <div className="col-xs-3">
                            <code>code</code>
                            <p>
                                `text`
                            </p>
                        </div>
                        <div className="col-xs-3">
                            <code>block</code>
                            <p>
                                ```lang<br />text<br />```
                            </p>
                        </div>
                    </div>
                </div>
            )
        };
    }
}

export default ArticleComments;
