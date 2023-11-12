interface Region {
    Id: number,
    Name: string,
    PricePerGigabyte: number,
    RegionCode: string,
    ContinentCode: string,
    CountryCode: string,
    Latitude: number,
    Longitude: number,
    AllowLatencyRouting: boolean
};
export default Region;