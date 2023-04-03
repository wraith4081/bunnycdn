import fetch from "node-fetch";

import StorageEndpoints from "./utils/StorageEndpoints";
import { APIStorageEntity, StorageEntity } from "./utils/StorageEntity";

import ErrorResponse from "./types/ErrorResponse";
import StatusResponse from "./types/StatusResponse";

export default class EdgeStorage {
    public accessKey: string;
    private storageZone: StorageEndpoints;

    constructor (AccessKey: string, StorageZone: StorageEndpoints = StorageEndpoints.Falkenstein) {
        this.accessKey = AccessKey;
        this.storageZone = StorageZone;
    }

    // Endpoint actions
    public get Endpoint(): StorageEndpoints {
        return this.storageZone;
    }

    public set Endpoint(StorageZone: StorageEndpoints) {
        this.storageZone = StorageZone;
    }
    
    // Access key actions
    public get AccessKey(): string {
        return this.accessKey;
    }

    public set AccessKey(AccessKey: string) {
        this.accessKey = AccessKey;
    }

    // Client actions
    public CreateClient(StorageZoneName: string): EdgeStorageClient {
        return new EdgeStorageClient(this, StorageZoneName);
    }

}


export class EdgeStorageClient {
    private EdgeStorage: EdgeStorage;
    public StorageZoneName: string;

    constructor (EdgeStorage: EdgeStorage, StorageZoneName: string) {
        this.EdgeStorage = EdgeStorage;
        this.StorageZoneName = StorageZoneName;
    }

    /**
     * @description List files and folders in a storage zone
     * @param path path to the file or folder
     */
    async ListFiles(path: string): Promise<StorageEntity[]> {
        const url = `https://${this.EdgeStorage.Endpoint}/${this.StorageZoneName}/${path}/`;
        const request = fetch(url, {
            method: "GET",
            headers: {
                accept: 'application/json', 
                AccessKey: this.EdgeStorage.AccessKey
            }
        }).then(res => res.json()) as Promise<APIStorageEntity[]>;

        return request.then(res => res.map(file => {
            return {
                ...file,
                LastChanged: new Date(file.LastChanged),
                DateCreated: new Date(file.DateCreated)
            }
        }));
    }

    /**
     * @description Download a file or folder from a directory
     * @param path path to the file or folder to download
     */
    async DownloadFile(path: string): Promise<any> {
        const url = `https://${this.EdgeStorage.Endpoint}/${this.StorageZoneName}/${path}`;
        const request = fetch(url, {
            method: "GET",
            headers: {
                accept: '*/*', 
                AccessKey: this.EdgeStorage.AccessKey
            }
        });

        // Check page status
        const status = await request.then(res => res.status);
        const body = await request.then(res => res.json());

        if (status === 404) {
            return body as ErrorResponse[];
        }

        return body;
    }

    /**
     * @description Upload a file or folder to a directory
     * @param path path to the file or folder to upload
     * @param fileContent file content to upload
     */
    async UploadFile(path: string, fileContent: Buffer): Promise<StatusResponse.CREATED | StatusResponse.BAD_REQUEST | StatusResponse.UNDEFINED> {
        const url = `https://${this.EdgeStorage.Endpoint}/${this.StorageZoneName}/${path}`;
        const request = fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/octet-stream',
                AccessKey: this.EdgeStorage.AccessKey
            },
            body: fileContent
        });

        const status = await request.then(res => res.status);

        if (status === 201) {
            return StatusResponse.CREATED;
        }

        if (status === 400) {
            return StatusResponse.BAD_REQUEST;
        }

        return StatusResponse.UNDEFINED;
    }

    /**
     * @description Delete a file or folder from a directory
     * @param path path to the file or folder to delete
     */
    async DeleteFile(path: string): Promise<StatusResponse.OK | StatusResponse.BAD_REQUEST | StatusResponse.UNDEFINED> {
        const url = `https://${this.EdgeStorage.Endpoint}/${this.StorageZoneName}/${path}`;
        const request = fetch(url, {
            method: "DELETE",
            headers: {
                AccessKey: this.EdgeStorage.AccessKey
            }
        });

        const status = await request.then(res => res.status);

        if (status === 200) {
            return StatusResponse.OK;
        }

        if (status === 400) {
            return StatusResponse.BAD_REQUEST;
        }

        return StatusResponse.UNDEFINED;
    }
}