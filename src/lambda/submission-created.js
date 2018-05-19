const http = require('https');

exports.handler = function submissionCreated(event, context, callback) {


    const request = JSON.parse(event.body);
    console.log('hello?');
    console.log('event', Object.keys(request));
    console.log('event', request.payload);

    callback(null, {
        statusCode: 200
    });

    // let body = '';
    //
    // const data = JSON.stringify({
    //     email: event.body.email,
    //     api_key: process.env.GATSBY_CONVERTKIT_API_KEY
    // });
    //
    // const request = http.request({
    //     host: 'api.convertkit.com',
    //     path: `/courses/${process.env.GATSBY_CONVERTKIT_SEQUENCE_ID}/subscribe`,
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json; charset=utf-8',
    //         'Content-Length': Buffer.byteLength(data)
    //     }
    // }, function response(res) {
    //
    //     res.setEncoding('utf8');
    //
    //     res.on('data', function (chunk) {
    //         console.log('Response: ' + chunk);
    //         body+= chunk;
    //     });
    //
    //     res.on('end', function() {
    //
    //         callback(null, {
    //             statusCode: 200
    //         });
    //     });
    // });
    //
    // request.write(data);
    // request.end();
};
