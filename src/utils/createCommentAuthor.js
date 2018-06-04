const client = require('./contentfulAdminClient');
const admin = require('./firebaseAdmin');

module.exports = function createComment(idToken) {

    let user = null;

    return admin.auth().verifyIdToken(idToken)
        .then(({ uid }) => {

            return admin.auth().getUser(uid);
        })
        .then(_user => {

            user = _user;
            return client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID);
        })
        .then(space => space.getEnvironment('master'))
        .then(environment => environment.createEntry('commentAuthor', {
            fields: {
                userId: {
                    'en-US': user.uid
                },
                displayName: {
                    'en-US': user.displayName
                },
                avatarUrl: {
                    'en-US': user.photoURL
                }
            }
        }))
        .then(entry => entry.publish());

};
