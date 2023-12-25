import React from 'react'
import HighlightText from '../../common/HighlightText'
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../../common/Button"



function LearningLanguageSection() {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col items-center gap-5'>

        <div className='text-4xl font-semibold lg:text-center'>
          Your Swiss Knife for
          <HighlightText text={" Learning any language"} />
        </div>
        
        <div className='mx-auto text-base font-medium lg:text-center text-richblack-600 lg:w-[70%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
         progress tracking, custom schedule and more.  
        </div>

        <div className='flex flex-col items-center mt-10 lg:flex-row lg:justify-center'>
          <img src={know_your_progress} alt="KnowYourProgressImage" className='object-contain lg:-mr-32' />
          <img src={compare_with_others} alt="compareWithOthersImage" className='object-contain mt-[-70px]'  />
          <img src= {plan_your_lesson} alt="planYourLesson" className='object-contain lg:-ml-36 mt-[-120px]' />
        </div>

        <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"} >
            <div>
              Learn More
            </div>
          </CTAButton>
        </div>
      
      </div>
    </div>
  )
}

export default LearningLanguageSection
