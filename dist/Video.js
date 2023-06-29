"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatusResponse_1 = __importDefault(require("./types/StatusResponse"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class Video {
    constructor(library, data, videoId) {
        this.library = library;
        this.data = data;
        this.videoId = videoId;
    }
    /**
     * @description Update a video's metadata
     */
    Update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const validKeys = ["title", "collectionId", "chapters", "moments", "metaTags"];
            const payload = (Object.keys(props).filter(key => validKeys.includes(key))).reduce((acc, key) => {
                acc[key] = props[key];
                return acc;
            }, {});
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/*+json',
                    AccessKey: this.library.accessKey
                },
                body: JSON.stringify(payload)
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                this.data = Object.assign(Object.assign({}, this.data), payload);
                return {
                    status: StatusResponse_1.default.OK,
                    data: body
                };
            }
            if (status === 401) {
                return {
                    status: StatusResponse_1.default.UNAUTHORIZED,
                    data: null
                };
            }
            if (status === 404) {
                return {
                    status: StatusResponse_1.default.NOT_FOUND,
                    data: null
                };
            }
            if (status === 500) {
                return {
                    status: StatusResponse_1.default.INTERNAL_SERVER_ERROR,
                    data: null
                };
            }
            return {
                status: StatusResponse_1.default.UNDEFINED,
                data: null
            };
        });
    }
    /**
     * @description Delete this video
     */
    Delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "DELETE",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.library.accessKey
                }
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                return {
                    status: StatusResponse_1.default.OK,
                    data: body
                };
            }
            if (status === 401) {
                return {
                    status: StatusResponse_1.default.UNAUTHORIZED,
                    data: null
                };
            }
            if (status === 404) {
                return {
                    status: StatusResponse_1.default.NOT_FOUND,
                    data: null
                };
            }
            if (status === 500) {
                return {
                    status: StatusResponse_1.default.INTERNAL_SERVER_ERROR,
                    data: null
                };
            }
            return {
                status: StatusResponse_1.default.UNDEFINED,
                data: null
            };
        });
    }
    /**
     * @description Get the video's transcoding status
     */
    Upload(enabledResolutions) {
        return __awaiter(this, void 0, void 0, function* () {
            const url_params = enabledResolutions ? `?enabledResolutions=${enabledResolutions}` : '';
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}${url_params}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "PUT",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.library.accessKey
                }
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                return {
                    status: StatusResponse_1.default.OK,
                    data: body
                };
            }
            if (status === 401) {
                return {
                    status: StatusResponse_1.default.UNAUTHORIZED,
                    data: null
                };
            }
            if (status === 404) {
                return {
                    status: StatusResponse_1.default.NOT_FOUND,
                    data: null
                };
            }
            if (status === 500) {
                return {
                    status: StatusResponse_1.default.INTERNAL_SERVER_ERROR,
                    data: null
                };
            }
            return {
                status: StatusResponse_1.default.UNDEFINED,
                data: null
            };
        });
    }
    /**
     * @description Get the video's heatmap
     */
    GetHeatmap() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/heatmap`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.library.accessKey
                }
            });
            const status = request.status;
            let body = yield request.json();
            if (status === 200) {
                // APIVideo to Video
                body = Object.assign(Object.assign({}, body), { dateUploaded: new Date(body.dateUploaded), transcodingMessages: body.transcodingMessages.map((message) => (Object.assign(Object.assign({}, message), { timeStamp: new Date(message.timeStamp) }))) });
                return {
                    status: StatusResponse_1.default.OK,
                    data: body
                };
            }
            if (status === 401) {
                return {
                    status: StatusResponse_1.default.UNAUTHORIZED,
                    data: null
                };
            }
            if (status === 404) {
                return {
                    status: StatusResponse_1.default.NOT_FOUND,
                    data: null
                };
            }
            if (status === 500) {
                return {
                    status: StatusResponse_1.default.INTERNAL_SERVER_ERROR,
                    data: null
                };
            }
            return {
                status: StatusResponse_1.default.UNDEFINED,
                data: null
            };
        });
    }
    /**
     * @description Re-encode the video
     */
    Reencode() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/reencode`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.library.accessKey
                }
            });
            const status = request.status;
            let body = yield request.json();
            if (status === 200) {
                // APIVideo to Video
                body = Object.assign(Object.assign({}, body), { dateUploaded: new Date(body.dateUploaded), transcodingMessages: body.transcodingMessages.map((message) => (Object.assign(Object.assign({}, message), { timeStamp: new Date(message.timeStamp) }))) });
                this.data = Object.assign(Object.assign({}, this.data), body);
                return {
                    status: StatusResponse_1.default.OK,
                    data: body
                };
            }
            if (status === 401) {
                return {
                    status: StatusResponse_1.default.UNAUTHORIZED,
                    data: null
                };
            }
            if (status === 404) {
                return {
                    status: StatusResponse_1.default.NOT_FOUND,
                    data: null
                };
            }
            if (status === 500) {
                return {
                    status: StatusResponse_1.default.INTERNAL_SERVER_ERROR,
                    data: null
                };
            }
            return {
                status: StatusResponse_1.default.UNDEFINED,
                data: null
            };
        });
    }
    /**
     * @description Set the video's thumbnail
     */
    SetThumbnail(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/thumbnail`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.library.accessKey
                },
                body: JSON.stringify(payload)
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                this.data = Object.assign(Object.assign({}, this.data), payload);
                return {
                    status: StatusResponse_1.default.OK,
                    data: body
                };
            }
            if (status === 401) {
                return {
                    status: StatusResponse_1.default.UNAUTHORIZED,
                    data: null
                };
            }
            if (status === 404) {
                return {
                    status: StatusResponse_1.default.NOT_FOUND,
                    data: null
                };
            }
            if (status === 500) {
                return {
                    status: StatusResponse_1.default.INTERNAL_SERVER_ERROR,
                    data: null
                };
            }
            return {
                status: StatusResponse_1.default.UNDEFINED,
                data: null
            };
        });
    }
    /**
     * @description add a caption to the video
     */
    AddCaption(srclang, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/captions/${srclang}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/*+json',
                    AccessKey: this.library.accessKey
                },
                body: JSON.stringify(params)
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                return {
                    status: StatusResponse_1.default.OK,
                    data: body
                };
            }
            if (status === 400) {
                return {
                    status: StatusResponse_1.default.BAD_REQUEST,
                    data: null
                };
            }
            if (status === 401) {
                return {
                    status: StatusResponse_1.default.UNAUTHORIZED,
                    data: null
                };
            }
            if (status === 404) {
                return {
                    status: StatusResponse_1.default.NOT_FOUND,
                    data: null
                };
            }
            if (status === 500) {
                return {
                    status: StatusResponse_1.default.INTERNAL_SERVER_ERROR,
                    data: null
                };
            }
            return {
                status: StatusResponse_1.default.UNDEFINED,
                data: null
            };
        });
    }
    /**
     * @description delete a caption from the video
     */
    DeleteCaption(srclang) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/captions/${srclang}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "DELETE",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.library.accessKey
                }
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                return {
                    status: StatusResponse_1.default.OK,
                    data: body
                };
            }
            if (status === 400) {
                return {
                    status: StatusResponse_1.default.BAD_REQUEST,
                    data: null
                };
            }
            if (status === 401) {
                return {
                    status: StatusResponse_1.default.UNAUTHORIZED,
                    data: null
                };
            }
            if (status === 404) {
                return {
                    status: StatusResponse_1.default.NOT_FOUND,
                    data: null
                };
            }
            if (status === 500) {
                return {
                    status: StatusResponse_1.default.INTERNAL_SERVER_ERROR,
                    data: null
                };
            }
            return {
                status: StatusResponse_1.default.UNDEFINED,
                data: null
            };
        });
    }
}
exports.default = Video;
