
const InputContainer = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <div className='flex flex-col gap-4 mb-10 max-w-screen-sm border border-zinc-300 bg-zinc-100 rounded-xl p-4 mx-auto'>
      <h3 > {title} </h3>
      {children}
    </div>
  )
}

export default InputContainer