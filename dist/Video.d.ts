import { Library } from "./Stream";
import StatusResponse from "./types/StatusResponse";
import VideoType, { VideoMetaTag, VideoMoment, VideoChapter, APIVideo } from "./types/Video";
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
    constructor(library: Library, data: APIVideo, videoId: number);
    /**
     * @description Update a video's metadata
     */
    Update(props: UpdateParams): Promise<{
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
     * @description Delete this video
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
    /**
     * @description Get the video's transcoding status
     */
    Upload(enabledResolutions?: string): Promise<{
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
     * @description Get the video's heatmap
     */
    GetHeatmap(): Promise<{
        status: StatusResponse.OK;
        data: VideoType;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
    /**
     * @description Re-encode the video
     */
    Reencode(): Promise<{
        status: StatusResponse.OK;
        data: VideoType;
    } | {
        status: StatusResponse.UNAUTHORIZED | StatusResponse.NOT_FOUND | StatusResponse.INTERNAL_SERVER_ERROR | StatusResponse.UNDEFINED;
        data: null;
    }>;
    /**
     * @description Set the video's thumbnail
     */
    SetThumbnail(payload: {
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
    }>;
    /**
     * @description add a caption to the video
     */
    AddCaption(srclang: string, params: {
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
    }>;
    /**
     * @description delete a caption from the video
     */
    DeleteCaption(srclang: string): Promise<{
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
}
