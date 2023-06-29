"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeStorage = exports.StorageEndpoints = exports.Collection = exports.Video = exports.Stream = void 0;
const EdgeStorage_1 = __importDefault(require("./EdgeStorage"));
exports.EdgeStorage = EdgeStorage_1.default;
const Stream_1 = __importDefault(require("./Stream"));
exports.Stream = Stream_1.default;
const Video_1 = __importDefault(require("./Video"));
exports.Video = Video_1.default;
const Collection_1 = __importDefault(require("./Collection"));
exports.Collection = Collection_1.default;
const StorageEndpoints_1 = __importDefault(require("./utils/StorageEndpoints"));
exports.StorageEndpoints = StorageEndpoints_1.default;
class BunnyCDN extends EdgeStorage_1.default {
    constructor({ AccessKey, StorageZone }) {
        super(AccessKey, StorageZone);
        this.Stream = new Stream_1.default();
    }
    GetLibrary(libraryId, accessKey) {
        return this.Stream.GetLibrary(libraryId, accessKey);
    }
}
exports.default = BunnyCDN;
