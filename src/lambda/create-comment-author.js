const createCommentAuthor = require('../utils/createCommentAuthor');

exports.handler = function (event, context, callback) {

    const { idToken } = JSON.parse(event.body);

    createCommentAuthor(idToken)
        .then(() => {

            callback(null, {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                body: JSON.stringify({ message: 'OK' })
            });
        })
        .catch(callback);
};