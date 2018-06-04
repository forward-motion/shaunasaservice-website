const updateCommentAuthor = require('../utils/updateCommentAuthor');


exports.handler = function (event, context, callback) {

    const { idToken } = JSON.parse(event.body);

    updateCommentAuthor(idToken)
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
