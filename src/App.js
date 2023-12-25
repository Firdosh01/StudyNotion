import './App.css';
import { Suspense, lazy } from 'react';
import Home from './Pages/Home';
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './Components/common/Navbar';
import OpenRoute from "./Components/core/Auth/OpenRoute"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Error from './Pages/Error';
// import About from './Pages/About';
import ForgotPassword from './Pages/ForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyEmail from './Pages/VerifyEmail'
// import Contact from './Pages/Contact';
// import MyProfile from './Components/core/Dashboard/MyProfile';
// import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Components/core/Auth/PrivateRoute'
// import Settings from './Components/core/Dashboard/Settings/Settings';
// import EnrolledCourses from './Components/core/Dashboard/EnrolledCourses';
import { ACCOUNT_TYPE } from './utils/constants';
// import Cart from './Components/core/Dashboard/Cart';
import { useSelector } from 'react-redux';
// import MyCourses from './Components/core/Dashboard/MyCourses';
// import AddCourse from './Components/core/Dashboard/AddCourse';
// import EditCourse from './Components/core/Dashboard/EditCourse';
// import Catalog from './Pages/Catalog';
// import CourseDetails from './Pages/CourseDetails';
// import ViewCourse from './Pages/ViewCourse';
// import VideoDetails from './Components/core/Dashboard/ViewCourse/VideoDetails';
// import Instructor from './Components/core/Dashboard/InstructorDashboard/Instructor';
const About = lazy(() => import('./Pages/About'))
const Contact = lazy(() => import("./Pages/Contact"))
const MyProfile = lazy(() => import("./Components/core/Dashboard/MyProfile"))
const Dashboard = lazy(() => import("./Pages/Dashboard"))
const Settings = lazy(() => import("./Components/core/Dashboard/Settings/Settings"))
const EnrolledCourses = lazy(() => import("./Components/core/Dashboard/EnrolledCourses"))
const Cart = lazy(() => import("./Components/core/Dashboard/Cart"))
const MyCourses = lazy(() => import("./Components/core/Dashboard/MyCourses"))
const AddCourse = lazy(() => import("./Components/core/Dashboard/AddCourse"))
const EditCourse = lazy(() => import("./Components/core/Dashboard/EditCourse"))
const Catalog = lazy(() => import("./Pages/Catalog"))
const CourseDetails = lazy(() => import("./Pages/CourseDetails"))
const ViewCourse = lazy(() => import("./Pages/ViewCourse"))
const VideoDetails = lazy(() => import("./Components/core/Dashboard/ViewCourse/VideoDetails"))
const Instructor = lazy(() => import("./Components/core/Dashboard/InstructorDashboard/Instructor"))



function App() {

  const {user} = useSelector((state) => state.profile)
  
  return (
    <div className='flex flex-col w-screen min-h-screen bg-richblack-900 font-inter '>
      <Navbar />
      <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />


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
               <Route path="dashboard/add-course" element={<AddCourse />} />
               <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
               <Route path="dashboard/instructor" element={<Instructor />} />
            </>
          )
        }
        
        </Route>

        <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>
        

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails/>}
          />
          </>
        )
      }

      </Route>

        <Route path="*" element={<Error />} />
              
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
