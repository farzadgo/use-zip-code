import { useState, useRef, useEffect } from 'react';
import { HelpCircle, ArrowRight } from 'react-feather';
import { InputProps } from '../types';
import { InputMask, type MaskEventDetail } from '@react-input/mask';


const Input = ({ reset, country, handleChange, handleSubmit}: InputProps) => {

  const [detail, setDetail] = useState<MaskEventDetail | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (reset) {
      setDetail(null);
      // inputRef.current?.focus();
    }
  }, [reset])

  return (
    <>
      <div className='text-sm flex items-center'>
        <HelpCircle className='h-4 stroke-[#555] mr-1'/>
        <i> zip code range: {country.range} </i>
      </div>
      <form className='flex items-center gap-3 h-12' onSubmit={handleSubmit}>
        <InputMask
          key={country.code}
          mask={country.range.split(' : ')[0].replace(/\d/g, '_')}
          ref={inputRef}
          onChange={handleChange}
          onMask={(event) => setDetail(event.detail)}
          className='border border-zinc-300 rounded-md px-2 py-1 h-full w-full'
          replacement={{ _: /\d/ }}
          showMask
          // value={detail?.value ?? ''}
        />
        {detail?.input && !detail.isValid && <span className=' text-red-400 text-sm'> field incomplete! </span>}
        <button
          disabled={!detail?.isValid}
          className={`${!detail?.isValid ? 'opacity-50' : 'opacity-100'} h-full w-10 flex flex-shrink-0 justify-center items-center rounded-md`}
          type="submit"
        >
          <ArrowRight className='h-6 w-6 stroke-[1.5] stroke-[#333]'/>
        </button>
      </form>
    </>
  )
}

export default Input