import axios, { AxiosInstance } from 'axios';
import { RawStorageZone } from '../types/storageZone';
import { Result } from '../types/general';
import { respond } from '../utils/util';
import {
	StorageZoneRegion,
	StorageZoneRegionKey,
	StorageZoneRegionList,
	StorageZoneTier,
} from '../utils/storageZone';
import { isValidURL } from '../utils/validator';

export default class StorageZone {
	data: RawStorageZone;
	attached = false;
	attachment: Promise<StorageZone> | null = null;
	instance: AxiosInstance;

	constructor(data: RawStorageZone, manualAttach: boolean = false) {
		this.data = data;
		this.instance = axios.create({
			headers: {
				AccessKey: this.data.Password,
			},
			validateStatus: () => true,
		});

		if (!manualAttach) this.attachment = this.attach(data.Id, false);
	}

	async attach(
		id: number,
		unattachOnMissing: boolean = true
	): Promise<StorageZone> {
		const req = await this.#get<RawStorageZone>(
			`https://api.bunny.net/storagezone/${id}`,
			200
		);

		this.attached = req.status === 'success' || !unattachOnMissing;
		if (req.status === 'success') this.data = req.data;

		this.attachment = null;
		return this;
	}

	public static async fetch(id: number, apiKey: string) {
		const req = await axios({
			url: `https://api.bunny.net/storagezone/${id}`,
			headers: {
				AccessKey: apiKey,
			},
			validateStatus: () => true,
		});

		if (req.status === 200) {
			const storageZone = new StorageZone(req.data, true);
			storageZone.attached = true;

			return storageZone;
		}

		return null;
	}

	public static async isZoneAvilable(name: string, apiKey: string) {
		const req = await axios.post(
			'https://api.bunny.net/storagezone/checkavailability',
			{
				headers: {
					AccessKey: apiKey,
					'Content-Type': 'application/json',
				},
				data: {
					Name: name,
				},
			}
		);

		if (req.status !== 200)
			return respond('error', {
				status: req.status,
				message: req.data?.Message || 'An error occurred',
			});

		return respond('success', {
			available: !!req.data.Available,
		});
	}

	public static async create<T extends StorageZoneRegionKey>(
		data: {
			OriginUrl?: string;
			Name: string;
			Region: T;
			ReplicationRegions?: Exclude<StorageZoneRegionKey, T>[];
			ZoneTier: StorageZoneTier;
		},
		apiKey: string
	) {
		const payload = {};

		if (data.OriginUrl) {
			if (!isValidURL(data.OriginUrl))
				return respond('error', {
					message: 'Invalid Field: OriginUrl',
					status: 400,
				});

			payload['OriginUrl'] = data.OriginUrl;
		}

		if (!data.Name)
			return respond('error', {
				message: 'Missing Field: Name',
				status: 400,
			});
		if (!StorageZoneRegionList.includes(data.Region)) {
			return respond('error', {
				message: 'Invalid Field: Region',
				status: 400,
			});
		}

		if (data.ReplicationRegions && data.ReplicationRegions.length) {
			if (
				data.ReplicationRegions.some(
					(r) => !StorageZoneRegionList.includes(r)
				)
			)
				return respond('error', {
					message: 'Invalid Field: ReplicationRegions',
					status: 400,
				});

			if (
				(data.ReplicationRegions as StorageZoneRegionKey[]).includes(
					data.Region
				)
			)
				return respond('error', {
					message:
						'ReplicationRegions cannot contain the same region as the main zone',
					status: 400,
				});

			payload['ReplicationRegions'] = data.ReplicationRegions;
		}

		if (![0, 1].includes(data.ZoneTier))
			return respond('error', {
				message: 'Invalid Field: ZoneTier',
				status: 400,
			});

		const req = await axios.post(
			'https://api.bunny.net/storagezone',
			payload,
			{
				headers: {
					AccessKey: apiKey,
				},
			}
		);

		if (req.status !== 201)
			return respond('error', {
				status: req.status,
				message: req.data?.Message || 'An error occurred',
			});

		const storageZone = new StorageZone(req.data, true);
		storageZone.attached = true;
		return storageZone;
	}

	async #get<T extends any>(
		url: string,
		expectedStatus: number | number[] = 200
	): Promise<Result<T>> {
		const { data, status } = await this.instance.get(url);
		if (![expectedStatus].flat().includes(status))
			return respond('error', {
				message: data?.Message || 'An error occurred',
				status,
			});
		return respond('success', {
			data,
		} as {
			data: T;
		});
	}
}
