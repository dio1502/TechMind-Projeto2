"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { useRequests } from "../../context/RequestContext"

const CreateRequest = () => {
  const navigate = useNavigate()
  const { addRequest } = useRequests()

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    apartmentNumber: "",
  })

  const [formErrors, setFormErrors] = useState({})
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [newRequest, setNewRequest] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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


    const createdRequest = addRequest(formData)
    setNewRequest(createdRequest)
    setShowSuccessModal(true)
  }

  const handleContinue = () => {
    setShowSuccessModal(false)

    setFormData({
      subject: "",
      description: "",
      apartmentNumber: "",
    })
  }

  const handleViewRequest = () => {
    setShowSuccessModal(false)

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


      {showSuccessModal && newRequest && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon-container">
              <div className="success-icon-bg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <h2 className="success-title">Request Submitted Successfully!</h2>
            <p className="success-subtitle">Your request has been processed and added to the system.</p>

            <div className="order-info-list">
              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Request ID</span>
                  <span className="info-value">{newRequest.id}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#6366f1" strokeWidth="2" />
                    <line x1="16" y1="2" x2="16" y2="6" stroke="#6366f1" strokeWidth="2" />
                    <line x1="8" y1="2" x2="8" y2="6" stroke="#6366f1" strokeWidth="2" />
                    <line x1="3" y1="10" x2="21" y2="10" stroke="#6366f1" strokeWidth="2" />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Date</span>
                  <span className="info-value">{newRequest.date}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="#6366f1" strokeWidth="2" />
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Status</span>
                  <span className="info-value">{newRequest.status}</span>
                </div>
              </div>
            </div>

            <div className="modal-buttons">
              <button className="continue-button" onClick={handleContinue}>
                Continue
              </button>
              <button className="view-order-button" onClick={handleViewRequest}>
                View Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateRequest

