export type PaginationOptions = {
    page: number;
    limit: number;
};

type ChainablePagination<T, U> = {
    limit: (limit: number) => ChainablePagination<T, U>;
    page: (page: number) => ChainablePagination<T, U>;
    then: <TResult1 = U, TResult2 = never>(
        onfulfilled?: ((value: U) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
    ) => Promise<TResult1 | TResult2>;
};

type PaginatedFunction<T, U> = {
    (data: T, options: PaginationOptions): Promise<U>;
    (data: T): ChainablePagination<T, U>;
};

export type PaginatedResult<T> = {
    Items: T;
    CurrentPage: number;
    TotalItems: number;
    HasMoreItems: boolean;
}

export default function withPagination<T, U>(
    fn: (data: T, options: PaginationOptions) => Promise<U>
): {
    (data: T, options: PaginationOptions): Promise<U>;
    (data: T): ChainablePagination<T, U>;
} {
    return function (data: T, options?: PaginationOptions): Promise<U> | ChainablePagination<T, U> {
        if (options) return fn(data, options);

        const state: PaginationOptions = { page: 1, limit: 10};

        const chainable: ChainablePagination<T, U> = Object.assign(
            {
                limit: (limit: number) => {
                    state.limit = limit;
                    return chainable;
                },
                page: (page: number) => {
                    state.page = page;
                    return chainable;
                },
                then: (onfulfilled: any, onrejected: any) => fn(data, state).then(onfulfilled, onrejected)
            }
        );

        return chainable;
    } as PaginatedFunction<T, U>;
}