"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import InputField from "../../components/InputField"
import { useAnnouncements } from "../../context/AnnouncementContext"

const AnnouncementRegistration = () => {
  const navigate = useNavigate()
  const { addAnnouncement } = useAnnouncements()

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  })

  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))

   
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.subject.trim()) {
      errors.subject = "Announcement subject is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Announcement description is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    
    const newAnnouncement = addAnnouncement(formData)

    
    alert("Announcement registered successfully!")

    
    navigate("/announcement-history")
  }

  return (
    <div className="announcement-registration-page">
      <Header title="Announcement Registration" />

      <form className="registration-form" onSubmit={handleSubmit}>
        <InputField
          label="Enter subject:"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
        {formErrors.subject && <p className="error-message">{formErrors.subject}</p>}

        <InputField
          label="Enter description:"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {formErrors.description && <p className="error-message">{formErrors.description}</p>}

        <button type="submit" className="submit-button">
          Register Annoucement
        </button>
      </form>
    </div>
  )
}

export default AnnouncementRegistration
