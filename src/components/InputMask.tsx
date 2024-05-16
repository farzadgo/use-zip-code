import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'react-feather';
import { InputProps } from '../types';
import { InputMask, type MaskEventDetail } from '@react-input/mask';


const Input = ({selected, country, handleChange, handleSubmit}: InputProps) => {

  const [detail, setDetail] = useState<MaskEventDetail | null>(null);

  const [mask, setMask] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selected) {
      let newMask = ''
      if (country.code === 'br') {
        newMask = '_____-___';
      } else if (country.code === 'lu') {
        newMask = 'L-____';
      } else {
        newMask = country.range.split(' : ')[0].replace(/\d/g, '_')
      }
      setMask(newMask)
    }

  }, [selected, country, setMask, inputRef])

  return (
    <form className='flex items-center gap-3 h-10' onSubmit={e => handleSubmit(e, 'mask')}>
      <label className={`${selected ? 'opacity-100' : 'opacity-50'} text-sm w-16  `}> inputMask </label>
      <InputMask
        key={mask}
        mask={mask}
        ref={inputRef}
        onChange={handleChange}
        onMask={(event) => setDetail(event.detail)}
        className='border border-zinc-300 rounded-md px-2 py-1 h-full w-full'
        disabled={!selected}
        replacement={{ _: /\d/ }}
        showMask
      />
      {detail?.input && !detail.isValid && <span>The field is not filled.</span>}
      <button
        disabled={!detail?.isValid}
        className={`${!detail?.isValid ? 'opacity-50' : 'opacity-100'} h-full w-10 flex flex-shrink-0 justify-center items-center rounded-md bg-gradient-to-r from-indigo-300 to-emerald-300`}
        type="submit"
      >
        <ArrowRight className='h-6 w-6 stroke-[1.5] stroke-[#333]'/>
      </button>
    </form>
  )
}

export default Input