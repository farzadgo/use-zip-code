import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';


function App() {
  
  return (
      <Router>
      <div id="app">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
