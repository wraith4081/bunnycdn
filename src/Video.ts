import { Library } from "./Stream";
import StatusResponse from "./types/StatusResponse";
import VideoType, { VideoMetaTag, VideoTranscodingMessage, VideoMoment, VideoChapter, APIVideo } from "./types/Video";
import fetch from "node-fetch";

export interface UpdateParams {
    title?: string;
    collectionId?: string;
    chapters?: VideoChapter[];
    moments?: VideoMoment[];
    metaTags?: VideoMetaTag[];
}

export default class Video {
    library: Library;
    data: APIVideo;
    videoId: number;

    constructor(library: Library, data: APIVideo, videoId: number) {
        this.library = library;
        this.data = data;
        this.videoId = videoId;
    }

    /**
     * @description Update a video's metadata
     */
    async Update(props: UpdateParams): Promise<{
        status: StatusResponse.OK;
        data: { success: boolean; message?: string; statusCode: number; }
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }> {
        const validKeys = ["title", "collectionId", "chapters", "moments", "metaTags"];

        const payload = (
            Object.keys(props).filter(key => validKeys.includes(key))
        ).reduce((acc: any, key) => {
            acc[key] = (props as any)[key];
            return acc;
        }, {} as UpdateParams);

        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}`;

        const request = await fetch(url, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/*+json',
                AccessKey: this.library.accessKey
            },
            body: JSON.stringify(payload)
        });

        const status = request.status;
        const body = await request.json();

        if (status === 200) {
            this.data = {
                ...this.data,
                ...payload
            }

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
     * @description Delete this video
     */
    async Delete(): Promise<{
        status: StatusResponse.OK;
        data: { success: boolean; message?: string; statusCode: number; }
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }> {
        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}`;

        const request = await fetch(url, {
            method: "DELETE",
            headers: {
                accept: 'application/json',
                AccessKey: this.library.accessKey
            }
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
     * @description Get the video's transcoding status
     */
    async Upload(enabledResolutions?: string): Promise<{
        status: StatusResponse.OK;
        data: {
            success: boolean;
            message?: string;
            statusCode: number;
        };
    } | {
        status: StatusResponse.BAD_REQUEST | StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }> {
        const url_params = enabledResolutions ? `?enabledResolutions=${enabledResolutions}` : '';

        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}${url_params}`;

        const request = await fetch(url, {
            method: "PUT",
            headers: {
                accept: 'application/json',
                AccessKey: this.library.accessKey
            }
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
     * @description Get the video's heatmap
     */
    async GetHeatmap(): Promise<{
        status: StatusResponse.OK;
        data: VideoType;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }> {
        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/heatmap`;

        const request = await fetch(url, {
            method: "GET",
            headers: {
                accept: 'application/json',
                AccessKey: this.library.accessKey
            }
        });

        const status = request.status;
        let body = await request.json();

        if (status === 200) {
            // APIVideo to Video
            body = {
                ...(body as APIVideo),
                dateUploaded: new Date(body.dateUploaded),
                transcodingMessages: body.transcodingMessages.map((message: VideoTranscodingMessage) => ({
                    ...message,
                    timeStamp: new Date(message.timeStamp)
                }))
            }

            return {
                status: StatusResponse.OK,
                data: body as VideoType
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
     * @description Re-encode the video
     */
    async Reencode(): Promise<{
        status: StatusResponse.OK;
        data: VideoType;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }> {
        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/reencode`;

        const request = await fetch(url, {
            method: "POST",
            headers: {
                accept: 'application/json',
                AccessKey: this.library.accessKey
            }
        });

        const status = request.status;
        let body = await request.json();

        if (status === 200) {
            // APIVideo to Video
            body = {
                ...(body as APIVideo),
                dateUploaded: new Date(body.dateUploaded),
                transcodingMessages: body.transcodingMessages.map((message: VideoTranscodingMessage) => ({
                    ...message,
                    timeStamp: new Date(message.timeStamp)
                }))
            } as VideoType

            this.data = {
                ...this.data,
                ...body
            }

            return {
                status: StatusResponse.OK,
                data: body as VideoType
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
     * @description Set the video's thumbnail
     */
    async SetThumbnail(payload: {
        thumbnailUrl?: string;
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
    }> {
        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/thumbnail`;

        const request = await fetch(url, {
            method: "POST",
            headers: {
                accept: 'application/json',
                AccessKey: this.library.accessKey
            },
            body: JSON.stringify(payload)
        });

        const status = request.status;
        const body = await request.json();

        if (status === 200) {
            this.data = {
                ...this.data,
                ...payload
            }

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
     * @description add a caption to the video
     */
    async AddCaption(srclang: string, params: {
        srclang?: string;
        label?: string;
        captionsFile?: string;
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
    }> {
        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/captions/${srclang}`;

        const request = await fetch(url, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/*+json',
                AccessKey: this.library.accessKey
            },
            body: JSON.stringify(params)
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

    /**
     * @description delete a caption from the video
     */
    async DeleteCaption(srclang: string): Promise<{
        status: StatusResponse.OK;
        data: {
            success: boolean;
            message?: string;
            statusCode: number;
        };
    } | {
        status: StatusResponse.BAD_REQUEST | StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }> {
        const url = `https://video.bunnycdn.com/library/${this.library.libraryId}/videos/${this.videoId}/captions/${srclang}`;

        const request = await fetch(url, {
            method: "DELETE",
            headers: {
                accept: 'application/json',
                AccessKey: this.library.accessKey
            }
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
}