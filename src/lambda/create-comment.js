const contentful = require('contentful-management');
const admin = require('firebase-admin');

const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_API_KEY
});

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
    }),
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL
});


exports.handler = function createComment(event, context, callback) {

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
        .then(() => {

            callback(null, {
                statusCode: 200
            });
        })
        .catch(function() {

            if (!authorId) {
                return callback(null, {
                    statusCode: 401
                });
            }
            callback(null, {
                statusCode: 400
            });
        });
};

