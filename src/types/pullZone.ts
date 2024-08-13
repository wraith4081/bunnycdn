interface BasicInfo {
	Id: number;
	Name: string;
	OriginUrl: string;
	Enabled: boolean;
	Suspended: boolean;
	Type: number;
	UserId: string;
}

interface Hostname {
	Id: number;
	Value: string;
	ForceSSL: boolean;
	IsSystemHostname: boolean;
	HasCertificate: boolean;
	Certificate: any;
	CertificateKey: string | null;
}

interface ZoneAndSecurity {
	StorageZoneId: number;
	EdgeScriptId: number;
	EdgeScriptExecutionPhase: number;
	MiddlewareScriptId: string | null;
	MagicContainersAppId: string | null;
	MagicContainersEndpointId: string | null;
	ZoneSecurityEnabled: boolean;
	ZoneSecurityKey: string;
	ZoneSecurityIncludeHashRemoteIP: boolean;
}

interface GeoAndAccessControl {
	EnableGeoZoneUS: boolean;
	EnableGeoZoneEU: boolean;
	EnableGeoZoneASIA: boolean;
	EnableGeoZoneSA: boolean;
	EnableGeoZoneAF: boolean;
	AllowedReferrers: string[];
	BlockedReferrers: string[];
	BlockedIps: string[];
	BlockedCountries: string[];
	BudgetRedirectedCountries: string[];
	AccessControlOriginHeaderExtensions: string[];
	EnableAccessControlOriginHeader: boolean;
	BlockRootPathAccess: boolean;
	BlockPostRequests: boolean;
	BlockNoneReferrer: boolean;
}

interface GeoAndAccessControl {
	EnableGeoZoneUS: boolean;
	EnableGeoZoneEU: boolean;
	EnableGeoZoneASIA: boolean;
	EnableGeoZoneSA: boolean;
	EnableGeoZoneAF: boolean;
	AllowedReferrers: string[];
	BlockedReferrers: string[];
	BlockedIps: string[];
	BlockedCountries: string[];
	BudgetRedirectedCountries: string[];
	AccessControlOriginHeaderExtensions: string[];
	EnableAccessControlOriginHeader: boolean;
	BlockRootPathAccess: boolean;
	BlockPostRequests: boolean;
	BlockNoneReferrer: boolean;
}

interface BandwidthAndLimits {
	MonthlyBandwidthLimit: number;
	MonthlyBandwidthUsed: number;
	MonthlyCharges: number;
	BurstSize: number;
	RequestLimit: number;
	LimitRatePerSecond: number;
	LimitRateAfter: number;
	ConnectionLimitPerIPCount: number;
	PriceOverride: number;
}

interface CachingAndOrigin {
	IgnoreQueryStrings: boolean;
	AddHostHeader: boolean;
	OriginHostHeader: string;
	DisableCookies: boolean;
	EnableOriginShield: boolean;
	CacheControlMaxAgeOverride: number;
	CacheControlPublicMaxAgeOverride: number;
	EnableCacheSlice: boolean;
	EnableSmartCache: boolean;
	FollowRedirects: boolean;
	UseStaleWhileUpdating: boolean;
	UseStaleWhileOffline: boolean;
	CacheErrorResponses: boolean;
	UseBackgroundUpdate: boolean;
	EnableQueryStringOrdering: boolean;
	CacheVersion: number;
}

interface Optimization {
	OptimizerEnabled: boolean;
	OptimizerDesktopMaxWidth: number;
	OptimizerMobileMaxWidth: number;
	OptimizerImageQuality: number;
	OptimizerMobileImageQuality: number;
	OptimizerEnableWebP: boolean;
	OptimizerEnableManipulationEngine: boolean;
	OptimizerMinifyCSS: boolean;
	OptimizerMinifyJavaScript: boolean;
	OptimizerWatermarkEnabled: boolean;
	OptimizerWatermarkUrl: string;
	OptimizerWatermarkPosition: number;
	OptimizerWatermarkOffset: number;
	OptimizerWatermarkMinImageSize: number;
	OptimizerAutomaticOptimizationEnabled: boolean;
	OptimizerClasses: any[];
	OptimizerForceClasses: boolean;
	OptimizerStaticHtmlEnabled: boolean;
	OptimizerStaticHtmlWordPressPath: string | null;
	OptimizerStaticHtmlWordPressBypassCookie: string | null;
}

interface LoggingAndForwarding {
	EnableLogging: boolean;
	LoggingIPAnonymizationEnabled: boolean;
	LogForwardingEnabled: boolean;
	LogForwardingHostname: string | null;
	LogForwardingPort: number;
	LogForwardingToken: string | null;
	LogForwardingProtocol: number;
	LoggingSaveToStorage: boolean;
	LoggingStorageZoneId: number;
	LogAnonymizationType: number;
	LogFormat: number;
	LogForwardingFormat: number;
}

interface SSLAndSecurity {
	EnableTLS1: boolean;
	EnableTLS1_1: boolean;
	VerifyOriginSSL: boolean;
	AWSSigningEnabled: boolean;
	AWSSigningKey: string | null;
	AWSSigningSecret: string | null;
	AWSSigningRegionName: string | null;
	EnableAutoSSL: boolean;
	DisableLetsEncrypt: boolean;
}

interface ErrorHandling {
	ErrorPageEnableCustomCode: boolean;
	ErrorPageCustomCode: any | null;
	ErrorPageEnableStatuspageWidget: boolean;
	ErrorPageStatuspageCode: any | null;
	ErrorPageWhitelabel: boolean;
}

interface Miscellaneous {
	EdgeRules: any[];
	EnableWebPVary: boolean;
	EnableAvifVary: boolean;
	EnableCountryCodeVary: boolean;
	EnableMobileVary: boolean;
	EnableCookieVary: boolean;
	CookieVaryParameters: any[];
	EnableHostnameVary: boolean;
	CnameDomain: string;
	VideoLibraryId: number;
	DnsRecordId: number;
	DnsZoneId: number;
	DnsRecordValue: any | null;
	PermaCacheStorageZoneId: number;
	PermaCacheType: number;
	QueryStringVaryParameters: any[];
	EnableSafeHop: boolean;
	ShieldDDosProtectionType: number;
	ShieldDDosProtectionEnabled: boolean;
	OriginType: number;
	OriginLinkValue: string;
	EnableBunnyImageAi: boolean;
	BunnyAiImageBlueprints: {
		Name: string;
		Properties: {
			PrePrompt: string;
			PostPrompt: string;
		};
	}[];
	RoutingFilters: string[];
	StickySessionType: number;
	StickySessionCookieName: string | null;
	StickySessionClientHeaders: string | null;
}

interface OriginShield {
	OriginShieldZoneCode: string;
	OriginShieldEnableConcurrencyLimit: boolean;
	OriginShieldMaxConcurrentRequests: number;
	OriginShieldQueueMaxWaitTime: number;
	OriginShieldMaxQueuedRequests: number;
}

interface OriginConfiguration {
	OriginRetries: number;
	OriginConnectTimeout: number;
	OriginResponseTimeout: number;
	OriginRetry5XXResponses: boolean;
	OriginRetryConnectionTimeout: boolean;
	OriginRetryResponseTimeout: boolean;
	OriginRetryDelay: number;
	EnableRequestCoalescing: boolean;
	RequestCoalescingTimeout: number;
}

interface PreloadingScreen {
	PreloadingScreenEnabled: boolean;
	PreloadingScreenShowOnFirstVisit: boolean;
	PreloadingScreenCode: string;
	PreloadingScreenLogoUrl: null;
	PreloadingScreenCodeEnabled: boolean;
	PreloadingScreenTheme: number;
	PreloadingScreenDelay: number;
}

interface Pricing {
	EUUSDiscount: number;
	SouthAmericaDiscount: number;
	AfricaDiscount: number;
	AsiaOceaniaDiscount: number;
}

export interface StoragePullZone
	extends BasicInfo,
		ZoneAndSecurity,
		GeoAndAccessControl,
		BandwidthAndLimits,
		CachingAndOrigin,
		Optimization,
		LoggingAndForwarding,
		SSLAndSecurity,
		ErrorHandling,
		Miscellaneous,
		OriginShield,
		OriginConfiguration,
		PreloadingScreen,
		Pricing {
	Hostnames: Hostname[];
}
