"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import InputField from "../components/InputField"
import { useOrders } from "../context/OrderContext"

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

    
    alert("Order registered successfully!")

    
    navigate("/order-history")
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
    </div>
  )
}

export default OrderRegistration
