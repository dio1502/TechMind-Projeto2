"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useRequests } from "../context/RequestContext"

const CreateRequest = () => {
  const navigate = useNavigate()
  const { addRequest } = useRequests()

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    apartmentNumber: "",
  })

  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    // Clear error when field is edited
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
      errors.subject = "Subject is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }

    if (!formData.apartmentNumber.trim()) {
      errors.apartmentNumber = "Apartment number is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Add the request using the context function
    const newRequest = addRequest(formData)

    // Show success message
    alert("Request submitted successfully!")

    // Navigate to the request status page
    navigate(`/request-status/${newRequest.id}`)
  }

  return (
    <div className="create-request-page">
      <Header title="Create Request" />

      <div className="registration-form">
        <form className="request-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
            />
            {formErrors.subject && <p className="error-message">{formErrors.subject}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className="form-textarea"
            ></textarea>
            {formErrors.description && <p className="error-message">{formErrors.description}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="apartmentNumber">Apartment #:</label>
            <input
              type="text"
              id="apartmentNumber"
              name="apartmentNumber"
              value={formData.apartmentNumber}
              onChange={handleChange}
              className="form-input"
            />
            {formErrors.apartmentNumber && <p className="error-message">{formErrors.apartmentNumber}</p>}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateRequest

