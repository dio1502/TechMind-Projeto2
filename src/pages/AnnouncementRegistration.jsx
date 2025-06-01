import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useAnnouncements } from "../context/AnnouncementContext"

const AnnouncementRegistration = () => {
  const navigate = useNavigate()
  const { addAnnouncement } = useAnnouncements()

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  })

  const [formErrors, setFormErrors] = useState({})
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState(null)

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

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Add the Announcement using the context function
    const createdAnnouncement = addAnnouncement(formData)
    setNewAnnouncement(createdAnnouncement)
    setShowSuccessModal(true)
  }

  const handleContinue = () => {
    setShowSuccessModal(false)
    // Reset form
    setFormData({
      subject: "",
      description: "",
    })
  }

  const handleViewAnnouncement = () => {
    setShowSuccessModal(false)
    // Navigate to the Announcement status page
    navigate(`/Announcement-status/${newAnnouncement.id}`)
  }

  return (
    <div className="create-Announcement-page">
      <Header title="Create Announcement" />

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

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Submit Announcement
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && newAnnouncement && (
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

            <h2 className="success-title">Announcement Submitted Successfully!</h2>
            <p className="success-subtitle">Your Announcement has been processed and added to the system.</p>

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
                  <span className="info-label">Announcement ID</span>
                  <span className="info-value">{newAnnouncement.id}</span>
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
                  <span className="info-value">{newAnnouncement.deliveryDate}</span>
                </div>
              </div>
            </div>

            <div className="modal-buttons">
              <button className="continue-button" onClick={handleContinue}>
                Continue
              </button>
              <button className="view-order-button" onClick={handleViewAnnouncement}>
                View Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnnouncementRegistration
