import axios from "axios";
import { InternalServerError, LocalError, NotFound, Success, Unauthorized } from "./types/Result";
import Country from "./types/Country";
import Region from "./types/Region";
import URLPacket from "./helpers/URLPacket";
import StreamVideoLibrary from "./internals/StreamVideoLibrary";
import Language from "./types/Language";

interface Options {
    debug?: boolean;
}

export default class BunnyCDN {
    private AccessKey: string;
    private options: Options;

    constructor(AccessKey: string, options: Options = { debug: false }) {
        this.AccessKey = AccessKey;
        this.options = options ?? {};
    }

    // Countries
    public async GetCountries(): Promise<(
        Success<Country[]> |
        Unauthorized | InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("GET", "/country");

            if (result.code >= 400) {
                return {
                    error: result.data.Message ?? "Unknown error",
                    code: result.code === 401 ? 401 : 500
                };
            }

            return {
                success: true,
                data: result.data
            };
        } catch (error: any) {
            if (this.options.debug) {
                console.error(error);
            }
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    // API Keys
    // TODO: Finish this
    public async ListAPIKeys(
        page: number = 1,
        perPage: number = 100
    ): Promise<(
        Success<Country[]> |
        Unauthorized | InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("GET", `/apikey?${URLPacket({ page, perPage })}`);

            if (result.code >= 400) {
                return {
                    error: result.data.Message ?? "Unknown error",
                    code: result.code === 401 ? 401 : 500
                };
            }

            return {
                success: true,
                data: result.data
            };
        } catch (error: any) {
            if (this.options.debug) {
                console.error(error);
            }
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    // Region
    public async RegionList(): Promise<(
        Success<Region[]> |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("GET", "/region");

            if (result.code >= 400) {
                return {
                    error: result.data.Message ?? "Unknown error",
                    code: result.code === 500 ? 500 : 0
                };
            }

            return {
                success: true,
                data: result.data
            };
        } catch (error: any) {
            if (this.options.debug) {
                console.error(error);
            }
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    // Stream Video Library
    public async ListVideoLibraries(
        page: number = 1,
        perPage: number = 100,
        search: string = "",
        includeAccessKey: boolean = false
    ): Promise<(
        Success<{
            Items: StreamVideoLibrary[],
            CurrentPage: number,
            TotalItems: number,
            HasMoreItems: boolean
        }> |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("GET", `/videolibrary?${URLPacket({ page, perPage, search, includeAccessKey })}`);

            if (result.code >= 400) {
                return {
                    error: result.data.Message ?? "Unknown error",
                    code: result.code === 500 ? 500 : 0
                };
            }

            return {
                success: true,
                data: {
                    ...result.data,
                    Items: result.data.Items.map((item: any) => new StreamVideoLibrary(item))
                }
            };
        } catch (error: any) {
            if (this.options.debug) {
                console.error(error);
            }
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    // TODO: NOT WORKING, Check if it's a bug on BunnyCDN's side
    public async AddVideoLibrary(
        name: string,
        replicationRegions: string[] = [],
    ): Promise<(
        Success<string> |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("POST", "/videolibrary", {
                Name: name,
                ReplicationRegions: replicationRegions
            });

            if (result.code >= 400) {
                return {
                    error: result.data.Message ?? "Unknown error",
                    code: result.code === 500 ? 500 : 0
                };
            }

            return {
                success: true,
                data: result.data
            };
        } catch (error: any) {
            if (this.options.debug) {
                console.error(error);
            }
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async GetVideoLibrary(
        id: number,
        includeAccessKey: boolean = false
    ): Promise<(
        Success<StreamVideoLibrary> |
        NotFound | Unauthorized |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("GET", `/videolibrary/${id}?${URLPacket({ includeAccessKey })}`);

            if (result.code >= 400) {
                return {
                    error: result.data.Message ?? "Unknown error",
                    code: (result.code) as any
                };
            }

            return {
                success: true,
                data: new StreamVideoLibrary(result.data)
            };
        } catch (error: any) {
            if (this.options.debug) {
                console.error(error);
            }
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }
    public async GetLanguages(): Promise<(
        Success<Language[]> |
        Unauthorized |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("GET", `/videolibrary/languages`);

            if (result.code >= 400) {
                return {
                    error: result.data.Message ?? "Unknown error",
                    code: (result.code) as any
                };
            }

            return {
                success: true,
                data: result.data
            };
        } catch (error: any) {
            if (this.options.debug) {
                console.error(error);
            }
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async ResetStorageZoneAPIKey(
        id: number
    ): Promise<(
        Success<undefined> |
        Unauthorized | NotFound |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("GET", `/videolibrary/resetApiKey?${URLPacket({ id })}`);

            if (result.code >= 400) {
                return {
                    error: result.data.Message ?? "Unknown error",
                    code: (result.code) as any
                };
            }

            return {
                success: true,
                data: result.data
            };
        } catch (error: any) {
            if (this.options.debug) {
                console.error(error);
            }
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }



    private async Request(method: string, path: string, body?: any) {
        const response = await axios({
            method: method,
            url: `https://api.bunny.net/${path}`,
            headers: {
                "AccessKey": this.AccessKey,
                "Content-Type": "application/json"
            },
            ...(body ? { body } : {})
        });

        return {
            data: response.data,
            code: response.status
        };
    }
}