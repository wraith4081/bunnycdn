export const isValidURL = (url: string) => {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
};
export enum FieldTypes {
	STRING = 'string',
	NUMBER = 'number',
	BOOLEAN = 'boolean',
	ANY = 'any',
	STRING_ARRAY = 'string[]',
	NUMBER_ARRAY = 'number[]',
	BOOLEAN_ARRAY = 'boolean[]',
	ANY_ARRAY = 'any[]',
}

export type TypeMapping = {
	[FieldTypes.STRING]: string;
	[FieldTypes.NUMBER]: number;
	[FieldTypes.BOOLEAN]: boolean;
	[FieldTypes.ANY]: any;
	[FieldTypes.STRING_ARRAY]: string[];
	[FieldTypes.NUMBER_ARRAY]: number[];
	[FieldTypes.BOOLEAN_ARRAY]: boolean[];
	[FieldTypes.ANY_ARRAY]: any[];
};

export type ConfigField<T extends FieldTypes> = {
	name: string;
	optional: boolean;
	type: T;
	validate?: (value: TypeMapping[T]) => boolean;
};
