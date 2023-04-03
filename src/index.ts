import EdgeStorage from './EdgeStorage';
import Stream from './Stream';
import Video from './Video';
import Collection from './Collection';
import StorageEndpoints from './utils/StorageEndpoints';

export default class BunnyCDN extends EdgeStorage {
    public EdgeStorage!: EdgeStorage;
    public Stream: Stream;

    constructor({
        AccessKey,
        StorageZone
    }: {
        AccessKey: string,
        StorageZone: StorageEndpoints
    }) {
        super(AccessKey, StorageZone);

        this.Stream = new Stream();
    }

    GetLibrary(libraryId: number, accessKey: string) {
        return this.Stream.GetLibrary(libraryId, accessKey);
    }
}

export {
    Stream,
    Video,
    Collection,
    StorageEndpoints,
    EdgeStorage
}