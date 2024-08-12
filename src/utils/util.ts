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
