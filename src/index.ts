import axios, { AxiosInstance } from 'axios';
import { APIKey, Country, Region, Result } from './types/general';
import withPagination, {
	PaginatedResult,
	PaginationOptions,
} from './utils/pagination';
import { RawVideoLibrary } from './types/videoLibrary';
import VideoLibrary from './lib/videoLibrary';
import { respond } from './utils/util';

export default class BunnyCDN {
	instance: AxiosInstance;

	constructor(private apiKey: string) {
		this.instance = axios.create({
			headers: {
				AccessKey: this.apiKey,
			},
			validateStatus: () => true,
		});
	}

	async getCountries() {
		return await this.#get<Country[]>('https://api.bunny.net/country');
	}

	getAPIKeys = withPagination(async (_: {}, options: PaginationOptions) => {
		return await this.#get<PaginatedResult<APIKey[]>>(
			`https://api.bunny.net/apikey?page=${options.page}&perPage=${options.limit}`,
			[200, 404]
		);
	});

	async getRegions() {
		return await this.#get<Region[]>('https://api.bunny.net/region');
	}

	listVideoLibraries = withPagination(
		async (data: { search: string }, options: PaginationOptions) => {
			const query = new URLSearchParams({
				page: options.page.toString(),
				perPage: options.limit.toString(),
				search: data.search,
				includeAccessKey: 'true',
			});

			const result = await this.#get<PaginatedResult<any[]>>(
				`https://api.bunny.net/videolibrary?${query}`
			);

			if (result.status === 'success') {
				result.data.Items = result.data.Items.map(
					(item: RawVideoLibrary) => {
						const videoLibrary = new VideoLibrary(item, false);
						videoLibrary.attached = true;

						return videoLibrary;
					}
				);
			}

			return result as Result<PaginatedResult<VideoLibrary[]>>;
		}
	);

	async getVideoLibrary(
		id: number,
		autoAttach: boolean = true
	): Promise<VideoLibrary | null> {
		const fetchPromise = VideoLibrary.fetch(id, this.apiKey);

		if (!autoAttach) return fetchPromise;

		return Promise.all([
			fetchPromise,
			fetchPromise.then((res) => res?.attachment),
		]).then(([videoLibrary]) => videoLibrary);
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

		return respond('success', { data });
	}
}
