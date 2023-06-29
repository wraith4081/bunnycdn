export interface VideoCaption {
    "srclang": string;
    "label": string;
}
export interface VideoChapter {
    "title": string;
    "start": number;
    "end": number;
}
export interface VideoMoment {
    "label": string;
    "timestamp": number;
}
export interface VideoMetaTag {
    "property": string;
    "value": string;
}
export declare enum VideoTranscodingMessageLevel {
    Zero = 0,
    One = 1,
    Two = 2
}
export interface VideoTranscodingMessage {
    "timeStamp": Date;
    "level": VideoTranscodingMessageLevel;
    "issueCode": number;
    "message": string;
    "value": string;
}
export declare enum VideoStatus {
    Created = 0,
    Uploaded = 1,
    Processing = 2,
    Transcoding = 3,
    Finished = 4,
    Error = 5,
    UploadFailed = 6
}
export default interface Video {
    "videoLibraryId": number;
    "guid": string;
    "title": string;
    "dateUploaded": Date;
    "views": number;
    "isPublic": boolean;
    "length": number;
    "status": VideoStatus;
    "framerate": number;
    "width": number;
    "height": number;
    "availableResolutions": string;
    "thumbnailCount": number;
    "encodeProgress": number;
    "storageSize": number;
    "captions": VideoCaption[];
    "hasMP4Fallback": boolean;
    "collectionId": string;
    "thumbnailFileName": string;
    "averageWatchTime": number;
    "totalWatchTime": number;
    "category": string;
    "chapters": VideoChapter[];
    "moments": VideoMoment[];
    "metaTags": VideoMetaTag[];
    "transcodingMessages": VideoTranscodingMessage[];
}
export interface APIVideo {
    "videoLibraryId": number;
    "guid": string;
    "title": string;
    "dateUploaded": string;
    "views": number;
    "isPublic": boolean;
    "length": number;
    "status": number;
    "framerate": number;
    "width": number;
    "height": number;
    "availableResolutions": string;
    "thumbnailCount": number;
    "encodeProgress": number;
    "storageSize": number;
    "captions": VideoCaption[];
    "hasMP4Fallback": boolean;
    "collectionId": string;
    "thumbnailFileName": string;
    "averageWatchTime": number;
    "totalWatchTime": number;
    "category": string;
    "chapters": VideoChapter[];
    "moments": VideoMoment[];
    "metaTags": VideoMetaTag[];
    "transcodingMessages": (VideoTranscodingMessage & {
        "timeStamp": string;
    })[];
}
export interface VideoStatics {
    "viewsChart": {
        [key: string]: number;
    };
    "watchTimeChart": {
        [key: string]: number;
    };
    "countryViewCounts": {
        [key: string]: number;
    };
    "countryWatchTime": {
        [key: string]: number;
    };
    "engagementScore": number;
}
export interface VideoList {
    "totalItems": number;
    "currentPage": number;
    "itemsPerPage": number;
    "items": Video[];
}
