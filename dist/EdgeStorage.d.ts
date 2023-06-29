/// <reference types="node" />
import StorageEndpoints from "./utils/StorageEndpoints";
import { StorageEntity } from "./utils/StorageEntity";
import StatusResponse from "./types/StatusResponse";
export default class EdgeStorage {
    accessKey: string;
    private storageZone;
    constructor(AccessKey: string, StorageZone?: StorageEndpoints);
    get Endpoint(): StorageEndpoints;
    set Endpoint(StorageZone: StorageEndpoints);
    get AccessKey(): string;
    set AccessKey(AccessKey: string);
    CreateClient(StorageZoneName: string): EdgeStorageClient;
}
export declare class EdgeStorageClient {
    private EdgeStorage;
    StorageZoneName: string;
    constructor(EdgeStorage: EdgeStorage, StorageZoneName: string);
    /**
     * @description List files and folders in a storage zone
     * @param path path to the file or folder
     */
    ListFiles(path: string): Promise<StorageEntity[]>;
    /**
     * @description Download a file or folder from a directory
     * @param path path to the file or folder to download
     */
    DownloadFile(path: string): Promise<any>;
    /**
     * @description Upload a file or folder to a directory
     * @param path path to the file or folder to upload
     * @param fileContent file content to upload
     */
    UploadFile(path: string, fileContent: Buffer): Promise<StatusResponse.CREATED | StatusResponse.BAD_REQUEST | StatusResponse.UNDEFINED>;
    /**
     * @description Delete a file or folder from a directory
     * @param path path to the file or folder to delete
     */
    DeleteFile(path: string): Promise<StatusResponse.OK | StatusResponse.BAD_REQUEST | StatusResponse.UNDEFINED>;
}
