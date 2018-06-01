const client = require('../utils/contentfulAdminClient');
const admin = require('../utils/firebaseAdmin');


exports.handler = function flagComment(event, context, callback) {

    const headers = {
        'Content-Type': 'text/html'
    };

    const { idToken, commentId } = JSON.parse(event.body);
    let authorId = null;

    admin.auth().verifyIdToken(idToken)
        .then(({ uid }) => {

            authorId = uid;
            return client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID);
        })
        .then(space => space.getEnvironment('master'))
        .then(environment => environment.getEntry(commentId))
        .then(entry => {

            entry.fields.flagged = {
                'en-US': true
            };
            return entry.update();
        })
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


