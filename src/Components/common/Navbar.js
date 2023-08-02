import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart, AiOutlineDown} from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropDown'
import { useState, useEffect } from 'react'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { ACCOUNT_TYPE } from '../../utils/constants'

function Navbar() {
    
    const {token} = useSelector( (state) => state.auth)
    const {user} = useSelector( (state) => state.profile)
    const {totalItems} = useSelector( (state) => state.cart)
    const location = useLocation()
    
    const [subLinks, setSubLinks]  = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(async () => {
          setLoading(true)
          try {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            setSubLinks(res.data.data)
          } catch (error) {
            console.log("Could not fetch Categories.", error)
          }
          setLoading(false)
        })()
      }, [])
    
      console.log("sub links", subLinks)
    
      const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
      }
    
  return (
    <div className='flex items-center justify-center border-b-[1px] border-b-richblack-700 h-14'>
   
      <div className='flex items-center justify-between w-11/12 max-w-maxContent'>
        
        <Link to="/">
            <img src={logo} alt="" width={160} height={42} loading='lazy' />
        </Link>

        {/* Nav links */}
        <nav className='hidden md:block'>
        <ul className='flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className={`relative flex items-center gap-2 cursor-pointer group ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                                <p>{link.title}</p>
                                <AiOutlineDown />

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[20%]
                                 top-[5%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px] z-40 '>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    loading ? (
                                        <p>Loading....</p>
                                    ) :
                                    subLinks.length ? (
                                        <>
                                        {subLinks
                                          ?.filter(
                                            (subLink) => subLink?.courses?.length > 0
                                          )
                                          ?.map((subLink, i) => (
                                            <Link
                                              to={`/catalog/${subLink.name
                                                .split(" ")
                                                .join("-")
                                                .toLowerCase()}`}
                                              className="py-4 pl-4 bg-transparent rounded-lg hover:bg-richblack-50"
                                              key={i}
                                            >
                                              <p>{subLink.name}</p>
                                              
                                            </Link>
                                          ))}
                                      </>
                                    ) : (<p className='text-center text-yellow-25'>No Courses Found</p>)
                                }

                                </div>


                            </div>   
                                )
                                : 
                                (
                                    <Link to={link?.path}>
                                        
                                        <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>
                                    
                                    </Link>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>

        {/* Login/Singup/Dashboard */}

        <div className='items-center hidden md:flex gap-x-4'>
                  
            {
                user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link to="/dashboard/cart" className='relative'>
                        <AiOutlineShoppingCart className='text-2xl text-richblack-100' />
                        {
                            totalItems > 0 && (
                                <span className='absolute grid w-5 h-5 overflow-hidden text-xs font-bold text-center text-yellow-100 rounded-full -bottom-2 -right-2 place-items-center bg-richblack-600'>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            } 
            {
                token === null && (
                    <Link to="/login">
                        <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>
                            Log in
                        </button>
                    </Link>
                )
            } 
            {
                token === null && (
                    <Link to="/signup">
                        <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>
                            Sign Up
                        </button>
                    </Link>
                )
            }    
            {
                token !== null && <ProfileDropdown />
            }
                  
        </div>
      
      </div>
   
    </div>
  )
}

export default Navbar
