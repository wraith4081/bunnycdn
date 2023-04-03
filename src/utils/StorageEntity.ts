export interface APIStorageEntity {
    "Guid": string,
    "StorageZoneName": string,
    "Path": string,
    "ObjectName": string,
    "Length": number,
    "LastChanged": string,
    "IsDirectory": boolean,
    "ServerId": number,
    "UserId": string,
    "DateCreated": string,
    "StorageZoneId": number
}

export interface StorageEntity {
    "Guid": string,
    "StorageZoneName": string,
    "Path": string,
    "ObjectName": string,
    "Length": number,
    "LastChanged": Date,
    "IsDirectory": boolean,
    "ServerId": number,
    "UserId": string,
    "DateCreated": Date,
    "StorageZoneId": number
}