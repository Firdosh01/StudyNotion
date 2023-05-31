import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropDown from '../core/ProfileDropDown'


function Navbar() {
    
    const {token} = useSelector( (state) => state.auth)
    const {user} = useSelector( (state) => state.profile)
    const {totalItems} = useSelector( (state) => state.cart)
    
    const location = useLocation()
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }
    
  return (
    <div className='flex items-center justify-center border-b-[1px] border-b-richblack-700 h-14'>
   
      <div className='flex items-center justify-between w-11/12 max-w-maxContent'>
        
        <Link to="/">
            <img src={logo} alt="" width={160} height={42} loading='lazy' />
        </Link>

        {/* Nav links */}

        <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map((link,index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                <div>
                                    {/* Bakend */}
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

        <div className='flex items-center gap-x-4'>
                  
            {
                user && user.accountType != "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                        <AiOutlineShoppingCart />
                        {
                            totalItems > 0 && (
                                <span>
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
                token !== null && <ProfileDropDown />
            }
                  
        </div>
      
      </div>
   
    </div>
  )
}

export default Navbar
