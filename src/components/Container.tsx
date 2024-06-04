
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='px-4 py-10 sm:p-10 h-[calc(100dvh-5rem)] overflow-y-auto'>
      {children}
    </div>
  )
}

export default Container