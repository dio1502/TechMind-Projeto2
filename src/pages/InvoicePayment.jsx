"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useInvoices } from "../context/InvoiceContext"

const InvoicePayment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getInvoiceById, updateInvoiceStatus } = useInvoices()
  const invoice = getInvoiceById(id)

  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  if (!invoice) {
    return (
      <div className="invoice-payment-page">
        <Header title="Invoice Payment" />
        <div className="not-found-container">
          <p>Invoice not found</p>
        </div>
      </div>
    )
  }

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method")
      return
    }

    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) {
      alert("Please fill in all card details")
      return
    }

    updateInvoiceStatus(invoice.id, "Paid", paymentMethod)
    alert("Payment successful!")
    navigate("/invoice-history")
  }

  return (
    <div className="invoice-payment-page">
      <Header title="Invoice Payment" />

      <div className="payment-container">
        <div className="invoice-details">
          <div className="detail-row">
            <label>#{invoice.id}</label>
            <div className="detail-value">Apartment: #{invoice.apartmentNumber}</div>
          </div>

          <div className="detail-row">
            <label>Payment date:</label>
            <div className="detail-value">{invoice.paymentDate || "N/A"}</div>
          </div>

          <div className="detail-row">
            <label>Condominium fee:</label>
            <div className="detail-value">{invoice.fee}€</div>
          </div>

          {invoice.extraInfo && (
            <div className="detail-row">
              <label>Electricity:</label>
              <div className="detail-value">#{invoice.extraInfo}</div>
            </div>
          )}
        </div>

        <div className="payment-methods">
          <h3>Payment Method:</h3>

          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span className="payment-label">Card</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="mbway"
                checked={paymentMethod === "mbway"}
                onChange={() => setPaymentMethod("mbway")}
              />
              <span className="payment-label">MB Way</span>
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="card-details">
              <div className="form-group">
                <label>Card Number:</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="form-input"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date:</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="form-input"
                    placeholder="MM/YY"
                  />
                </div>

                <div className="form-group">
                  <label>CVV:</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="form-input"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "mbway" && (
            <div className="mbway-details">
              <div className="form-group">
                <label>Phone Number:</label>
                <input type="text" className="form-input" placeholder="9xx xxx xxx" />
              </div>
            </div>
          )}
        </div>

        <div className="payment-actions">
          <button className="pay-button" onClick={handlePayment}>
            Pay
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvoicePayment

