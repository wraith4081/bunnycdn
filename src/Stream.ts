import Collection, { APICollection } from "./Collection";
import StatusResponse from "./types/StatusResponse";
import { APIVideo, VideoList, VideoStatics } from "./types/Video";
import Video from "./Video";

export default class Stream {

    constructor() { }

    // Library actions
    public GetLibrary(libraryId: number, accessKey: string) {
        return new Library(libraryId, accessKey);
    }

}

export class Library {
    public libraryId: number;
    public accessKey: string;

    constructor(libraryId: number, accessKey: string) {
        this.libraryId = libraryId;
        this.accessKey = accessKey;
    }

    /**
     * @description Get a video from the library
     */
    async GetVideo(videoId: number): Promise<(
        { status: StatusResponse.OK, data: Video } |
        { status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED, data: null }
    )> {
        const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos/${videoId}`;
        const request = await fetch(url, {
            method: "GET",
            headers: {
                accept: 'application/json',
                AccessKey: this.accessKey
            }
        });

        const status = request.status;
        let body = await request.json();

        if (status === 200) {

            body = {
                ...body,
                dateUploaded: new Date(body.dateUploaded),
                transcodingMessages: body.transcodingMessages.map((message: any) => {
                    return {
                        ...message,
                        date: new Date(message.timeStamp)
                    }
                })
            }

            return {
                status: StatusResponse.OK,
                data: new Video(this, body as APIVideo, videoId)
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
     * @description Get global video statistics
     */
    async GetVideoStatistics(params: {
        dateFrom?: string;
        dateTo?: string;
        hourly?: boolean;
        videoGuid?: string;
    }): Promise<(
        { status: StatusResponse.OK, data: VideoStatics } |
        { status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED, data: null }
    )> {
        const validParams = ["dateFrom", "dateTo", "hourly", "videoGuid"].reduce((acc, param) => {
            if ((params as any)[param]) {
                acc[param] = (params as any)[param];
            }
            return acc;
        }, {} as { [key: string]: string });

        const url_params = new URLSearchParams(validParams);

        const url = `https://video.bunnycdn.com/library/${this.libraryId}/statistics?${url_params.toString()}`

        const request = await fetch(url, {
            method: "GET",
            headers: {
                accept: 'application/json',
                AccessKey: this.accessKey
            }
        });

        const status = request.status;
        const body = await request.json();

        if (status === 200) {
            return {
                status: StatusResponse.OK,
                data: body as VideoStatics
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
     * @description get list of videos in the library
     */
    async ListVideos(params: {
        page?: number;
        itemsPerPage?: number;
        search?: string;
        collection?: string;
        orderBy?: 'date';
    }): Promise<
        {
            status: StatusResponse.OK,
            data: VideoList
        } | {
            status: StatusResponse.UNAUTHORIZED | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED,
            data: null
        }> {
        const validParams = ["page", "itemsPerPage", "search", "collection", "orderBy"].reduce((acc, param) => {
            if ((params as any)[param]) {
                acc[param] = (params as any)[param];
            }
            return acc;
        }, { page: 1, itemsPerPage: 100, orderBy: 'date' } as unknown as { [key: string]: string });

        const url_params = new URLSearchParams(validParams);

        const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos?${url_params.toString()}`
        const request = await fetch(url, {
            method: "GET",
            headers: {
                accept: 'application/json',
                AccessKey: this.accessKey
            }
        });

        const status = request.status;
        const body = await request.json();

        if (status === 200) {
            body.items = body.items.map((item: APIVideo) => {
                return {
                    ...item,
                    dateUploaded: new Date(item.dateUploaded),
                    transcodingMessages: item.transcodingMessages.map(message => {
                        return {
                            ...message,
                            date: new Date(message.timeStamp)
                        }
                    })
                }
            })

            return {
                status: StatusResponse.OK,
                data: body as VideoList
            }
        }

        if (status === 401) {
            return {
                status: StatusResponse.UNAUTHORIZED,
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
     * @description create a new video in the library
     */
    async CreateVideo(params: {
        title: string;
        collectionId?: string;
        thumbnailTime?: number;
    }): Promise<
        {
            status: StatusResponse.OK,
            data: Video
        } | {
            status: StatusResponse.UNAUTHORIZED | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED,
            data: null
        }
    > {
        const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos`;

        const request = await fetch(url, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/*+json',
                AccessKey: this.accessKey
            },
            body: JSON.stringify(params)
        });

        const status = request.status;
        let body = await request.json();

        if (status === 200) {
            body = {
                ...(body as APIVideo),
                dateUploaded: new Date(body.dateUploaded),
                transcodingMessages: body.transcodingMessages.map((message: any) => {
                    return {
                        ...message,
                        date: new Date(message.timeStamp)
                    }
                })
            }

            return {
                status: StatusResponse.OK,
                data: body as Video
            }
        }

        if (status === 401) {
            return {
                status: StatusResponse.UNAUTHORIZED,
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
     * @description fetch a video from a url
     * @param bodyParams params for the request body
     * @param queryParams params for the query string
     */
    async FetchVideo(bodyParams: {
        url: string;
        headers: { [key: string]: string };
    }, queryParams: {
        collectionId?: string;
        lowPriority?: boolean;
        thumbnailTime?: number;
    }): Promise<
        {
            status: StatusResponse.OK,
            data: {
                success: boolean;
                message?: string;
                statusCode: number;
            }
        } | {
            status: StatusResponse.BAD_REQUEST | StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED,
            data: null
        }
    > {

        const url_params = new URLSearchParams(["collectionId", "lowPriority", "thumbnailTime"].reduce((acc, param) => {
            if ((queryParams as any)[param]) {
                acc[param] = (queryParams as any)[param];
            }
            return acc;
        }, {} as { [key: string]: string }));

        const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos?${url_params.toString()}`

        const request = await fetch(url, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/*+json',
                AccessKey: this.accessKey
            },
            body: JSON.stringify(bodyParams)
        });

        const status = request.status;
        const body = await request.json();

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

        if (status === 400) {
            return {
                status: StatusResponse.BAD_REQUEST,
                data: null
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

    // Manage Collections

    /**
     * @description Fetch specific collection with ID
     * @param collectionId ID of the collection to fetch
     */
    async GetCollection(collectionId: string): Promise<
        {
            status: StatusResponse.OK,
            data: Collection
        } | {
            status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED,
            data: null
        }
    > {
        const url = `https://video.bunnycdn.com/library/${this.libraryId}/collections/${collectionId}`;

        const request = await fetch(url, {
            method: "GET",
            headers: {
                accept: 'application/json',
                AccessKey: this.accessKey
            }
        });

        const status = request.status;
        const body = await request.json();

        if (status === 200) {
            return {
                status: StatusResponse.OK,
                data: new Collection(body as APICollection, collectionId, this)
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
     * @description Fetch all collections in the library
     * @param queryParams Query params for the request
     */
    async GetCollectionList(queryParams: {
        page?: number;
        itemsPerPage?: number;
        search?: string;
        orderBy?: "date"
    }): Promise<{
            status: StatusResponse.OK,
            data: {
                totalItems: number;
                currentPage: number;
                itemsPerPage: number;
                items?: Collection[]
            }
        } | {
            status: StatusResponse.UNAUTHORIZED | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED,
            data: null
        }> {
        const url_params = new URLSearchParams(["page", "itemsPerPage", "search", "orderBy"].reduce((acc, param) => {
            if ((queryParams as any)[param]) {
                acc[param] = (queryParams as any)[param];
            }
            return acc;
        }, { page: 1, itemsPerPage: 100, orderBy: "date" } as unknown as { [key: string]: string }));

        const url = `https://video.bunnycdn.com/library/${this.libraryId}/collections?${url_params.toString()}`;

        const request = await fetch(url, {
            method: "GET",
            headers: {
                accept: 'application/json',
                AccessKey: this.accessKey
            }
        });

        const status = request.status;
        const body = await request.json();

        if (status === 200) {

            body.items = body.items?.map((item: APICollection) => new Collection(item, item.guid as string, this));

            return {
                status: StatusResponse.OK,
                data: body as {
                    totalItems: number;
                    currentPage: number;
                    itemsPerPage: number;
                    items?: Collection[]
                }
            }
        }

        if (status === 401) {
            return {
                status: StatusResponse.UNAUTHORIZED,
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
     * @description Create a new collection
     * @param name Name of the collection to create
     * @returns 
     */
    async CreateCollection(name?: string): Promise<{
        status: StatusResponse.OK,
        data: Collection
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED,
        data: null
    }> {
        const url = `https://video.bunnycdn.com/library/${this.libraryId}/collections`;

        const request = await fetch(url, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/*+json',
                AccessKey: this.accessKey
            },
            body: name ? JSON.stringify({ name }) : undefined
        });

        const status = request.status;
        const body = await request.json();

        if (status === 200) {
            return {
                status: StatusResponse.OK,
                data: new Collection(body as APICollection, body.guid, this)
            }
        }

        if (status === 401) {
            return {
                status: StatusResponse.UNAUTHORIZED,
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