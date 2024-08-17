import { RawStorageEntity } from "../types/storageZone";
import StorageZone from "./storageZone";

export default class File {
	zone: StorageZone;
	data: RawStorageEntity<false>;

	constructor (zone: StorageZone, data: RawStorageEntity<false>) {
		this.zone = zone;
		this.data = data;
	}
}
