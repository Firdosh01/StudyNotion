import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/common/Navbar';
import OpenRoute from "./Components/core/Auth/OpenRoute"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Error from './Pages/Error';
import About from './Pages/About';
import ForgotPassword from './Pages/ForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyEmail from './Pages/VerifyEmail'
import Contact from './Pages/Contact';
import MyProfile from './Components/core/Dashboard/MyProfile';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Components/core/Auth/PrivateRoute'
import Settings from './Components/core/Dashboard/Settings/Settings';
import EnrolledCourses from './Components/core/Dashboard/EnrolledCourses';
import { ACCOUNT_TYPE } from './utils/constants';
import Cart from './Components/core/Dashboard/Cart';
import { useSelector } from 'react-redux';
import MyCourses from './Components/core/Dashboard/MyCourses';

function App() {

  const {user} = useSelector((state) => state.profile)
  
  return (
    <div className='flex flex-col w-screen min-h-screen bg-richblack-900 font-inter '>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path="about" element={ <About /> } />

        <Route path='/contact' element={<Contact />} />

        <Route
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
        >

        <Route path='dashboard/my-profile' element={<MyProfile />} />
        <Route path="dashboard/Settings" element={<Settings />} />

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
            <Route path='dashboard/cart' element={<Cart />} />
            <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} /> 
            </>
          )
        }

        {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
          <Route path="dashboard/my-courses" element={<MyCourses />} />
            </>
          )
        }
        
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
