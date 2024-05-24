import { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { cities } from '../cities_DE';
import { ArrowRight } from 'react-feather';
import Loader from '../components/Loader';

const Cities = () => {

  const baseUrl = 'https://api.zippopotam.us/de/';

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [reset, setReset] = useState(true);
  const [selected, setSelected] = useState(false as boolean);
  
  const [query, setQuery] = useState('' as string);

  const [loading, setLoading] = useState(false as boolean);
  const [data, setData] = useState({} as any)
  const [error, setError] = useState({} as AxiosError)


  const handleSuggestin = (city: string) => {
    setQuery(city);
    setSelected(true);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReset(true);
    setQuery(e.target.value);
    setSelected(false);
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    let city = query;
    let state = cities.find(item => item.city === city)?.state as string;

    setError({} as AxiosError);
    setData({} as any);

    if (city && state) {
      setLoading(true);
      fetchData(city, state);
    }

    setReset(false);
    setQuery('');
    setSelected(false);
  }  

  const fetchData = async (city: string, state: string) => {
    try {
      const result = await axios(`${baseUrl}${state}/${city}`)
      setData(result.data)
      setLoading(false)
    } catch (error) {
      setError(error as AxiosError)
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   console.log(data);
  //   console.log(error);
  // }, [data, error]);

  useEffect(() => {
    if (inputRef.current && selected) {
      inputRef.current.focus();
    }
  }, [selected])
  

  return (
    <div className='px-4 py-16 text-xl text-zinc-700'>

      <div className='flex flex-col gap-4 max-w-[600px] mb-10 border border-zinc-300 bg-zinc-100 rounded-xl p-4 mx-auto'>
        <h3 className=''> zip locations in Germany by city </h3>
  
        <form className='flex items-center gap-3 h-12' onSubmit={handleSubmit}>
          <input
            className='border border-zinc-300 rounded-md px-2 py-1 h-full w-full'
            type='text'
            placeholder='e.g. Berlin, München, ...'
            value={query} onChange={onChange} ref={inputRef}/>
          <button
            disabled={!selected}
            className={`${selected ? 'opacity-100' : 'opacity-50'} h-full w-10 flex flex-shrink-0 justify-center items-center rounded-md`}
            type="submit"
          >
            <ArrowRight className='h-6 w-6 stroke-[1.5] stroke-[#333]'/>
          </button>
        </form>
  
        {!selected && query && <div className='text-base flex gap-2 flex-wrap'>
          <p className='flex items-center'> select one: </p>
          {cities.filter(item => {
            const searchItem = query.toLowerCase();
            const city = item.city.toLowerCase();
            return searchItem && city.startsWith(searchItem);
          }).map((item, index) => {
            return (
              <div
                className='border-2 border-zinc-200 cursor-pointer px-4 py-1 hover:bg-zinc-200 rounded-full whitespace-nowrap'
                key={index}
                onClick={() => handleSuggestin(item.city)}
                > {item.city}
              </div>
            )
          })}
        </div>}
      </div>

      {!reset && <>{ loading ? <Loader /> : <MyResult data={data} error={error}/>}</>}

    </div>
  )
}

export default Cities





const MyResult = ({ data, error }: { data: any, error: AxiosError }) => {

  if (Object.keys(error).length) {
    return (
      <div className='flex flex-col gap-4 max-w-[600px] mb-20 border border-zinc-300 bg-zinc-100 rounded-xl py-6 px-4 mx-auto'>
        <p className='font-bold mb-6'> city not available 😥</p>
        <p className='text-sm'><code>{error.message}</code></p>
      </div>
    )
  }
  
  return (
    <div className='max-w-[600px] mx-auto border border-zinc-300 bg-zinc-100 rounded-xl p-4'>

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