## Documentation

### Overview

This project consists of several modules:

1. Types and Definitions: Defining ErrorResponse, StatusResponse, Video related types and other types, and utility types.
2. `EdgeStorage.ts`: Provides functionality for interacting with BunnyCDN storage endpoints.
3. `Collection.ts`: Represents a video collection in Bunny Stream and provides functions for modifying the collection.
4. `Stream.ts`: Provides the main functionalities and interacts with Bunny Stream API's - Video and Collection management operations.

### Quick Start
#### Global
```ts
import BunnyCDN, { StorageEndpoints } from "bunnycdn";

const cdn = new BunnyCDN({
    AccessKey: "access-key",
    StorageZone: StorageEndpoints.Falkenstein
});
```
#### Spesific
##### EdgeStorage
```ts
import { EdgeStorage, StorageEndpoints } from "bunnycdn";

const edgeStorage = new EdgeStorage("access-key", StorageEndpoints.Falkenstein);
const storageZone = edgeStorage.CreateClient("storage-zone-name");
```
```ts
const files = await storageZone.ListFiles('.')
for (let file of files) {
    console.log(`A file was found with the name ${file.ObjectName} and the guid ${file.Guid} with ${file.Length} bytes.`)
}
```
##### Stream
```ts
import { Stream } from "bunnycdn";

const stream = new Stream();
const library = stream.GetLibrary(1234, 'access-key');
```
```ts
const MyCollection = await library.GetCollection("collection-guid");

const result = (
    await library.ListVideos({
        collection: MyCollection.data?.collectionId,
        page: 1,
        itemsPerPage: 100,
        orderBy: 'date',
        search: 'My Video'
    })
).data || {};

console.log(
    result.itemsPerPage,
    result.currentPage,
    result.totalItems,
);

for (let video of result) {
    console.log(`${video.title}} has ${video.views} views and is ${video.length} seconds long`);
}
```
### Types and Definitions

#### ErrorResponse

Type: `interface`

```ts
interface ErrorResponse {
    HttpCode: number;
    Message: string;
}
```

- Represents an error response object with the properties `HttpCode` and `Message`.

#### StatusResponse

Type: `enum`

```ts
enum StatusResponse {
    OK = 200,
    CREATED = 201,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,

    INTERNAL_SERVER_ERROR = 500,

    // Undefined
    UNDEFINED = 0
}
```

- Represents the possible HTTP status code responses.

#### Video related types

Declares `VideoCaption`, `VideoChapter`, `VideoMoment`, `VideoMetaTag`, `VideoTranscodingMessageLevel`,
`VideoTranscodingMessage`, `VideoStatus`, `Video`, `APIVideo`, `VideoStatics`, and `VideoList`.

Please refer to the provided typings for their definitions.

### EdgeStorage.ts

#### Class: EdgeStorage

To create an instance of EdgeStorage, you need to provide `AccessKey` and optionally, `StorageZone` as parameters.

Example:

```javascript
const edgeStorage = new EdgeStorage('your-access-key', StorageEndpoints.Falkenstein);
```

Methods:

- get Endpoint(): Returns the current storage endpoint being used.
  ```ts
    edgeStorage.Endpoint
  ```
- set Endpoint(StorageZone: StorageEndpoints): Sets the current storage endpoint.
  ```ts
    edgeStorage.Endpoint = StorageEndpoints.NY
  ```
- get AccessKey(): Returns the access key being used.
  ```ts
    edgeStorage.AccessKey
  ```
- set AccessKey(AccessKey: string): Sets the access key.
  ```ts
    edgeStorage.AccessKey = 'access-key-2'
  ```
- CreateClient(StorageZoneName: string): Creates and returns an instance of `EdgeStorageClient`.
  ```ts
    edgeStorage.CreateClient('storage-zone-name')
  ```

#### Class: EdgeStorageClient

Extends from EdgeStorage.

Methods:

- ListFiles(path: string): Fetches and returns a list of storage entities for the given path.
  ```ts
    await edgeStorageClient.ListFiles('.')
  ```
- DownloadFile(path: string): Downloads the file at the given path.
  ```ts
    await edgeStorageClient.DownloadFile('videos/hello_world.mp4')
  ```
- UploadFile(path: string, fileContent: Buffer): Uploads a file with the specified content to the given path.
  ```ts
    await edgeStorageClient.UploadFile('images/javascript.png', MyImageBuffer)
  ```
- DeleteFile(path: string): Deletes a file at the given path.
  ```ts
    await edgeStorageClient.DeleteFile('temp/old_database.json')
  ```

### Collection.ts

#### Interface: APICollection

```ts
interface APICollection {
    videoLibraryId: number;
    guid?: string;
    name?: string;
    videoCount: number;
    totalSize: number;
    previewVideoIds?: string;
}
```

- Represents the API response for a video collection.

#### Class: Collection

This class represents a video collection with methods to update and delete itself.

Constructor parameters:
- `data: APICollection`
- `collectionId: string`
- `library: Library`

Methods:

- Update(name?: string): Updates the collection with the new name if provided.
  ```ts
    await myCollection.Update('my-collection-updated')
  ```
- Delete(): Deletes the collection.
  ```ts
    await myCollection.Delete()
  ```

### Stream.ts

#### Class: Stream

Main class for working with Bunny Stream APIs.

Constructor:

```javascript
const stream = new Stream();
```

Methods:

- GetLibrary(libraryId: number, accessKey: string): Retrieves the library with the given library ID and access key.

#### Class: Library

This class represents a Bunny Stream library.

Constructor parameters:
- `libraryId: number`
- `accessKey: string`

Methods:

- GetVideo(videoId: number): Retrieves a video with the given video ID.
  ```ts
    await stream.GetVideo(12345)
  ```
- GetVideoStatistics(params: object): Fetches video statistics based on given parameters.
  ```ts
    await stream.GetVideoStatistics({
        dateFrom: '2023-01-01T12:00:00.000Z',
        dateTo: '2023-04-03T12:00:00.000Z',
        hourly: true,
        videoGuid: 'my-unique-guid'
    })
  ```
- ListVideos(params: object): Lists videos in the library based on given parameters.
  ```ts
    await stream.ListVideos({
        page: 1;
        itemsPerPage: 100;
        search: 'My video';
        collection: 'my-collection-guid',
        orderBy: 'date'
    })
  ```
- CreateVideo(params: object): Creates a new video in the library.
  ```ts
    await stream.CreateVideo({
        title: 'My Newest Video',
        collectionId: 'my-collection-guid',
        thumbnailTime: 67 // hours * 3600 + minutes * 60 + seconds
    })
  ```
- FetchVideo(bodyParams: object, queryParams: object): Fetches a video from a remote URL.
  ```ts
    await stream.FetchVideo({
        url: 'https://example.com/my-video-link',
        headers: {
            'my-header-key': 'my-header-value',
            // ...
        }
    }, {
        collectionId: 'my-collection-guid',
        lowPriority: true,
        thumbnailTime: 67 // hours * 3600 + minutes * 60 + seconds
    })
  ```
- GetCollection(collectionId: string): Retrieves a collection with the given collection ID.
  ```ts
    await stream.GetCollection('my-collection-guid')
  ```
- GetCollectionList(queryParams: object): Retrieves a list of collections based on given parameters.
  ```ts
    await stream.GetCollection({
        page: 1,
        itemsPerPage: 100,
        search: 'My Collection',
        orderBy: "date"
    })
  ```
- CreateCollection(name?: string): Creates a new collection in the library with the specified name.
  ```ts
    await stream.CreateCollection('my-collection')
  ```

### Video.ts

#### Interface: UpdateParams

```ts
export interface UpdateParams {
    title?: string;
    collectionId?: string;
    chapters?: VideoChapter[];
    moments?: VideoMoment[];
    metaTags?: VideoMetaTag[];
}
```

- Represents the parameters that can be updated when calling the `Update` method.

#### Class: Video

This class encapsulates a video in Bunny Stream.

Constructor parameters:

- `library: Library`
- `data: APIVideo`
- `videoId: number`

Methods:

- `Update(props: UpdateParams)`: Updates the video with the provided properties.
  ***Give a object whose is suitable for `UpdateParams`***
- `Delete()`: Deletes the video.
  ```ts
    await video.Delete()
  ```
- `Upload(enabledResolutions?: string)`: Uploads the video with the specified resolutions (optional).
  ***Coming Soon***
- `GetHeatmap()`: Retrieves the video heatmap data.
  ```ts
    await video.GetHeatmap()
  ```
- `Reencode()`: Re-encodes the video.
  ```ts
    await video.Reencode()
  ```
- `SetThumbnail(payload: { thumbnailUrl?: string; })`: Sets the thumbnail of the video.
  ```ts
    await video.SetThumbnail({ 
        thumbnailUrl: 'https://example.com/my-thumbnail.png'
    })
  ```
- `AddCaption(srclang: string, params: { srclang?: string; label?: string; captionsFile?: string; })`: Adds a caption to the video.
  ```ts
    await video.AddCaption('tr', {
        srclang: 'tr',
        label: 'Turkish',
        captionsFile: Base64(MyFileContent)
    })
  ```
- `DeleteCaption(srclang: string)`: Deletes a caption from the video.
  ```ts
    await video.DeleteCaption('tr')
  ```

By using the `Video` class, you can manage individual videos in your Bunny Stream library.

By using these classes and methods, you can perform various operations related to BunnyCDN Storage and Bunny Stream.
