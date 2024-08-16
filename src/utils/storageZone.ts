import { isValidURL, ConfigField, FieldTypes } from './validator';

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

export const StorageZoneRegionList = [
	'DE',
	'UK',
	'NY',
	'LA',
	'SG',
	'SE',
	'BR',
	'SA',
	'SYD',
] as const;
export type StorageZoneRegionKey = (typeof StorageZoneRegionList)[number];

export const storageZoneConfigFields: ConfigField<FieldTypes>[] = [
	{
		name: 'OriginUrl',
		optional: true,
		type: FieldTypes.STRING,
		validate: isValidURL,
	},
	{
		name: 'ReplicationRegions',
		optional: true,
		type: FieldTypes.STRING_ARRAY,
		validate: (value: string[]) =>
			value.every((v) =>
				StorageZoneRegionList.includes(v as StorageZoneRegionKey)
			),
	},
	{
		name: 'Custom404FilePath',
		optional: true,
		type: FieldTypes.STRING,
	},
	{
		name: 'Rewrite404To200',
		optional: true,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
];
