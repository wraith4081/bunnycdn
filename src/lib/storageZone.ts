import axios, { AxiosInstance } from 'axios';
import {
	EditableStorageZone,
	RawStorageEntity,
	RawStorageZone,
	RawStorageZoneStatistics,
} from '../types/storageZone';
import { Result } from '../types/general';
import { respond } from '../utils/util';
import {
	storageZoneConfigFields,
	StorageZoneRegion,
	StorageZoneRegionKey,
	StorageZoneRegionList,
	StorageZoneTier,
} from '../utils/storageZone';
import { isValidURL } from '../utils/validator';
import File from './File';
import Directory from './Directory';

export default class StorageZone {
	data: RawStorageZone;
	attached = false;
	attachment: Promise<StorageZone> | null = null;
	instance: AxiosInstance;

	constructor(data: RawStorageZone, manualAttach: boolean = false) {
		console.log('StorageZone', data.Password);
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

	async delete() {
		if (!this.attached)
			return respond('error', {
				message: 'Zone is not attached',
				status: 400,
			});

		const req = await this.instance.delete(
			`https://api.bunny.net/storagezone/${this.data.Id}`
		);

		if (req.status !== 204)
			return respond('error', {
				status: req.status,
				message: req.data?.Message || 'An error occurred',
			});

		return respond('success');
	}

	// TODO: Parse the data and return a class for managing the data properly
	async statistics(data?: { from: Date; to: Date }) {
		if (!this.attached)
			return respond('error', {
				message: 'Zone is not attached',
				status: 400,
			});

		if (data && (!data.from || !data.to)) {
			return respond('error', {
				message: 'Missing required fields: from, to',
				status: 400,
			});
		}

		if (data && data!.from?.getTime() > data!.to?.getTime())
			return respond('error', {
				message: 'From date cannot be greater than to date',
				status: 400,
			});

		const query = new URLSearchParams();
		if (data) {
			query.append('from', data.from.toISOString());
			query.append('to', data.to.toISOString());
		}

		return this.#get<RawStorageZoneStatistics>(
			`https://api.bunny.net/storagezone/${this.data.Id}/statistics?${query}`
		);
	}

	async update(data: Partial<EditableStorageZone>) {
		const payload: {
			[key: string]: any;
		} = {};

		for (const field of storageZoneConfigFields) {
			if (!(field.name in data)) {
				if (field.optional) continue;

				return respond('error', {
					message: `Missing required field: ${field.name}`,
					status: 400,
				});
			}

			const value = (data as any)?.[field.name];

			if (field.validate && !field.validate(value)) {
				return respond('error', {
					message: `Invalid value for field: ${field.name}`,
					status: 400,
				});
			}

			payload[field.name] = value;
		}

		const req = await this.#post<RawStorageZone>(
			`https://api.bunny.net/storagezone/${this.data.Id}`,
			payload,
			204
		);

		if (req.status !== 'success') return req;

		this.attached = false;
		this.attach(this.data.Id, false);
		return respond('success');
	}

	async resetToken(apiKey: string, type?: 'readonly') {
		if (!this.attached)
			return respond('error', {
				message: 'Zone is not attached',
				status: 400,
			});

		if (!apiKey)
			return respond('error', {
				message: 'Missing Field: apiKey',
				status: 400,
			});

		const req = await this.#post(
			`https://api.bunny.net/storagezone/${this.data.Id}/${
				type === 'readonly' ? 'resetReadOnlyPassword' : 'resetPassword'
			}`,
			{},
			204
		);

		if (req.status !== 'success') return req;

		const newZone = await StorageZone.fetch(this.data.Id, apiKey);

		if (!newZone) return respond('error', { message: 'An error occurred' });

		this.data = newZone.data;
		return respond('success');
	}

	async list(path?: string) {
		if (!this.attached)
			return respond('error', {
				message: 'Zone is not attached',
				status: 400,
			});

		const entities = await this.#get<RawStorageEntity<boolean>[]>(
			(new URL(
				path || '',
				`https://${this.data.StorageHostname}/${this.data.Name}/`
			).href + '/').replace(/\/\/$/, '/'),
			200
		);

		if (entities.status !== 'success') return entities;

		const data: (File | Directory)[] = [];

		for (let entity of entities.data) {
			if (entity.IsDirectory) {
				data.push(
					new Directory(this, entity as RawStorageEntity<true>)
				);
			} else {
				data.push(new File(this, entity as RawStorageEntity<false>));
			}
		}

		return respond('success', { data });
	}

	public static async resetToken(
		id: number,
		apiKey: string,
		type?: 'readonly'
	) {
		if (!id || isNaN(id) || id < 1)
			return respond('error', {
				message: 'Invalid Field: id',
				status: 400,
			});

		if (!apiKey)
			return respond('error', {
				message: 'Missing Field: apiKey',
				status: 400,
			});

		const req = await axios.post(
			`https://api.bunny.net/storagezone/${id}/${
				type === 'readonly' ? 'resetReadOnlyPassword' : 'resetPassword'
			}`,
			{},
			{
				headers: {
					AccessKey: apiKey,
				},
			}
		);

		if (req.status !== 204)
			return respond('error', {
				status: req.status,
				message: req.data?.Message || 'An error occurred',
			});

		const newZone = await StorageZone.fetch(id, apiKey);

		if (!newZone) return respond('error', { message: 'An error occurred' });

		return respond('success', newZone);
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

	public static async isZoneAvailable(name: string, apiKey: string) {
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
		const payload: {
			[key: string]: any;
		} = {};

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

	async #post<T extends any>(
		url: string,
		body: any,
		expectedStatus: number | number[] = 200
	): Promise<Result<T>> {
		const { data, status } = await this.instance.post(url, body);
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
