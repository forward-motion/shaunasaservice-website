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


exports.handler = function createCommentAuthor(event, context, callback) {

    const { idToken } = JSON.parse(event.body);
    let authorId = null;
    let author = null;

    admin.auth().verifyIdToken(idToken)
        .then(({ uid }) => {

            authorId = uid;
            return admin.auth().getUser(uid);
        })
        .then(user => {

            author = user;
            return client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID);
        })
        .then(space => space.getEnvironment('master'))
        .then(environment => environment.createEntry('commentAuthor', {
            fields: {
                id: {
                    'en-US': authorId
                },
                displaName: {
                    'en-US': author.displayName
                },
                avatarUrl: {
                    'en-US': author.photoURL
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