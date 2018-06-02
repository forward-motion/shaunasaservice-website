import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from 'react-commentbox';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import request from 'superagent';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import linkifyHtml from 'linkifyjs/html';
import Prism from 'prismjs';

import contentfulClient from '../../utils/contentfulClient';
import firebase from '../../utils/firebase';

import 'prismjs/themes/prism.css'
import '../../styles/blog/ArticleComments.scss';


TimeAgo.locale(en);

const timeAgo = new TimeAgo('en-US');

class ArticleComments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            idToken: null,
            loading: false
        };

        this.getComments = this.getComments.bind(this);
        this.normalizeComment = this.normalizeComment.bind(this);
        this.comment = this.comment.bind(this);
        this.reply = this.reply.bind(this);
        this.flag = this.flag.bind(this);
        this.disabledComponent = this.disabledComponent.bind(this);
        this.authComponent = this.authComponent.bind(this);
    }

    componentDidMount() {

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
                }).catch((err) => {
                    console.error(err);
                    this.setState({ loading: false });
                });

            } else {

                this.setState({ user: null, idToken: null });
            }
        });
    }

    componentWillUnmount() {

        this.unregisterAuthObserver();
    }

    getComments() {

        return contentfulClient.getEntries({
            'order': 'sys.createdAt',
            'content_type': 'comment',
            'fields.blogPost.sys.id': this.props.blogPostId,
            'include': 2
        }).then((response) => {

            return response.items;

        }).catch(console.error);
    }

    normalizeComment(comment) {

        const { id, createdAt } = comment.sys;
        const { body, author, parentComment, flagged } = comment.fields;

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
            flagged,
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
            belongsToAuthor: this.state.user ? (this.state.user.uid === author.sys.id) : false,
            parentCommentId: parentComment ? parentComment.sys.id : null
        };
    }

    comment(body) {

        this.setState({ loading: true });

        return request.post('/.netlify/functions/create-comment').send({
            body,
            blogPostId: this.props.blogPostId,
            idToken: this.state.idToken
        }).then(() => {

            this.setState({ loading: false });
        });
    }

    reply(body, parentCommentId) {

        this.setState({ loading: true });

        return request.post('/.netlify/functions/create-comment').send({
            body,
            parentCommentId,
            blogPostId: this.props.blogPostId,
            idToken: this.state.idToken
        }).then(() => {

            this.setState({ loading: false });
        });
    }

    flag(commentId) {

        return request.post('/.netlify/functions/flag-comment').send({
            commentId,
            idToken: this.state.idToken
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

        return (
            <div>
                <h5>
                    Please login above to comment.
                </h5>
            </div>
        );
    }

    authComponent() {

        if (this.state.user) {

            return (
                <div className="logout">
                    <button onClick={this.logout}>
                        <span>
                        {`Logout ${this.state.user.displayName ? this.state.user.displayName : 'Unnamed Commenter'}`}
                        </span>
                    </button>
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
            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        );
    }

    logout(e) {
        firebase.auth().signOut();
    }

    render() {

        return (
            <div className="article-comments">
                <div className="titles">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <h3 className="title">Comments</h3>
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
                    disabled={!this.state.user || this.state.loading}
                    getComments={this.getComments}
                    normalizeComment={this.normalizeComment}
                    comment={this.comment}
                    reply={this.reply}
                    flag={this.flag}
                    disabledComponent={this.disabledComponent}
                    flagButtonContent={this.props.flagButtonContent}
                    showReplyButtonContent={this.props.showReplyButtonContent}
                    hideReplyButtonContent={this.props.hideReplyButtonContent}
                    postButtonExtraContent={this.props.postButtonExtraContent}
                />
            </div>
        );
    }

    static get defaultProps() {
        return {
            flagButtonContent: (
                <span>flag</span>
            ),
            showReplyButtonContent: (
                <span>reply</span>
            ),
            hideReplyButtonContent: (
                <span>cancel</span>
            ),
            postButtonExtraContent: (
                <div className="instructions">
                    <div className="row">
                        <div className="col-xs-3">
                            <span className="icon-info2" />
                        </div>
                        <div className="col-xs-3 formatting">
                            <strong>bold</strong>
                            <p>__text__</p>
                        </div>
                        <div className="col-xs-3 formatting">
                            <i>
                                italic
                            </i>
                            <p>
                                *text*
                            </p>
                        </div>
                        <div className="col-xs-3 formatting">
                            <code>code</code>
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
