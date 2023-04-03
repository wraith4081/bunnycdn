import { Library } from "./Stream";
import StatusResponse from "./types/StatusResponse";

export interface APICollection {
    videoLibraryId: number;

    guid?: string;

    name?: string;

    videoCount: number;

    totalSize: number;
    previewVideoIds?: string;
}

export default class Collection {
    data: APICollection;
    collectionId: string;
    library: Library;

    constructor(data: APICollection, collectionId: string, library: Library) {
        this.data = data;
        this.collectionId = collectionId;
        this.library = library;
    }

    /**
     * @description Updates the name of the collection
     * @param name Name of the collection
     */
    async Update(name?: string): Promise<
    {
        status: StatusResponse.OK;
        data: {
            success: boolean;
            message?: string;
            statusCode: number;
        }
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }> {
        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/collections/${this.collectionId}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/*+json',
                'AccessKey': this.library.accessKey
            },
            body: name ? JSON.stringify({ name }) : undefined
        });

        const status = response.status;
        const body = await response.json();

        if (status === 200) {
            this.data.name = name;

            return {
                status: StatusResponse.OK,
                data: body as {
                    success: boolean;
                    message?: string;
                    statusCode: number;
                }
            }
        }

        if (status === 401) {
            return {
                status: StatusResponse.UNAUTHORIZED,
                data: null
            }
        }

        if (status === 404) {
            return {
                status: StatusResponse.NOT_FOUND,
                data: null
            }
        }

        if (status === 500) {
            return {
                status: StatusResponse.INTERNAL_SERVER_ERROR,
                data: null
            }
        }

        return {
            status: StatusResponse.UNDEFINED,
            data: null
        }

    }
    
    /**
     * @description Deletes the collection
     */
    async Delete(): Promise<
     {
        status: StatusResponse.OK;
        data: {
            success: boolean;
            message?: string;
            statusCode: number;
        }
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }> {
        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/collections/${this.collectionId}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                accept: 'application/json',
                AccessKey: this.library.accessKey
            }
        });

        const status = response.status;
        const body = await response.json();

        if (status === 200) {
            return {
                status: StatusResponse.OK,
                data: body as {
                    success: boolean;
                    message?: string;
                    statusCode: number;
                }
            }
        }

        if (status === 401) {
            return {
                status: StatusResponse.UNAUTHORIZED,
                data: null
            }
        }

        if (status === 404) {
            return {
                status: StatusResponse.NOT_FOUND,
                data: null
            }
        }

        if (status === 500) {
            return {
                status: StatusResponse.INTERNAL_SERVER_ERROR,
                data: null
            }
        }

        return {
            status: StatusResponse.UNDEFINED,
            data: null
        }

    }
}