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

const subLinks = [
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title: "web dev",
        link:"/catalog/web-development"
    },
];


function Navbar() {
    
    const {token} = useSelector( (state) => state.auth)
    const {user} = useSelector( (state) => state.profile)
    const {totalItems} = useSelector( (state) => state.cart)
    const location = useLocation()
    
    const [ssubLinks, setSsubLinks]  = useState([]);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:" , result);
            setSsubLinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect( () => {
        console.log("PRINTING TOKEN", token);
        fetchSublinks();
    },[] )
    
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
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group '>
                                <p>{link.title}</p>
                                <AiOutlineDown />

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[30%]
                                 top-[5%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px] z-40 '>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`${subLink.link}`} key={index}>
                                                    <p className='px-3 py-4 rounded hover:bg-richblue-50'>{subLink.title}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
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
                token !== null && <ProfileDropdown />
            }
                  
        </div>
      
      </div>
   
    </div>
  )
}

export default Navbar
