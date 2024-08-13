export enum StorageZoneRegion {
	DE = 'storage.bunnycdn.com',
	UK = 'uk.storage.bunnycdn.com',
	NY = 'ny.storage.bunnycdn.com',
	LA = 'la.storage.bunnycdn.com',
	SG = 'sg.storage.bunnycdn.com',
	SE = 'se.storage.bunnycdn.com',
	BR = 'br.storage.bunnycdn.com',
	SA = 'jh.storage.bunnycdn.com',
	SYD = 'syd.storage.bunnycdn.com',
}

export enum StorageZoneTier {
	STANDART = 0,
	EDGE = 1,
}

export const StorageZoneRegionList = ['DE', 'UK', 'NY', 'LA', 'SG', 'SE', 'BR', 'SA', 'SYD'] as const;
export type StorageZoneRegionKey = typeof StorageZoneRegionList[number];
