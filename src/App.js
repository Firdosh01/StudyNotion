import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className='flex flex-col w-screen min-h-screen bg-richblack-900 font-inter '>
      <Routes>
        <Route path="/" element= {<Home />} />
      </Routes>
    </div>
  );
}

export default App;
