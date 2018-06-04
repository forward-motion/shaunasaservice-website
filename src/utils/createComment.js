const getAuthor = require('./getAuthor');

module.exports = function createComment(idToken, body, subjectId, parentCommentId) {

    return getAuthor(idToken)
        .then(({environment, author}) => {

            return environment.createEntry('comment', {
                fields: {
                    body: {
                        'en-US': body
                    },
                    author: {
                        'en-US': {
                            sys: {
                                type: 'Link',
                                linkType: 'Entry',
                                id: author.sys.id
                            }
                        }
                    },
                    subject: {
                        'en-US': subjectId
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
            });

        })
        .then(entry => entry.publish());

};
