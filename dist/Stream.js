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
exports.Library = void 0;
const Collection_1 = __importDefault(require("./Collection"));
const StatusResponse_1 = __importDefault(require("./types/StatusResponse"));
const Video_1 = __importDefault(require("./Video"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class Stream {
    constructor() { }
    // Library actions
    GetLibrary(libraryId, accessKey) {
        return new Library(libraryId, accessKey);
    }
}
exports.default = Stream;
class Library {
    constructor(libraryId, accessKey) {
        this.libraryId = libraryId;
        this.accessKey = accessKey;
    }
    /**
     * @description Get a video from the library
     */
    GetVideo(videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos/${videoId}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.accessKey
                }
            });
            const status = request.status;
            let body = yield request.json();
            if (status === 200) {
                body = Object.assign(Object.assign({}, body), { dateUploaded: new Date(body.dateUploaded), transcodingMessages: body.transcodingMessages.map((message) => {
                        return Object.assign(Object.assign({}, message), { date: new Date(message.timeStamp) });
                    }) });
                return {
                    status: StatusResponse_1.default.OK,
                    data: new Video_1.default(this, body, videoId)
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
     * @description Get global video statistics
     */
    GetVideoStatistics(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const validParams = ["dateFrom", "dateTo", "hourly", "videoGuid"].reduce((acc, param) => {
                if (params[param]) {
                    acc[param] = params[param];
                }
                return acc;
            }, {});
            const url_params = new URLSearchParams(validParams);
            const url = `https://video.bunnycdn.com/library/${this.libraryId}/statistics?${url_params.toString()}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.accessKey
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
     * @description get list of videos in the library
     */
    ListVideos(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const validParams = ["page", "itemsPerPage", "search", "collection", "orderBy"].reduce((acc, param) => {
                if (params[param]) {
                    acc[param] = params[param];
                }
                return acc;
            }, { page: 1, itemsPerPage: 100, orderBy: 'date' });
            const url_params = new URLSearchParams(validParams);
            const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos?${url_params.toString()}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.accessKey
                }
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                body.items = body.items.map((item) => {
                    return Object.assign(Object.assign({}, item), { dateUploaded: new Date(item.dateUploaded), transcodingMessages: item.transcodingMessages.map(message => {
                            return Object.assign(Object.assign({}, message), { date: new Date(message.timeStamp) });
                        }) });
                });
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
     * @description create a new video in the library
     */
    CreateVideo(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/*+json',
                    AccessKey: this.accessKey
                },
                body: JSON.stringify(params)
            });
            const status = request.status;
            let body = yield request.json();
            if (status === 200) {
                body = Object.assign(Object.assign({}, body), { dateUploaded: new Date(body.dateUploaded), transcodingMessages: body.transcodingMessages.map((message) => {
                        return Object.assign(Object.assign({}, message), { date: new Date(message.timeStamp) });
                    }) });
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
     * @description fetch a video from a url
     * @param bodyParams params for the request body
     * @param queryParams params for the query string
     */
    FetchVideo(bodyParams, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const url_params = new URLSearchParams(["collectionId", "lowPriority", "thumbnailTime"].reduce((acc, param) => {
                if (queryParams[param]) {
                    acc[param] = queryParams[param];
                }
                return acc;
            }, {}));
            const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos?${url_params.toString()}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/*+json',
                    AccessKey: this.accessKey
                },
                body: JSON.stringify(bodyParams)
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
    // Manage Collections
    /**
     * @description Fetch specific collection with ID
     * @param collectionId ID of the collection to fetch
     */
    GetCollection(collectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.libraryId}/collections/${collectionId}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.accessKey
                }
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                return {
                    status: StatusResponse_1.default.OK,
                    data: new Collection_1.default(body, collectionId, this)
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
     * @description Fetch all collections in the library
     * @param queryParams Query params for the request
     */
    GetCollectionList(queryParams) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const url_params = new URLSearchParams(["page", "itemsPerPage", "search", "orderBy"].reduce((acc, param) => {
                if (queryParams[param]) {
                    acc[param] = queryParams[param];
                }
                return acc;
            }, { page: 1, itemsPerPage: 100, orderBy: "date" }));
            const url = `https://video.bunnycdn.com/library/${this.libraryId}/collections?${url_params.toString()}`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.accessKey
                }
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                body.items = (_a = body.items) === null || _a === void 0 ? void 0 : _a.map((item) => new Collection_1.default(item, item.guid, this));
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
     * @description Create a new collection
     * @param name Name of the collection to create
     * @returns
     */
    CreateCollection(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.libraryId}/collections`;
            const request = yield (0, node_fetch_1.default)(url, {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/*+json',
                    AccessKey: this.accessKey
                },
                body: name ? JSON.stringify({ name }) : undefined
            });
            const status = request.status;
            const body = yield request.json();
            if (status === 200) {
                return {
                    status: StatusResponse_1.default.OK,
                    data: new Collection_1.default(body, body.guid, this)
                };
            }
            if (status === 401) {
                return {
                    status: StatusResponse_1.default.UNAUTHORIZED,
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
exports.Library = Library;
