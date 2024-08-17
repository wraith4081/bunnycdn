export const respond = <T extends any, S extends 'success' | 'error'>(
	status: S,
	data?: T
) => {
	const output = Object.assign(
		{ status },
		typeof data === 'string' ? { message: data } : !data ? {} : data
	);
	return output as { status: S } & (T extends string
		? { message: string }
		: T);
};

export const joinPaths = (base: string, ...paths: string[]) => {
	let url = new URL(base);
	for (const path of paths) {
		url = new URL(path, url);
	}
	return url.toString();
}