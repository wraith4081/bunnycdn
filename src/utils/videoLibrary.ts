import { HexColorRegex } from './regex';
import { isValidURL } from './validator';

export enum Resolutions {
	'240p' = '240p',
	'360p' = '360p',
	'480p' = '480p',
	'720p' = '720p',
	'1080p' = '1080p',
	'1440p' = '1440p',
	'2160p' = '2160p',
}

export const ResolutionsArray = Object.values(Resolutions);

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

type TypeMapping = {
	[FieldTypes.STRING]: string;
	[FieldTypes.NUMBER]: number;
	[FieldTypes.BOOLEAN]: boolean;
	[FieldTypes.ANY]: any;
	[FieldTypes.STRING_ARRAY]: string[];
	[FieldTypes.NUMBER_ARRAY]: number[];
	[FieldTypes.BOOLEAN_ARRAY]: boolean[];
	[FieldTypes.ANY_ARRAY]: any[];
};

type ConfigField<T extends FieldTypes> = {
	name: string;
	optional: boolean;
	type: T;
	validate?: (value: TypeMapping[T]) => boolean;
};

// TODO: Implement EnableTokenIPVerification, ResetToken

export const videoLibraryConfigFields: ConfigField<FieldTypes>[] = [
	{
		name: 'Name',
		optional: false,
		type: FieldTypes.STRING,
		validate: (value) => value.length > 0,
	},
	{
		name: 'WatermarkPositionLeft',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0 && value <= 100,
	},
	{
		name: 'WatermarkPositionTop',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0 && value <= 100,
	},
	{
		name: 'WatermarkWidth',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0 && value <= 100,
	},
	{
		name: 'WatermarkHeight',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0 && value <= 100,
	},
	{
		name: 'EnabledResolutions',
		optional: false,
		type: FieldTypes.STRING_ARRAY,
		validate: (value) =>
			value.every((v: string) =>
				ResolutionsArray.includes(v as Resolutions)
			),
	},
	{
		name: 'Bitrate240p',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0,
	},
	{
		name: 'Bitrate360p',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0,
	},
	{
		name: 'Bitrate480p',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0,
	},
	{
		name: 'Bitrate720p',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0,
	},
	{
		name: 'Bitrate1080p',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0,
	},
	{
		name: 'Bitrate1440p',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0,
	},
	{
		name: 'Bitrate2160p',
		optional: false,
		type: FieldTypes.NUMBER,
		validate: (value) => !isNaN(value) && value >= 0,
	},
	{
		name: 'UILanguage',
		optional: false,
		type: FieldTypes.STRING,
		validate: (value) =>
			[/^[a-z]{2}$/, /^[A-Z]{2}$/, /^[a-z]{2}-[A-Z]{2}$/].some((regex) =>
				regex.test(value)
			),
	},
	{
		name: 'AllowEarlyPlay',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'EnableTokenAuthentication',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'EnableMP4Fallback',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'KeepOriginalFiles',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'AllowDirectPlay',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'ShowHeatmap',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{ name: 'Controls', optional: false, type: FieldTypes.STRING },
	{
		name: 'PlayerKeyColor',
		optional: false,
		type: FieldTypes.STRING,
		validate: (value) => HexColorRegex.test(value),
	},
	{ name: 'FontFamily', optional: false, type: FieldTypes.STRING },
	{
		name: 'CustomHTML',
		optional: true,
		type: FieldTypes.STRING,
		validate: (value) => value.length > 0,
	},
	{ name: 'CaptionsFontSize', optional: false, type: FieldTypes.NUMBER },
	{ name: 'CaptionsFontColor', optional: false, type: FieldTypes.STRING },
	{ name: 'CaptionsBackground', optional: false, type: FieldTypes.STRING },
	{
		name: 'BlockNoneReferrer',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'EnableDRM',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'EnableContentTagging',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'EnableTranscribing',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'EnableTranscribingTitleGeneration',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'EnableTranscribingDescriptionGeneration',
		optional: false,
		type: FieldTypes.BOOLEAN,
		validate: (value) => !!value === value,
	},
	{
		name: 'TranscribingCaptionLanguages',
		optional: false,
		type: FieldTypes.STRING_ARRAY,
	},
	{ name: 'ViAiPublisherId', optional: false, type: FieldTypes.NUMBER },
	{
		name: 'VastTagUrl',
		optional: true,
		type: FieldTypes.STRING,
		validate: isValidURL,
	},
	{
		name: 'WebhookUrl',
		optional: true,
		type: FieldTypes.STRING,
		validate: isValidURL,
	},
];
