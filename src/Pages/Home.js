import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../Components/common/HighlightText'
import CTAButton from "../Components/common/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../Components/core/HomePage/CodeBlocks"
import TimelineSection from '../Components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../Components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../Components/core/HomePage/InstructorSection'
import Footer from '../Components/common/Footer'
import ExploreMore from '../Components/core/HomePage/ExploreMore'


function Home() {
  return (
    <div>

      {/* Section 1 */}

      <div className='relative flex flex-col items-center justify-between w-11/12 mx-auto text-white'>
        
        <Link to={"/signup"}>

          <div className='p-1 mx-auto mt-16 font-bold transition-all duration-200 rounded-full bg-richblack-800 text-richblue-200 hover:scale-95 w-fit group'>
            <div className='flex flex-row items-center px-10 rounded-full py-[5px] duration-200 transition-all group-hover-:bg-richblack-900 gap-2'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>

        </Link>

        <div className='text-4xl font-semibold lg:text-center mt-7'>
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className='mt-4 lg:w-[90%] lg:text-center text-base font-bold text-richblack-300'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex flex-row mt-8 gap-7'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className='mx-3 my-12 shadow-blue-200'>
          <video muted loop autoPlay>
            <source src={Banner} type='video/mp4' />
          </video>
        </div>

        {/* Code Section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div>
                Unlock Your
                <HighlightText text={"Coding potential "} />
                With our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={
              {
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2={
              {
                btnText: "Learn More",
                linkto: "/signup",
                active: false,
                
              }
            }
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div>
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={
              {
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2={
              {
                btnText: "Learn More",
                linkto: "/signup",
                active: false,
              }
            }
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>
        
        <ExploreMore />
      </div>

      {/* Section 2 */}
      
      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[310px]'>
          <div className='flex flex-col items-center justify-between w-11/12 gap-5 mx-auto max-w-maxContent'>
            <div className='h-[150px]'></div>
            <div className='flex flex-row text-white gap-7'>
              
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              
              <CTAButton active={false} linkto={"/signup"}>
                <div>
                Learn More
                </div>
              </CTAButton>
              
            </div>
          </div>
        </div>
        
        <div className='flex flex-col items-center justify-between w-11/12 mx-auto max-w-maxContent gap-7'>
          
          <div className='flex lg:flex-row gap-5 mb-10 mt-[95px] flex-col'>
            <div className='text-4xl font-semibold lg:w-[45%]'>
            Get the skills you need for a
            <HighlightText text={"job that is in demand"} />
            </div>

            <div className='flex flex-col gap-10 lg:w-[40%] items-start '>
            <div className='text-[16px]'>
            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
            </div>
            <CTAButton active={true} linkto={"/signup"}>
              <div>Learn More</div>
            </CTAButton>
          
          </div>
          </div>

          <TimelineSection />
        <LearningLanguageSection />
          
        </div>

        
      </div>


      {/* Section 3 */}

      <div className='flex flex-col items-center justify-center w-11/12 gap-8 mx-auto text-white max-w-maxContent first-letter bg-richblack-900'>
        
        <InstructorSection />

        <h2 className='mt-10 text-4xl font-semibold text-center'>Reviews from other learners</h2>
        
        {/* Reviews Slider */}
        
      </div>

      {/* Footer */}
      
      <Footer />

    </div>
  )
}

export default Home
