import { StorageZoneRegionKey, StorageZoneTier } from '../utils/storageZone';
import { StoragePullZone } from './pullZone';

export interface RawStorageZone {
	Id: number;
	UserId: number;
	Name: string;
	Password: string;
	DateModified: string;
	Deleted: boolean;
	StorageUsed: number;
	FilesStored: number;
	Region: StorageZoneRegionKey;
	ReplicationRegions: StorageZoneRegionKey[];
	PullZones: StoragePullZone[];
	ReadOnlyPassword: string;
	Rewrite404To200: boolean;
	Custom404FilePath: string | null;
	StorageHostname: string;
	ZoneTier: StorageZoneTier;
	ReplicationChangeInProgress: boolean;
	PriceOverride: number;
	Discount: number;
}

