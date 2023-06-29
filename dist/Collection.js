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
class Collection {
    constructor(data, collectionId, library) {
        this.data = data;
        this.collectionId = collectionId;
        this.library = library;
    }
    /**
     * @description Updates the name of the collection
     * @param name Name of the collection
     */
    Update(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/collections/${this.collectionId}`;
            const response = yield (0, node_fetch_1.default)(url, {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/*+json',
                    'AccessKey': this.library.accessKey
                },
                body: name ? JSON.stringify({ name }) : undefined
            });
            const status = response.status;
            const body = yield response.json();
            if (status === 200) {
                this.data.name = name;
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
     * @description Deletes the collection
     */
    Delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/collections/${this.collectionId}`;
            const response = yield (0, node_fetch_1.default)(url, {
                method: "DELETE",
                headers: {
                    accept: 'application/json',
                    AccessKey: this.library.accessKey
                }
            });
            const status = response.status;
            const body = yield response.json();
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
}
exports.default = Collection;
