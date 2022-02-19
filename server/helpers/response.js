
module.exports.Response = class Response {
    success;
    data;
    message;

    constructor(message = "", success, data) {
        this.message = message;
        this.success = success;
        this.data = data;
    }
}