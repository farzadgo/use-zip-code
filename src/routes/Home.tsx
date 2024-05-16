import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Input from '../components/Input';
import InputMask from '../components/InputMask';
import Loader from '../components/Loader';
import Result from '../components/Result';

import { Country, Data } from '../types';


const Home = () => {

  const baseUrl = 'https://api.zippopotam.us/';

  const countries = [
    { name: 'United States', code: 'us', range: '00210 : 99950' },
    { name: 'Germany', code: 'de', range: '01067 : 99998' },
    { name: 'Spain', code: 'es', range: '01001 : 52080' },
    { name: 'Italy', code: 'it', range: '00100 : 98168' },
    { name: 'Hungary', code: 'hu', range: '1011 : 9985' },
    { name: 'Brazil', code: 'br', range: '01000-000 : 99990-000' },
    { name: 'Luxembourg', code: 'lu', range: 'L-1000 : L-9999' },
    { name: 'India', code: 'in', range: '110001 : 999999' }
  ];

  const [country, setCountry] = useState({} as Country)
  const selected = typeof country.name === 'undefined' ? false : true;

  const [query, setQuery] = useState('')
  const [queryChanged, setQueryChanged] = useState('')

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({} as Data)
  const [error, setError] = useState({} as AxiosError)

  const deselectedCountries = countries.filter(c => c.name !== country.name)

  const isNumericString = (input: string): boolean => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(input);
  }


  const checkLength = (input: string): boolean => {
    let sampleCode = country.range.split(' : ')[0]
    let test = input.length !== sampleCode.length ? false : true;
    return test
  }


  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedCountry = countries.find(c => c.code === e.target.value)
    setCountry(selectedCountry as Country)
    setQueryChanged('')
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }


  const handleSubmit = (event: { preventDefault: () => void; }, flag: string) => {
    event.preventDefault()
    
    if (query === queryChanged) return

    if (flag === 'nomask') {
      if (!isNumericString(query) || !checkLength(query)) {
        alert('enter a valid zip code or check the range of the selected country')
        return
      }
    }
    
    if (error) setError({} as AxiosError)
    if (data) setData({} as Data)
    if (query) {
      setLoading(true)
      fetchData(query)
    }
    setQueryChanged(query)
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
  

  return (
    <div className='sm:p-10 px-4 py-10'>

      <div className='flex flex-col gap-4 max-w-[600px] mb-10 border border-zinc-300 bg-zinc-100 rounded-xl p-4'>
        <h3 className=''> select a country first </h3>

        <select
          className='border border-zinc-300 rounded-md p-1 mb-6'
          value={country.name}
          onChange={(e) => handleCountry(e)}
        >
          <option value={country.name}> {country.name} </option>
          {deselectedCountries.map((c, i) => <option key={i} value={c.code}> {c.name} </option>)}
        </select>

        <Input selected={selected} country={country} handleChange={handleChange} handleSubmit={handleSubmit}/>
        <InputMask selected={selected} country={country} handleChange={handleChange} handleSubmit={handleSubmit}/>

      </div>

      { loading ? <Loader /> : <Result data={data} error={error}/> }

    </div>
  )
}

export default Home