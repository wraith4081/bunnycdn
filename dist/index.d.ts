import EdgeStorage from './EdgeStorage';
import Stream from './Stream';
import Video from './Video';
import Collection from './Collection';
import StorageEndpoints from './utils/StorageEndpoints';
export default class BunnyCDN extends EdgeStorage {
    EdgeStorage: EdgeStorage;
    Stream: Stream;
    constructor({ AccessKey, StorageZone }: {
        AccessKey: string;
        StorageZone: StorageEndpoints;
    });
    GetLibrary(libraryId: number, accessKey: string): import("./Stream").Library;
}
export { Stream, Video, Collection, StorageEndpoints, EdgeStorage };
