import { RawStorageEntity } from '../types/storageZone';
import { joinPaths } from '../utils/util';
import StorageZone from './storageZone';

export default class Directory {
	zone: StorageZone;
	data: RawStorageEntity<true>;

	constructor(zone: StorageZone, data: RawStorageEntity<true>) {
		this.zone = zone;
		this.data = data;
	}

	async list(path?: string) {
		const x = joinPaths(
			`https://${this.zone.data.StorageHostname}/`,
			this.data.Path,
			this.data.ObjectName,
			path || ''
		).split('/').slice(4).join('/');
		
		return this.zone.list(x);
	}
}
