import Collection from "./Collection";
import StatusResponse from "./types/StatusResponse";
import { VideoList, VideoStatics } from "./types/Video";
import Video from "./Video";
export default class Stream {
    constructor();
    GetLibrary(libraryId: number, accessKey: string): Library;
}
export declare class Library {
    libraryId: number;
    accessKey: string;
    constructor(libraryId: number, accessKey: string);
    /**
     * @description Get a video from the library
     */
    GetVideo(videoId: number): Promise<({
        status: StatusResponse.OK;
        data: Video;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    })>;
    /**
     * @description Get global video statistics
     */
    GetVideoStatistics(params: {
        dateFrom?: string;
        dateTo?: string;
        hourly?: boolean;
        videoGuid?: string;
    }): Promise<({
        status: StatusResponse.OK;
        data: VideoStatics;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    })>;
    /**
     * @description get list of videos in the library
     */
    ListVideos(params: {
        page?: number;
        itemsPerPage?: number;
        search?: string;
        collection?: string;
        orderBy?: 'date';
    }): Promise<{
        status: StatusResponse.OK;
        data: VideoList;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
    /**
     * @description create a new video in the library
     */
    CreateVideo(params: {
        title: string;
        collectionId?: string;
        thumbnailTime?: number;
    }): Promise<{
        status: StatusResponse.OK;
        data: Video;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
    /**
     * @description fetch a video from a url
     * @param bodyParams params for the request body
     * @param queryParams params for the query string
     */
    FetchVideo(bodyParams: {
        url: string;
        headers: {
            [key: string]: string;
        };
    }, queryParams: {
        collectionId?: string;
        lowPriority?: boolean;
        thumbnailTime?: number;
    }): Promise<{
        status: StatusResponse.OK;
        data: {
            success: boolean;
            message?: string;
            statusCode: number;
        };
    } | {
        status: StatusResponse.BAD_REQUEST | StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
    /**
     * @description Fetch specific collection with ID
     * @param collectionId ID of the collection to fetch
     */
    GetCollection(collectionId: string): Promise<{
        status: StatusResponse.OK;
        data: Collection;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
    /**
     * @description Fetch all collections in the library
     * @param queryParams Query params for the request
     */
    GetCollectionList(queryParams: {
        page?: number;
        itemsPerPage?: number;
        search?: string;
        orderBy?: "date";
    }): Promise<{
        status: StatusResponse.OK;
        data: {
            totalItems: number;
            currentPage: number;
            itemsPerPage: number;
            items?: Collection[];
        };
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
    /**
     * @description Create a new collection
     * @param name Name of the collection to create
     * @returns
     */
    CreateCollection(name?: string): Promise<{
        status: StatusResponse.OK;
        data: Collection;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
}
