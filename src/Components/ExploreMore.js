import React, {useState} from 'react'
import {HomePageExplore} from '../data/homepage-explore'
import HighlightText from './HighlightText';




const tabsName = [
    "Free",
    "New to coding",
    "Most Popular",
    "Skills paths",
    "Career paths"

]

function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState (HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value)
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
      
      <div className='text-4xl font-semibold text-center'>
      Unlock the
      <HighlightText text={"Power of Code"} />
      </div>

      <p className='mt-3 text-[16px] text-center text-richblack-300'>
        Learn to Build Anything You Can Imagine
     </p>

     <div className='flex flex-row px-1 py-1 mt-5 mb-5 rounded-full bg-richblack-800'>
        {
            tabsName.map(( element,index) => (
                <div className={`text-[16px] flex flex-row items-center gap-2 
                ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"}  
                rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={index} onClick={() => setMyCards(element)}>
                    {element}

                </div>
            ))
        }
     </div>

     <div className='lg:h-[150px]'></div>
    {/* course card ka group  */}
    
    {/* <div className='absolute flex flex-row justify-between w-full gap-10'>
        {
            courses.map((element,index) => (
                <CourseCard
                key={index}
                cardData = {element}
                currentCard = {currentCard}
                setCurrentCard = {setCurrentCard} />
            ))
        }
    </div> */}
    </div>
  )
}

export default ExploreMore
