
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
  ['country abbreviation']: string,
  places: Place[]
}

export type InputProps = {
  reset: boolean;
  country: Country;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}