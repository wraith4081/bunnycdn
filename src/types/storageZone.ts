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

export interface EditableStorageZone {
	ReplicationRegions: StorageZoneRegionKey[];
	OriginUrl: string;
	Custom404FilePath: string | null;
	Rewrite404To200: boolean;
}

type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

type TDateISO =
	`${TYear}-${TMonth}-${TDay}T${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}Z`;

export interface RawStorageZoneStatistics {
	StorageUsedChart: {
		[key: TDateISO]: number;
	};
	FileCountChart: {
		[key: TDateISO]: number;
	};
}
