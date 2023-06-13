import React from 'react'
import CTAButton from "../HomePage/Button"
import HighlightText from './HighlightText'
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'


function CodeBlocks({position, heading, subheading, ctabtn1, ctabtn2,  
    codeblock, backgroundGradient, codeColor}) {
  return (
    <div className={`flex ${position} my-20 lg:justify-between gap-10 flex-col `}>
      
      {/* Section 1 */}

      <div className='lg:w-[50%] flex flex-col gap-8 text-4xl w-[100%]'>
        {heading}
        <div className='text-lg font-bold text-richblack-300'>
            {subheading}
        </div>
        
        <div className='flex text-sm gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex items-center gap-2'>
                    {ctabtn1.btnText}
                    <FaArrowRight />
                </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                {ctabtn2.btnText}
            </CTAButton>
        </div>
      
      </div>

      {/* Section 2 */}

      <div className='h-fit flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] code-border'>
        {/* Bg- Gradient */}


        <div className='flex flex-col text-center lg:w-[10%] text-richblack-400 font-inter font-bold mr-2'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
          <TypeAnimation
          sequence={[codeblock, 1000, ""]}
          repeat={Infinity}
          omitDeletionAnimation={true}
          style={
            {
              whiteSpace: "pre-line",
              display: "block",
            }
          }
           />
        </div>
      
      </div>
    
    </div>
  )
}

export default CodeBlocks
