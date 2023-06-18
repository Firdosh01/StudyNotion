import React from 'react'
import ContactDetails from '../Components/ContactPage/ContactDetails'
import ContactForm from '../Components/ContactPage/ContactForm'

function Contact() {
  return (
    <div>
      <div>
        <div>
            <ContactDetails />
        </div>

        <div>
            <ContactForm />
        </div>
      </div>
      <div>
        <h1>Reviews from other learners</h1>
      </div>
    </div>
  )
}

export default Contact
