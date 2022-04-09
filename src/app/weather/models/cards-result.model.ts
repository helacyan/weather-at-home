export interface ILocation {
  Version: number,
  Key: string,
  Type: string,
  Rank: number,
  LocalizedName: string,
  Country: ICountry,
  AdministrativeArea: ICountry,
}

interface ICountry {
  ID: string,
  LocalizedName: string,
}

export interface IWeather {
  cityName: string,
  weatherIcon: string,
  temperature: number,
  precipitation: string,
  key: string,
}

export interface IFullWeather {
  DateTime: string,
  EpochDateTime: number,
  WeatherIcon: number,
  IconPhrase: string,
  HasPrecipitation: boolean,
  IsDaylight: boolean,
  Temperature: ITemperature,
  PrecipitationProbability: number,
  MobileLink: string,
  Link: string,
}

interface ITemperature {
  Value: number,
  Unit: string,
  UnitType: number,
}

export interface ICityFullResponse {
  Version: number,
  Key: string,
  Type: string,
  Rank: number,
  LocalizedName: string,
  EnglishName: string,
  PrimaryPostalCode: string,
  Region: IRegion,
  Country: IRegion,
  AdministrativeArea: IAdministrativeArea,
  TimeZone: ITimeZone,
  GeoPosition: IGeoPosition,
  IsAlias: boolean,
  SupplementalAdminAreas: any[],
  DataSets: Array<string>
}

interface IRegion {
  ID: string,
  LocalizedName: string,
  EnglishName: string,
}

interface IAdministrativeArea {
  ID: string,
  LocalizedName: string,
  EnglishName: string,
  Level: number,
  LocalizedType: string,
  EnglishType: string,
  CountryID: string,
}

interface ITimeZone {
  Code: string,
  Name: string,
  GmtOffset: number,
  IsDaylightSaving: boolean,
  NextOffsetChange: any
}

interface IGeoPosition {
  Latitude: number,
  Longitude: number,
  Elevation: {
    Metric: IMetric,
    Imperial: IMetric
  }
}

interface IMetric {
  Value: number,
  Unit: string,
  UnitType: number
}
