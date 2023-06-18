import React from 'react'
import ContactUsForm from './ContactUsForm'

function ContactForm() {
  return (
    <div className="flex flex-col gap-3 border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14">
      <h1>
      Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p>
      Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className='mt-7'>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactForm
