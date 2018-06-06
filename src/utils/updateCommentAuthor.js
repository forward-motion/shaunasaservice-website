const admin = require('./firebaseAdmin');
const getAuthor = require('./getAuthor');


module.exports = function updateCommentAuthor(idToken) {

    let commentAuthor = null;

    return getAuthor(idToken)
        .then(({ author }) => {

            console.log('author', author);
            commentAuthor = author;
            return admin.auth().getUser(author.fields.userId);
        })
        .then(user => {

            console.log('user', user);

            commentAuthor.fields.displayName = {
                'en-US': user.displayName
            };
            commentAuthor.fields.avatarUrl = {
                'en-US': user.photoURL
            };

            return commentAuthor.update();
        })
        .then(entry => entry.publish());
};

