import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

function ContactFormSection() {
  return (
    <div className="mx-auto">
      <h1 className="text-4xl font-semibold text-center">Get in Touch</h1>
      <p className="mt-3 text-center text-richblack-300">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mx-auto mt-12">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
