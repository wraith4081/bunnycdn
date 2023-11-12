import axios from "axios";
import { ContentTooLarge, InternalServerError, LocalError, NotFound, Success, Unauthorized } from "../types/Result";
import type { EditableStreamVideoLibrary, default as IStreamVideoLibrary } from "../types/StreamVideoLibrary";

import fs from "fs";
import FormData from "form-data";

export default class StreamVideoLibrary {
    private data: IStreamVideoLibrary;

    constructor(data: IStreamVideoLibrary) {
        this.data = data;
    }

    public async Update(
        data: Partial<EditableStreamVideoLibrary>
    ): Promise<(
        Success<StreamVideoLibrary> |
        NotFound | Unauthorized |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("POST", `/videolibrary/${this.data.Id}`);

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
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async Delete(): Promise<(
        Success<StreamVideoLibrary> |
        NotFound | Unauthorized |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("POST", `/videolibrary/${this.data.Id}`);

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
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async ResetAPIKey(): Promise<(
        Success<undefined> |
        Unauthorized | NotFound |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("GET", `/videolibrary/${this.data.Id}/resetApiKey`);

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
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async AddWatermark(
        image: Buffer | fs.ReadStream
    ): Promise<(
        Success<undefined> |
        Unauthorized | NotFound | ContentTooLarge |
        InternalServerError | LocalError
    )> {
        try {
            const form = new FormData();
            form.append("image", image);
            const result = await this.Request("PUT", `/videolibrary/${this.data.Id}/watermark`, {
                headers: form.getHeaders(),
                data: form
            });

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
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async DeleteWatermark(): Promise<(
        Success<undefined> |
        Unauthorized | NotFound | ContentTooLarge |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("DELETE", `/videolibrary/${this.data.Id}/watermark`);

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
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async AddAllowedReferer(
        hostname: string
    ): Promise<(
        Success<undefined> |
        Unauthorized | NotFound |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("POST", `/videolibrary/${this.data.Id}/addAllowedReferrer`, {
                body: { Hostname: hostname }
            });

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
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async RemoveAllowedReferer(
        hostname: string
    ): Promise<(
        Success<undefined> |
        Unauthorized | NotFound |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("POST", `/videolibrary/${this.data.Id}/removeAllowedReferrer`, {
                body: { Hostname: hostname }
            });

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
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async AddBlockedReferer(
        hostname: string
    ): Promise<(
        Success<undefined> |
        Unauthorized | NotFound |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("POST", `/videolibrary/${this.data.Id}/addBlockedReferrer`, {
                body: { Hostname: hostname }
            });

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
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    public async RemoveBlockedReferer(
        hostname: string
    ): Promise<(
        Success<undefined> |
        Unauthorized | NotFound |
        InternalServerError | LocalError
    )> {
        try {
            const result = await this.Request("POST", `/videolibrary/${this.data.Id}/removeBlockedReferrer`, {
                body: { Hostname: hostname }
            });

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
            return {
                error: error.response?.data?.Message ?? "Unknown error",
                code: error.response?.status ?? 0
            };
        }
    }

    private async Request(method: string, path: string, options: {
        body?: any,
        data?: any,
        headers?: any
    } = {}) {
        const response = await axios({
            method: method,
            url: `https://api.bunny.net/${path}`,
            headers: {
                "AccessKey": this.data.ApiKey,
                "Content-Type": "application/json",
                ...(options?.headers ?? {})
            },
            ...(options?.body ? { body: options?.body } : {}),
            ...(options?.data ? { data: options?.data } : {})
        });

        return {
            data: response.data,
            code: response.status
        };
    }
}