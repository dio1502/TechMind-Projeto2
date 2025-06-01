"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import InputField from "../../components/InputField"
import { useOrders } from "../../context/OrderContext"

const OrderRegistration = () => {
  const navigate = useNavigate()
  const { addOrder } = useOrders()

  const [formData, setFormData] = useState({
    recipientName: "",
    apartmentNumber: "",
    orderNumber: "",
    packageType: "",
  })

  const [formErrors, setFormErrors] = useState({})
  const [showNotification, setShowNotification] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)

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

    if (!formData.recipientName.trim()) {
      errors.recipientName = "Recipient name is required"
    }

    if (!formData.apartmentNumber.trim()) {
      errors.apartmentNumber = "Apartment number is required"
    }

    if (!formData.orderNumber.trim()) {
      errors.orderNumber = "Order number is required"
    }

    if (!formData.packageType) {
      errors.packageType = "Please select a package type"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newOrder = addOrder(formData)
    setOrderDetails(newOrder)
    setShowNotification(true)
  }

  const handleContinue = () => {
    setShowNotification(false)

    setFormData({
      recipientName: "",
      apartmentNumber: "",
      orderNumber: "",
      packageType: "",
    })
  }

  const handleViewOrder = () => {
    setShowNotification(false)

    navigate(`/order-details/${orderDetails.id}`)
  }

  return (
    <div className="order-registration-page">
      <Header title="Order Registration" />

      <form className="registration-form" onSubmit={handleSubmit}>
        <InputField
          label="Enter recipient name:"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
        />
        {formErrors.recipientName && <p className="error-message">{formErrors.recipientName}</p>}

        <InputField
          label="Enter apartment number:"
          name="apartmentNumber"
          value={formData.apartmentNumber}
          onChange={handleChange}
        />
        {formErrors.apartmentNumber && <p className="error-message">{formErrors.apartmentNumber}</p>}

        <InputField
          label="Enter order number:"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
        />
        {formErrors.orderNumber && <p className="error-message">{formErrors.orderNumber}</p>}

        <div className="package-type-field">
          <p className="package-type-label">Package type:</p>
          <div className="package-options">
            <label className="package-option">
              <input
                type="radio"
                name="packageType"
                value="Box"
                checked={formData.packageType === "Box"}
                onChange={handleChange}
              />
              Box
            </label>
            <label className="package-option">
              <input
                type="radio"
                name="packageType"
                value="Envelope"
                checked={formData.packageType === "Envelope"}
                onChange={handleChange}
              />
              Envelope
            </label>
          </div>
          {formErrors.packageType && <p className="error-message">{formErrors.packageType}</p>}
        </div>

        <button type="submit" className="submit-button">
          Register Order
        </button>
      </form>

      {showNotification && orderDetails && (
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

            <h2 className="success-title">Order Registered Successfully!</h2>
            <p className="success-subtitle">Your order has been processed and added to the system.</p>

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
                  <span className="info-label">Order ID</span>
                  <span className="info-value">{orderDetails.id}</span>
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
                  <span className="info-label">Delivery Date</span>
                  <span className="info-value">
                    {new Date(orderDetails.deliveryDate).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Package Type</span>
                  <span className="info-value">{orderDetails.packageType}</span>
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
                  <span className="info-value">{orderDetails.status}</span>
                </div>
              </div>
            </div>

            <div className="modal-buttons">
              <button className="continue-button" onClick={handleContinue}>
                Continue
              </button>
              <button className="view-order-button" onClick={handleViewOrder}>
                View Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderRegistration
