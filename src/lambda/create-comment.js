const createComment = require('../utils/createComment');

exports.handler = function (event, context, callback) {

    const { idToken, body, subjectId, parentCommentId } = JSON.parse(event.body);

    createComment(idToken, body, subjectId, parentCommentId)
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

