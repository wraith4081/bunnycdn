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
    constructor(data: APICollection, collectionId: string, library: Library);
    /**
     * @description Updates the name of the collection
     * @param name Name of the collection
     */
    Update(name?: string): Promise<{
        status: StatusResponse.OK;
        data: {
            success: boolean;
            message?: string;
            statusCode: number;
        };
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
    /**
     * @description Deletes the collection
     */
    Delete(): Promise<{
        status: StatusResponse.OK;
        data: {
            success: boolean;
            message?: string;
            statusCode: number;
        };
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
}
