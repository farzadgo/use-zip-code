import { Link } from "react-router-dom"

const Header = () => {
	
	return (
		<header className='sm:px-14 px-8 flex justify-between items-center bg-gradient-to-r from-indigo-300 from-10% via-sky-200 via-30% to-emerald-300 to-90% h-20'>
      <h1 className='text-3xl'> useZipCode </h1>

			<nav>
				<ul className='flex gap-4 text-lg'>
					<li> <Link to='/' > Zip code </Link> </li>
					<li> <Link to='/cities'> Cities </Link> </li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
