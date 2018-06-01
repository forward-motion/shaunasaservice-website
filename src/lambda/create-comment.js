const client = require('../utils/contentfulAdminClient');
const admin = require('../utils/firebaseAdmin');


exports.handler = function createComment(event, context, callback) {

    const headers = {
        'Content-Type': 'text/html'
    };

    const { idToken, body, blogPostId, parentCommentId } = JSON.parse(event.body);
    let authorId = null;

    admin.auth().verifyIdToken(idToken)
        .then(({ uid }) => {

            authorId = uid;
            return client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID);
        })
        .then(space => space.getEnvironment('master'))
        .then(environment => environment.createEntry('comment', {
            fields: {
                body: {
                    'en-US': body
                },
                author: {
                    'en-US': {
                        sys: {
                            type: 'Link',
                            linkType: 'Entry',
                            id: authorId
                        }
                    }
                },
                blogPost: {
                    'en-US': {
                        sys: {
                            type: 'Link',
                            linkType: 'Entry',
                            id: blogPostId
                        }
                    }
                },
                parentComment: {
                    'en-US': {
                        sys: {
                            type: 'Link',
                            linkType: 'Entry',
                            id: parentCommentId
                        }
                    }
                }
            }
        }))
        .then(entry => entry.publish())
        .then(() => {

            callback(null, {
                headers,
                statusCode: 200,
                body: 'OK'
            });
        })
        .catch(function() {

            if (!authorId) {
                return callback(null, {
                    headers,
                    statusCode: 401,
                    body: 'Error'
                });
            }
            callback(null, {
                headers,
                statusCode: 400,
                body: 'Error'
            });
        });
};

