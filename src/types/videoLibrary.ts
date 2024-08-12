import VideoLibrary from '../lib/videoLibrary';

// Video Library Configuration
interface VideoLibraryConfig {
	Id: number;
	Name: string; // Editable
	VideoCount: number;
	DateCreated: string;
	ApiKey: string;
	ReadOnlyApiKey: string;
	ApiAccessKey: string;
	PullZoneId: number;
	StorageZoneId: number;
	PullZoneType: string;
}

// Usage Statistics
interface UsageStats {
	TrafficUsage: number;
	StorageUsage: number;
}

// Watermark Settings
interface WatermarkSettings {
	HasWatermark: boolean;
	WatermarkPositionLeft: number; // Editable
	WatermarkPositionTop: number; // Editable
	WatermarkWidth: number; // Editable
	WatermarkHeight: number; // Editable
	WatermarkVersion: number;
}

// Video Resolution Settings
interface ResolutionSettings {
	EnabledResolutions: string[]; // Editable
	Bitrate240p: number; // Editable
	Bitrate360p: number; // Editable
	Bitrate480p: number; // Editable
	Bitrate720p: number; // Editable
	Bitrate1080p: number; // Editable
	Bitrate1440p: number; // Editable
	Bitrate2160p: number; // Editable
}

// Player Settings
interface PlayerSettings {
	UILanguage: string; // Editable
	AllowEarlyPlay: boolean; // Editable
	EnableTokenAuthentication: boolean; // Editable
	EnableMP4Fallback: boolean; // Editable
	KeepOriginalFiles: boolean; // Editable
	AllowDirectPlay: boolean; // Editable
	ShowHeatmap: boolean; // Editable
	Controls: string; // Editable
	PlayerKeyColor: string; // Editable
	FontFamily: string; // Editable
	CustomHTML: string | null; // Editable
	RememberPlayerPosition: boolean;
}

// Caption Settings
interface CaptionSettings {
	CaptionsFontSize: number; // Editable
	CaptionsFontColor: string; // Editable
	CaptionsBackground: string; // Editable
}

// Access Control
interface AccessControl {
	AllowedReferrers: string[];
	BlockedReferrers: string[];
	BlockNoneReferrer: boolean; // Editable
}

// DRM Settings
interface DRMSettings {
	EnableDRM: boolean; // Editable
	DrmVersion: number;
	AppleFairPlayDrm: Object[];
	GoogleWidevineDrm: Object[];
}

// Advanced Features
interface AdvancedFeatures {
	EnableContentTagging: boolean; // Editable
	EnableTranscribing: boolean; // Editable
	EnableTranscribingTitleGeneration: boolean; // Editable
	EnableTranscribingDescriptionGeneration: boolean; // Editable
	TranscribingCaptionLanguages: any[]; // Editable
	EnableMultiAudioTrackSupport: boolean;
	UseSeparateAudioStream: boolean;
	JitEncodingEnabled: boolean;
	EncodingTier: number;
	OutputCodecs: string;
}

// Miscellaneous
interface Miscellaneous {
	ReplicationRegions: any[];
	ViAiPublisherId: number; // Editable
	VastTagUrl: string | null; // Editable
	WebhookUrl: string | null; // Editable
}

// Combined RawVideoLibrary
export interface RawVideoLibrary
	extends VideoLibraryConfig,
		UsageStats,
		WatermarkSettings,
		ResolutionSettings,
		PlayerSettings,
		CaptionSettings,
		AccessControl,
		DRMSettings,
		AdvancedFeatures,
		Miscellaneous {}

export interface EditableVideoLibrary
	extends Pick<VideoLibraryConfig, 'Name'>,
		Pick<
			WatermarkSettings,
			| 'WatermarkPositionLeft'
			| 'WatermarkPositionTop'
			| 'WatermarkWidth'
			| 'WatermarkHeight'
		>,
		ResolutionSettings,
		Omit<PlayerSettings, 'RememberPlayerPosition'>,
		CaptionSettings,
		Pick<AccessControl, 'BlockNoneReferrer'>,
		Pick<DRMSettings, 'EnableDRM'>,
		Pick<
			AdvancedFeatures,
			| 'EnableContentTagging'
			| 'EnableTranscribing'
			| 'EnableTranscribingTitleGeneration'
			| 'EnableTranscribingDescriptionGeneration'
			| 'TranscribingCaptionLanguages'
		>,
		Omit<Miscellaneous, 'ReplicationRegions'> {}

export type GetRequest<T extends any> = (
	url: string,
	expectedStatus?: number | number[]
) => Promise<
	| {
			status: 'success';
			data: T;
	  }
	| {
			status: 'error';
			error: {
				message: string;
				status: number;
			};
	  }
>;

export interface VideoLibraryType {
	data: RawVideoLibrary;
	get: GetRequest<any>;
	attached: boolean;

	constructor(id: number, get: GetRequest<any>): Promise<VideoLibrary>;
	constructor(
		data: RawVideoLibrary,
		get: GetRequest<any>
	): Promise<VideoLibrary>;
}

export interface Language {
	ShortCode: string;
	Name: string;
	SupportPlayerTranslation: boolean;
	SupportTranscribing: boolean;
	TranscribingAccuracy: number;
}
