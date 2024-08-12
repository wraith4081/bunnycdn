import axios, { AxiosInstance } from 'axios';
import {
	EditableVideoLibrary,
	Language,
	RawVideoLibrary,
} from '../types/videoLibrary';
import { Region, Result } from '../types/general';
import { videoLibraryConfigFields } from '../utils/videoLibrary';
import { respond } from '../utils/util';

export default class VideoLibrary {
	data: RawVideoLibrary;
	attached = false;
	attachment: Promise<VideoLibrary> | null = null;
	instance: AxiosInstance;

	constructor(data: RawVideoLibrary, manualAttach: boolean = false) {
		this.data = data;
		this.instance = axios.create({
			headers: {
				AccessKey: this.data.ApiAccessKey,
			},
			validateStatus: () => true,
		});

		if (!manualAttach) this.attachment = this.attach(data.Id, false);
	}

	async attach(
		id: number,
		unattachOnMissing: boolean = true
	): Promise<VideoLibrary> {
		const req = await this.#get<RawVideoLibrary>(
			`https://api.bunny.net/videolibrary/${id}`,
			200
		);

		this.attached = req.status === 'success' || !unattachOnMissing;
		if (req.status === 'success') this.data = req.data;

		this.attachment = null;
		return this;
	}

	async update(data: Partial<EditableVideoLibrary>) {
		const payload: {
			[key: string]: any;
		} = {};

		for (const field of videoLibraryConfigFields) {
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

		return await this.#post<RawVideoLibrary>(
			`https://api.bunny.net/videolibrary/${this.data.Id}`,
			payload,
			200
		);
	}

	async delete() {
		if (!this.attached)
			return respond('error', {
				message: 'VideoLibrary is not attached',
				status: 400,
			});

		return await this.#delete<RawVideoLibrary>(
			`https://api.bunny.net/videolibrary/${this.data.Id}`,
			204
		);
	}

	public static async getLanguages(
		apiKey: string
	): Promise<Result<Language[]>> {
		const req = await axios({
			url: `https://api.bunny.net/videolibrary/languages`,
			headers: {
				AccessKey: apiKey,
			},
			validateStatus: () => true,
		});

		if (req.status !== 200)
			return respond('error', {
				message: req.data?.Message || 'An error occurred',
				status: req.status,
			});

		return respond('success', {
			data: req.data,
		});
	}

	public static async fetch(id: number, apiKey: string) {
		const req = await axios({
			url: `https://api.bunny.net/videolibrary/${id}`,
			headers: {
				AccessKey: apiKey,
			},
			validateStatus: () => true,
		});

		if (req.status === 200) {
			const videoLibrary = new VideoLibrary(req.data, true);
			videoLibrary.attached = true;

			return videoLibrary;
		}

		return null;
	}

	public static async create(
		data: {
			name: string;
			replicationRegions?: (Region | string)[];
		},
		apiKey: string
	) {
		const ReplicationRegions: Set<string> = new Set();

		if (!data.name) {
			return null;
		}

		for (const region of data?.replicationRegions || []) {
			ReplicationRegions.add(
				typeof region === 'string' ? region : region.RegionCode
			);
		}

		const req = await axios.post(
			'https://api.bunny.net/videolibrary',
			Object.assign(
				{ Name: data.name },
				ReplicationRegions.size
					? { ReplicationRegions: Array.from(ReplicationRegions) }
					: {}
			),
			{
				headers: {
					AccessKey: apiKey,
				},
			}
		);

		if (req.status !== 200) return null;

		const videoLibrary = new VideoLibrary(req.data, true);
		videoLibrary.attached = true;
		return videoLibrary;
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

	async #delete<T extends any>(
		url: string,
		expectedStatus: number | number[] = 200
	): Promise<Result<T>> {
		const { data, status } = await this.instance.delete(url);
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
