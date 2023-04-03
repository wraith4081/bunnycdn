## Documentation

### Overview

This project consists of several modules:

1. Types and Definitions: Defining ErrorResponse, StatusResponse, Video related types and other types, and utility types.
2. `EdgeStorage.ts`: Provides functionality for interacting with BunnyCDN storage endpoints.
3. `Collection.ts`: Represents a video collection in Bunny Stream and provides functions for modifying the collection.
4. `Stream.ts`: Provides the main functionalities and interacts with Bunny Stream API's - Video and Collection management operations.

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
- set Endpoint(StorageZone: StorageEndpoints): Sets the current storage endpoint.
- get AccessKey(): Returns the access key being used.
- set AccessKey(AccessKey: string): Sets the access key.
- CreateClient(StorageZoneName: string): Creates and returns an instance of `EdgeStorageClient`.

#### Class: EdgeStorageClient

Extends from EdgeStorage.

Methods:

- ListFiles(path: string): Fetches and returns a list of storage entities for the given path.
- DownloadFile(path: string): Downloads the file at the given path.
- UploadFile(path: string, fileContent: Buffer): Uploads a file with the specified content to the given path.
- DeleteFile(path: string): Deletes a file at the given path.

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
- Delete(): Deletes the collection.

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
- GetVideoStatistics(params: object): Fetches video statistics based on given parameters.
- ListVideos(params: object): Lists videos in the library based on given parameters.
- CreateVideo(params: object): Creates a new video in the library.
- FetchVideo(bodyParams: object, queryParams: object): Fetches a video from a remote URL.
- GetCollection(collectionId: string): Retrieves a collection with the given collection ID.
- GetCollectionList(queryParams: object): Retrieves a list of collections based on given parameters.
- CreateCollection(name?: string): Creates a new collection in the library with the specified name.

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
- `Delete()`: Deletes the video.
- `Upload(enabledResolutions?: string)`: Uploads the video with the specified resolutions (optional).
- `GetHeatmap()`: Retrieves the video heatmap data.
- `Reencode()`: Re-encodes the video.
- `SetThumbnail(payload: { thumbnailUrl?: string; })`: Sets the thumbnail of the video.
- `AddCaption(srclang: string, params: { srclang?: string; label?: string; captionsFile?: string; })`: Adds a caption to the video.
- `DeleteCaption(srclang: string)`: Deletes a caption from the video.

By using the `Video` class, you can manage individual videos in your Bunny Stream library.

By using these classes and methods, you can perform various operations related to BunnyCDN Storage and Bunny Stream.
