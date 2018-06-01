const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "shaun-as-a-service",
        "private_key_id": "d45865dd4f640241eb85ddebb6fffdf60b6fe044",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCoClhjRvibEz1g\nj5/2WrSVb/737ryGU7aiOUE8qnycogIg67JqGW3eApG90QQyLMAbBN5ujXQm2NEd\ngdVsaSYn+4phDUjfTq1oeoSsOuaHPwdfbAlssKe546WrWrpxVENoYvPB8IM+8NHs\nwGlLhWwZ52SpO80OlePQunV9Y0Nr45/ncoPjsxkBD7Z8Zwc8YdJV8DJazWaDH6Xo\nnDrRxlsaPksyK1jEfG1CM+KG0UA4s4QGbxWXfxtxHQwkyY6CJOu/G+3Q6ku9ddjS\nuFI/mmI+HJt7lLuh8nPmvAmtoSM01m3ZctarBiG9d9Tu8uSXthGFOSHCTItI1KPl\n3eot7L51AgMBAAECggEAA7XOw8piXNIs7b/eEUtpZ09EuuarhO++PZC0DwnYnIC7\nOUza8JrFITy/SQifZhg02aPe4WQAJ4dr/pHKS416yTE1mfT4Ie4TyBXEbiUSx/Ot\nTv8MqjiwS1tqYgEr0qrAnkJpDWQpEa+xgt+ws3krrNq+DzqByYunrwke5PjXGT+x\nKFwTG8K5x0n0w1Wg2xIY7cTAu4zE/ABGKwtOH4J93DgpLn+nfDKndZH18WcMzmuF\n6fR87hT30RuayyzsohdJOTX6baas1uD8z2y+dVStYB1OJaHaEra3T0b1Oo89Xew4\nxj1OpmU8nRJKTWChIg0khpT6Spb5Hxltv+nDIHrqgQKBgQDlkbGpNzcJaF6csgi2\nkKaP71XVhT/k09SLEObRXSkSYGMw8RAmWjEhqPxHe7sgQ3lpi6mXDA67WXiV/e0Q\nfVlcsvxLheNN6trtmYXGRTuDryxWMWHOWY3jrvi5qt+k/ZeQ5onIGsZVGhvVMPow\nLRZ51EfOfnN47fqMSK/5w7MMFQKBgQC7Yyhx97Q5s0bDlIQkUVW1a8o3+1MHeaQ9\n0ObrWI15E19duGC6fbr9twrBMXqTwYI6EDIkZIj8HtJM+AcpzZxxagf9pfHZ/L4A\n6U86Z9vTRcBHmc/nssH4xwTcCb/p7hMKgxV7mPAvTb+JnqtNJytBZ27ISME9J/qr\n/M0odHqg4QKBgQCcY+Jp6ol9yTIbAVXaOTSe/Wa17O6YDo7Ophb4LcTbFfq8zpw3\n5F1wFtS2Rd42noDJnDFOCxLGIq95TuD+yMXl1rD1KiKtY/78ugdeCLAAh4dmuIFu\nt6dnoj0jDvsIRRHJzqOyRDs0onKvi4wE4dJb8HdyfsZfbY+vnZz0Q5Nn+QKBgQC0\nYdR6OPddn+0bsmityTnXRWbJEv6vMHJhKypPHNQ62+IuhqFehE+vkjchGC8l8t4Y\nZKTQEZMoF8dbXlsO66WQK4B7s/WnYLvKhszErVuX+goJItBW+uXsRDCyXBRI7OuZ\nb+wLKYL0FkSuBnZh87WY5SdoV1jlNQoB633WVqIBIQKBgQC3ZhRytkHgu5BDCVDQ\nMRCvSlDUlaxnLJiYNEBoJ7By+ypTgnEAfZ3gimGJNEq7dtusRV2HzQD3+ZwEdW3o\ngbO4cHEIGZ3yFJXonlP1BnR68I41/FfxVwLv+2Z9l11aAM4k+SuWyaShJDjpU8y4\n9TawKxuvC1cxxywO6NvQBPhwzQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-l7p34@shaun-as-a-service.iam.gserviceaccount.com",
        "client_id": "112271470323379256130",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l7p34%40shaun-as-a-service.iam.gserviceaccount.com"
    }),
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL
});

module.exports = admin;