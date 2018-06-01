const client = require('../utils/contentfulAdminClient');
const admin = require('../utils/firebaseAdmin');


exports.handler = function createCommentAuthor(event, context, callback) {

    const headers = {
        'Content-Type': 'text/html'
    };

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
        .then(environment => environment.createEntryWithId('commentAuthor', authorId, {
            fields: {
                displayName: {
                    'en-US': author.displayName
                },
                avatarUrl: {
                    'en-US': author.photoURL
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
        .catch(function(err) {

            console.log(err);

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