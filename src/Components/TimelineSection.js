import React from 'react'
import Logo1 from '../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../assets/Images/TimelineImage.png'



const timeline = [
    {
        id: 1,
        logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        id: 2,
        logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        id: 3,
        logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        id: 4,
        logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
    },


]

function TimelineSection() {
    return (
        <div>
            <div className='flex flex-col lg:items-center lg:flex-row gap-15'>

                <div className='lg:w-[45%] flex flex-col gap-5'>
                    {
                        timeline.map((element, id,index) => (
                            <div key={index} className='flex flex-row gap-6'>
                                <div class="hidden lg:block h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]"></div>
                                
                                <div className='w-[50px] h-[50px] bg-white  flex items-center justify-center rounded-3xl '>
                                    <img src={element.logo} alt='TimelineLogo'  />
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            
                            </div>
                        ))
                
                    }
                </div>
                
                <div className='relative shadow-blue-200'>
                    <img src={timelineImage} alt="TimelineImage" className='object-cover shadow-white h-fit' />

                    <div className='flex flex-row py-10 text-white uppercase bg-caribbeangreen-700 '>
                        <div className='flex flex-row items-center gap-5 border-r border-caribbeangreen-300 px-7'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-sm text-caribbeangreen-300'>Years of Experience</p>
                        </div>

                        <div className='flex items-center gap-5 px-7'>
                        <p className='text-3xl font-bold'>250</p>
                            <p className='text-sm text-caribbeangreen-300'>type of courses</p>
                        </div>
                        
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TimelineSection
