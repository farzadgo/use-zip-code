import { HelpCircle, ArrowRight } from 'react-feather';
import { InputProps } from '../types';


const Input = ({selected, country, handleChange, handleSubmit}: InputProps) => {

  const exception = country.code === 'br' || country.code === 'lu' ? true : false;
  const active = selected && !exception ? true : false;

  return (
    <>
      <div className={`${active ? 'block' : 'hidden'} text-sm flex items-center`}>
        <HelpCircle className='h-4 stroke-[#555] mr-1'/>
        <i>zip code range: {country.range}</i>
      </div>
  
      <form className={`${active ? 'opacity-100' : 'opacity-50'} flex items-center gap-3 h-10 mb-10`} onSubmit={e => handleSubmit(e, 'nomask')}>
        <input
          className='border border-zinc-300 rounded-md px-2 py-1 h-full w-full'
          disabled={active ? false : true}
          type="text"
          name="search"
          placeholder='enter a zip-code'
          onChange={handleChange}
        />
        <button
          disabled={active ? false : true}
          className='h-full w-10 flex flex-shrink-0 justify-center items-center rounded-md bg-gradient-to-r from-indigo-300 to-emerald-300'
          type="submit"
        >
          <ArrowRight className='h-6 w-6 stroke-[1.5] stroke-[#333]'/>
        </button>
    </form>
    </>
  )
}

export default Input