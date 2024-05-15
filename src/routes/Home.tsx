import { useState } from 'react';
import axios, { AxiosError } from 'axios';
// import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Result from '../components/Result';
import { ArrowRight, HelpCircle } from 'react-feather';

import { Country, Data } from '../types';


const Home = () => {

  const baseUrl = 'https://api.zippopotam.us/';

  const countries = [
    { name: 'United States', code: 'us', range: '00210 : 99950' },
    { name: 'Germany', code: 'de', range: '01067 : 99998' },
    { name: 'Spain', code: 'es', range: '01001 : 52080' },
    { name: 'Italy', code: 'it', range: '00100 : 98168' },
    { name: 'Hungary', code: 'hu', range: '1011 : 9985' },
    { name: 'India', code: 'in', range: '110001 : 999999' }
  ];

  const [country, setCountry] = useState({} as Country)
  const selected = typeof country.name === 'undefined' ? true : false;
	
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
    if (input.length !== sampleCode.length) {
      console.log('invalid length');
      return false
    } else {
      return true
    }
  }


  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedCountry = countries.find(c => c.code === e.target.value)
    setCountry(selectedCountry as Country)
    setQueryChanged('')
  }


	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
	}


  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    checkLength(query)
    if (query === queryChanged) return

    if (!isNumericString(query) || !checkLength(query)) {
      alert('enter a valid zip code or check the range of the selected country')
      return
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
		<div className='sm:p-10 p-4'>

      <div className='flex flex-col gap-4 max-w-[600px] mb-20 border border-zinc-300 bg-zinc-100 rounded-xl p-4'>
        <h3 className=''> select a country first </h3>

        <select
          className='border border-zinc-300 rounded-md p-1 mb-6'
          value={country.name}
          onChange={(e) => handleCountry(e)}
        >
          <option value={country.name}> {country.name} </option>
          {deselectedCountries.map((c, i) => <option key={i} value={c.code}> {c.name} </option>)}
        </select>

        <div className={`${selected ? 'hidden' : 'block'} text-sm flex items-center`}>
          <HelpCircle className='h-4 stroke-[#555] mr-1'/>
          <i>zip code range: {country.range}</i>
        </div>

        <form className={`${selected ? 'opacity-50' : 'opacity-100'} flex items-center gap-3 h-10`} onSubmit={handleSubmit}>
          <input
            className='border border-zinc-300 rounded-md px-2 py-1 h-full w-full'
            disabled={selected ? true : false}
            type="text" name="search"
            placeholder='enter a zip-code'
            onChange={handleChange}
          />
          <button
            disabled={selected ? true : false}
            className='h-full w-12 flex justify-center items-center rounded-md bg-gradient-to-r from-indigo-300 to-emerald-300'
            type="submit"
          >
            <ArrowRight className='h-6 w-6 stroke-[1.5] stroke-[#333]'/>
          </button>
        </form>

      </div>

			{ loading ? <Loader /> : <Result data={data} error={error}/> }

		</div>
	)
}

export default Home