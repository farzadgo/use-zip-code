import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Input from '../components/Input';
import Loader from '../components/Loader';
import Result from '../components/Result';

import { Country, Data } from '../types';


const Home = () => {

  const baseUrl = 'https://api.zippopotam.us/';

  const countries = [
    { name: 'Brazil', code: 'br', range: '01000-000 : 99990-000' },
    { name: 'Germany', code: 'de', range: '01067 : 99998' },
    { name: 'Hungary', code: 'hu', range: '1011 : 9985' },
    { name: 'India', code: 'in', range: '110001 : 999999' },
    { name: 'Italy', code: 'it', range: '00100 : 98168' },
    { name: 'Luxembourg', code: 'lu', range: 'L-1000 : L-9999' },
    { name: 'Spain', code: 'es', range: '01001 : 52080' },
    { name: 'United States', code: 'us', range: '00210 : 99950' },
  ];

  const [country, setCountry] = useState(countries[0] as Country)
  // const selected = typeof country.name !== 'undefined';
  const [reset, setReset] = useState(true);

  const [query, setQuery] = useState('')
  const [queryChanged, setQueryChanged] = useState('')

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({} as Data)
  const [error, setError] = useState({} as AxiosError)


  const handleCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedCountry = countries.find(c => c.code === event.target.value)
    setCountry(selectedCountry as Country)
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();    
    if (query === queryChanged) return;
    
    setReset(false);
    if (error) setError({} as AxiosError);
    if (data) setData({} as Data);

    if (query) {
      setLoading(true);
      fetchData(query);
    }
    setQueryChanged(query);
  }


  const fetchData = async (query: string) => {
    try {
      const result = await axios(`${baseUrl}${country.code}/${query}`)
      setData(result.data)
      setLoading(false)
    } catch (error) {
      setError(error as AxiosError)
      setLoading(false)
    }
  }

  useEffect(() => {
    setQuery('')
    setQueryChanged('')
    setReset(true)
  }, [country])
  

  return (
    <div className='px-4 py-16 text-xl text-zinc-700'>

      <div className='flex flex-col gap-4 max-w-[600px] mb-10 border border-zinc-300 bg-zinc-100 rounded-xl p-4 mx-auto'>
        <h3 className='text-lg'> select a country to look for a zip code </h3>

        <select
          className='border border-zinc-300 rounded-md p-1 mb-6 h-12'
          onChange={(handleCountry)}
        >
          {countries.map((country, i) => <option key={i} value={country.code}> {country.name} </option>)}
        </select>

        <Input
          reset={reset}
          country={country}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>     

      {!reset && <>{ loading ? <Loader /> : <Result data={data} error={error}/> }</>}

    </div>
  )
}

export default Home