import { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { ArrowRight } from 'react-feather';
import Container from '../components/Container';
import InputContainer from '../components/InputContainer';
import Loader from '../components/Loader';
import { State } from '../types';

const baseUrl = 'https://api.zippopotam.us/de';

const states: State[] = [
  { name: 'Baden-Württemberg', abbreviation: 'BW' },
  { name: 'Bayern (Bavaria)', abbreviation: 'BY' },
  { name: 'Berlin', abbreviation: 'BE' },
  { name: 'Brandenburg', abbreviation: 'BB' },
  { name: 'Bremen', abbreviation: 'HB' },
  { name: 'Hamburg', abbreviation: 'HH' },
  { name: 'Hessen (Hesse)', abbreviation: 'HE' },
  { name: 'Mecklenburg-Vorpommern', abbreviation: 'MV' },
  { name: 'Niedersachsen (Lower Saxony)', abbreviation: 'NI' },
  { name: 'Nordrhein-Westfalen (North Rhine-Westphalia)', abbreviation: 'NW' },
  { name: 'Rheinland-Pfalz (Rhineland-Palatinate)', abbreviation: 'RP' },
  { name: 'Saarland', abbreviation: 'SL' },
  { name: 'Sachsen (Saxony)', abbreviation: 'SN' },
  { name: 'Sachsen-Anhalt (Saxony-Anhalt)', abbreviation: 'ST' },
  { name: 'Schleswig-Holstein', abbreviation: 'SH' },
  { name: 'Thüringen (Thuringia)', abbreviation: 'TH' },
];


const Cities = () => {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState('' as string);
  const [state, setState] = useState('BW' as string);

  const [places, setPlaces] = useState([] as any[]);
  const [placeNames, setPlaceNames] = useState([] as string[]);

  const [reset, setReset] = useState(true);
  const [selected, setSelected] = useState(false as boolean);

  const [loading, setLoading] = useState(false as boolean);
  const [data, setData] = useState({} as any)
  const [error, setError] = useState({} as AxiosError)


  const handleSuggestion = (city: string) => {
    setQuery(city);
    setSelected(true);
  }

  const handleState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaceNames([] as string[]);
    setQuery('');
    setState(event.target.value);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelected(false);
    if (e.target.value) {
      fetchPlaces(e.target.value);
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setError({} as AxiosError);
    setData({} as any);

    if (query) {
      setLoading(true);
      fetchData();
    }

    setReset(false);
    setQuery('');
    setPlaceNames([] as string[]);
    setSelected(false);
  }


  const fetchPlaces = async (city: string) => {
    const result = await axios(`${baseUrl}/${state}/${city}`)
    setPlaces(result.data.places)
  }

  const fetchData = async () => {
    try {
      const result = await axios(`${baseUrl}/${state}/${query}`)
      setData(result.data)
      setLoading(false)
    } catch (error) {
      setError(error as AxiosError)
      setLoading(false)
    }
  }


  useEffect(() => {
    if (inputRef.current && selected) {
      inputRef.current.focus();
    }
  }, [selected])


  useEffect(() => {
    if (query === '') {
      setPlaceNames([] as string[]);
    } else {
      if (places.length > 0) {
        let searchItem = query.toLowerCase();
        let matchingPlaces = places.filter((place) => place['place name'].toLowerCase().startsWith(searchItem));
        let placeNames = matchingPlaces.map((place) => place['place name']);
        let matchingPlaceNames = placeNames.filter((place, index, self) => index === self.findIndex((t) => t === place));
        setPlaceNames(matchingPlaceNames)
      }
    }
  }, [places, query])


  useEffect(() => {
    setQuery('');
    setPlaceNames([] as string[]);
    setReset(true);
  }, [state])
  

  return (
    <Container>
      <InputContainer title="zip locations in Germany by city">

        <form className='flex flex-col sm:flex-row items-center gap-3' onSubmit={handleSubmit}>
          <select
            className='border border-zinc-300 rounded-md p-1 h-12 w-full'
            onChange={handleState}
          >
            {states.map((state, i) => <option key={i} value={state.abbreviation}> {state.name} </option>)}
          </select>

          <div className='flex h-12 w-full'>
            <input
              className='border border-zinc-300 rounded-md px-2 py-1 h-full w-full flex-grow'
              type='text'
              placeholder='e.g. berlin, ham...'
              value={query} onChange={onChange} ref={inputRef}
            />
  
            <button
              disabled={!selected}
              className={`${selected ? 'opacity-100' : 'opacity-50'} h-full w-10 flex flex-shrink-0 justify-center items-center rounded-md`}
              type="submit" >
              <ArrowRight className='h-6 w-6 stroke-[1.5] stroke-[#333]'/>
            </button>
          </div>
        </form>
  
        {placeNames.length > 0 && 
          <div className='text-base flex gap-3 flex-wrap'>
            <p className='flex items-center'> suggestions: </p>
            {placeNames.map((item, index) => 
              <div
                key={index}
                className='text-sm border-2 border-zinc-200 cursor-pointer px-4 py-1 hover:bg-zinc-200 rounded-full whitespace-nowrap'
                onClick={() => handleSuggestion(item)}
                > {item}
              </div>
            )}
          </div>
        }
      </InputContainer>
  
      {!reset && <>{ loading ? <Loader /> : <MyResult data={data} error={error}/>}</>}
    </Container>
  )
}

export default Cities





const MyResult = ({ data, error }: { data: any, error: AxiosError }) => {

  if (Object.keys(error).length) {
    return (
      <div className='flex flex-col gap-4 max-w-screen-sm mb-20 border border-zinc-300 bg-zinc-100 rounded-xl py-6 px-4 mx-auto'>
        <p className='font-bold mb-6'> city not available 😥</p>
        <p className='text-sm'><code>{error.message}</code></p>
      </div>
    )
  }
  
  return (
    <div className='max-w-screen-sm mx-auto border border-zinc-300 bg-zinc-100 rounded-xl p-4'>

      {Object.keys(error).length > 0 && <div> <p> {error.message} </p> </div>}

      {Object.keys(data).length > 0 &&
        <div className='text-lg mb-8 border border-orange-200 p-4 bg-zinc-50 rounded-md'>
          <p> {data.places?.length} places found </p>
          <p> <i> State: </i> <b>{data.state}</b> </p>
          <p> <i> Place Name: </i> <b>{data['place name']}</b> </p>
        </div>
      }

      <ul className='flex flex-col gap-8'>
        {data.places?.map((place: any, index: number) => {
          return (
            <li key={index} className='flex flex-col gap-2 text-sm'>
              <p> <i> Zip Code: </i> <b>{place['post code']}</b> </p>
              {place['place name'] !== data['place name'] && <p> <i> Place Name: </i> <b>{place['place name']}</b> </p>}
              <p> <i> Longitude: </i> {place['longitude']} &nbsp;&nbsp; <i> Latitude: </i> {place['latitude']}</p>
              <p>  </p>
            </li>
          )
        })}
      </ul>

    </div>
  )
}