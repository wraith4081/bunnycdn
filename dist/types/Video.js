"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoStatus = exports.VideoTranscodingMessageLevel = void 0;
var VideoTranscodingMessageLevel;
(function (VideoTranscodingMessageLevel) {
    VideoTranscodingMessageLevel[VideoTranscodingMessageLevel["Zero"] = 0] = "Zero";
    VideoTranscodingMessageLevel[VideoTranscodingMessageLevel["One"] = 1] = "One";
    VideoTranscodingMessageLevel[VideoTranscodingMessageLevel["Two"] = 2] = "Two";
})(VideoTranscodingMessageLevel || (exports.VideoTranscodingMessageLevel = VideoTranscodingMessageLevel = {}));
var VideoStatus;
(function (VideoStatus) {
    VideoStatus[VideoStatus["Created"] = 0] = "Created";
    VideoStatus[VideoStatus["Uploaded"] = 1] = "Uploaded";
    VideoStatus[VideoStatus["Processing"] = 2] = "Processing";
    VideoStatus[VideoStatus["Transcoding"] = 3] = "Transcoding";
    VideoStatus[VideoStatus["Finished"] = 4] = "Finished";
    VideoStatus[VideoStatus["Error"] = 5] = "Error";
    VideoStatus[VideoStatus["UploadFailed"] = 6] = "UploadFailed";
})(VideoStatus || (exports.VideoStatus = VideoStatus = {}));
