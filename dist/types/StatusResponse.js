"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusResponse;
(function (StatusResponse) {
    StatusResponse[StatusResponse["OK"] = 200] = "OK";
    StatusResponse[StatusResponse["CREATED"] = 201] = "CREATED";
    StatusResponse[StatusResponse["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusResponse[StatusResponse["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusResponse[StatusResponse["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusResponse[StatusResponse["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    // Undefined
    StatusResponse[StatusResponse["UNDEFINED"] = 0] = "UNDEFINED";
})(StatusResponse || (StatusResponse = {}));
exports.default = StatusResponse;
