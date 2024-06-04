import { Link, useLocation } from "react-router-dom"

const Header = () => {
	const pathname = useLocation().pathname;

  return (
    <header className='bg-gradient-to-r from-indigo-300 from-10% via-sky-200 via-30% to-emerald-300 to-90% h-20'>
      <div className='flex m-auto justify-between h-full items-center max-w-screen-sm px-8 sm:px-4'>
      	<h1 className='text-xl'> useZipCode </h1>
	      <nav className='flex gap-4 text-lg'>
					<Link to='/'>
						<span className={`${pathname === '/' && 'font-bold'} bg-zinc-200/50 rounded-md px-4 py-1 whitespace-nowrap`}> ZIP </span>
					</Link>
					<Link to='/cities'>
						<span className={`${pathname === '/cities' && 'font-bold'} bg-zinc-200/50 rounded-md px-4 py-1`}> CITY </span>
					</Link>
	      </nav>
      </div>
    </header>
  )
}

export default Header
