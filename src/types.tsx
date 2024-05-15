
export type Country = {
  name: string,
  code: string,
  range: string
}

export type Place = {
  ['place name']: string,
  latitude: string,
  longitude: string,
  state: string,
  ['state abbreviation']: string,
}

export type Data = {
  country: string,
  countryAbbreviation: string,
  places: Place[]
}
