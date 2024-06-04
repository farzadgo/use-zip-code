import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Data } from '../types';


const Result = ({ data, error }: { data: Data, error: AxiosError }) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [showPlaces, setShowPlaces] = useState(false)

  useEffect(() => {
    if (Object.keys(error).length) {
      setErrorMessage(error.message)
    }
    
    Object.keys(data).length > 0 ? setShowPlaces(true) : setShowPlaces(false)

  }, [])
  

  return (
    <div className={`${showPlaces || errorMessage ? 'flex' : 'hidden'} flex-col gap-4 max-w-screen-sm mb-20 bg-gradient-to-r from-indigo-300 from-10% via-sky-200 via-30% to-emerald-300 to-90% rounded-xl py-6 px-4 mx-auto`}>
      { errorMessage && <div>
        <p className='font-bold mb-6'>zipCode not available 😥</p>
        <p className='text-sm'><code>{errorMessage}</code></p>
      </div> }

      { showPlaces && <>
        <h1> <i className='text-sm'>zipPlace ⟶</i> {data.places[0]['place name']} </h1>
        <h2> <i className='text-sm'>zipState ⟶</i> {data.places[0].state} &#40;{data.places[0]['state abbreviation']}&#41; </h2>
        <h3> <i className='text-sm'>zipCountry ⟶</i> {data.country} </h3>
        <div>
          <i className='text-sm'>zipLocation ⟶</i> {data.places[0].latitude}, {data.places[0].longitude}
        </div>
      </> }
    </div>
  )
}

export default Result