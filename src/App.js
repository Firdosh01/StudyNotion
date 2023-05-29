import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import {Route, Routes} from 'react-router-dom'
import Navbar from './Components/common/Navbar';

function App() {
  return (
    <div className='flex flex-col w-screen min-h-screen bg-richblack-900 font-inter '>
      <Navbar />
      <Routes>
        <Route path="/" element= {<Home />} />
      </Routes>
    </div>
  );
}

export default App;
