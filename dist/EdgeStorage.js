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
exports.EdgeStorageClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const StorageEndpoints_1 = __importDefault(require("./utils/StorageEndpoints"));
const StatusResponse_1 = __importDefault(require("./types/StatusResponse"));
class EdgeStorage {
    constructor(AccessKey, StorageZone = StorageEndpoints_1.default.Falkenstein) {
        this.accessKey = AccessKey;
        this.storageZone = StorageZone;
    }
    // Endpoint actions
    get Endpoint() {
        return this.storageZone;
    }
    set Endpoint(StorageZone) {
        this.storageZone = StorageZone;
    }
    // Access key actions
    get AccessKey() {
        return this.accessKey;
    }
    set AccessKey(AccessKey) {
        this.accessKey = AccessKey;
    }
    // Client actions
    CreateClient(StorageZoneName) {
        return new EdgeStorageClient(this, StorageZoneName);
    }
}
exports.default = EdgeStorage;
class EdgeStorageClient {
    constructor(EdgeStorage, StorageZoneName) {
        this.EdgeStorage = EdgeStorage;
        this.StorageZoneName = StorageZoneName;
    }
    /**
     * @description List files and folders in a storage zone
     * @param path path to the file or folder
     */
    ListFiles(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://${this.EdgeStorage.Endpoint}/${this.StorageZoneName}/${path}/`;
            const request = (0, node_fetch_1.default)(url, {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.EdgeStorage.AccessKey
                }
            }).then(res => res.json());
            return request.then(res => res.map(file => {
                return Object.assign(Object.assign({}, file), { LastChanged: new Date(file.LastChanged), DateCreated: new Date(file.DateCreated) });
            }));
        });
    }
    /**
     * @description Download a file or folder from a directory
     * @param path path to the file or folder to download
     */
    DownloadFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://${this.EdgeStorage.Endpoint}/${this.StorageZoneName}/${path}`;
            const request = (0, node_fetch_1.default)(url, {
                method: "GET",
                headers: {
                    accept: '*/*',
                    AccessKey: this.EdgeStorage.AccessKey
                }
            });
            // Check page status
            const status = yield request.then(res => res.status);
            const body = yield request.then(res => res.json());
            if (status === 404) {
                return body;
            }
            return body;
        });
    }
    /**
     * @description Upload a file or folder to a directory
     * @param path path to the file or folder to upload
     * @param fileContent file content to upload
     */
    UploadFile(path, fileContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://${this.EdgeStorage.Endpoint}/${this.StorageZoneName}/${path}`;
            const request = (0, node_fetch_1.default)(url, {
                method: "PUT",
                headers: {
                    'content-type': 'application/octet-stream',
                    AccessKey: this.EdgeStorage.AccessKey
                },
                body: fileContent
            });
            const status = yield request.then(res => res.status);
            if (status === 201) {
                return StatusResponse_1.default.CREATED;
            }
            if (status === 400) {
                return StatusResponse_1.default.BAD_REQUEST;
            }
            return StatusResponse_1.default.UNDEFINED;
        });
    }
    /**
     * @description Delete a file or folder from a directory
     * @param path path to the file or folder to delete
     */
    DeleteFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://${this.EdgeStorage.Endpoint}/${this.StorageZoneName}/${path}`;
            const request = (0, node_fetch_1.default)(url, {
                method: "DELETE",
                headers: {
                    AccessKey: this.EdgeStorage.AccessKey
                }
            });
            const status = yield request.then(res => res.status);
            if (status === 200) {
                return StatusResponse_1.default.OK;
            }
            if (status === 400) {
                return StatusResponse_1.default.BAD_REQUEST;
            }
            return StatusResponse_1.default.UNDEFINED;
        });
    }
}
exports.EdgeStorageClient = EdgeStorageClient;
