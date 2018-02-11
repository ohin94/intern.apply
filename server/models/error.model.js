/**
 * Server error class
 * use this class to set the error code and message of a server error.
 * used to keep track of errors responses to http requests.
 */

/**
 * all error codes and messages
 */
const codes = {
    0: 'unknown error',
    1: 'invalid email address',
    2: 'invalid message title',
    3: 'invalid message body',
    11: 'invalid job organization',
    12: 'invalid job title',
    13: 'invalid job location',
    14: 'invalid job description',
    31: 'invalid id',
};

class Error {
    constructor(code) {
        this.code = code;
        this.message = codes[code];
    }

}

module.exports = Error;