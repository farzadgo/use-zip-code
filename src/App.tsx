import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Cities from './routes/Cities';


function App() {
  
  return (
      <Router>
      <div id="app">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cities' element={<Cities />} />
          <Route path='/*' element={<div className='flex w-full h-96'><h1 className='m-auto'>Not Found</h1></div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
