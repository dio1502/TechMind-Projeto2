"use client"

import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useOrders } from "../context/OrderContext"
import { useInvoices } from "../context/InvoiceContext"

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getOrderById, markOrderAsInvoiced } = useOrders()
  const { addInvoice } = useInvoices()
  const order = getOrderById(id)
  const [message, setMessage] = useState(null)

  if (!order) {
    return (
      <div className="order-details-page">
        <Header title="Order Details" />
        <div className="loading-container">
          <p>Order not found</p>
          <Link to="/order-history" className="back-button">
            ← Back to Order History
          </Link>
        </div>
      </div>
    )
  }

  const handleGenerateInvoice = () => {
    if (order.invoiced) {
      setMessage("This order has already been invoiced.")
      return
    }

    try {
      // Calculate invoice amount based on package type
      const fee = order.packageType === "Box" ? 25 : 15

      // Create invoice
      const invoice = addInvoice({
        apartmentNumber: order.apartmentNumber,
        fee: fee,
        description: `Invoice for order ${order.id} - ${order.packageType}`,
        orderReference: order.id,
      })

      // Mark order as invoiced
      markOrderAsInvoiced(order.id)

      setMessage("Invoice generated successfully!")

      // Navigate to invoice details after a short delay
      setTimeout(() => {
        navigate(`/invoice-details/${invoice.id}`)
      }, 1500)
    } catch (error) {
      setMessage("Error generating invoice: " + (error.message || "Unknown error"))
    }
  }

  return (
    <div className="order-details-page">
      <Header title={`Order Details: #${order.id}`} />

      <div className="order-details-container">
        <div className="order-details-section">
          <h2 className="section-title">Order Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Order Number:</span>
              <span className="detail-value">{order.orderNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Package Type:</span>
              <span className="detail-value">{order.packageType}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className={`detail-value status-badge status-${order.status.toLowerCase().replace(" ", "-")}`}>
                {order.status}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Order ID:</span>
              <span className="detail-value">{order.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Invoice Status:</span>
              <span className="detail-value">{order.invoiced ? "Invoiced" : "Not Invoiced"}</span>
            </div>
          </div>
        </div>

        <div className="order-details-section">
          <h2 className="section-title">Recipient Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{order.recipientName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Apartment Number:</span>
              <span className="detail-value">{order.apartmentNumber}</span>
            </div>
          </div>
        </div>

        <div className="order-details-section">
          <h2 className="section-title">Delivery Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Delivery Date:</span>
              <span className="detail-value">{order.deliveryDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Estimated Delivery:</span>
              <span className="detail-value">
                {new Date(new Date(order.deliveryDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
              </span>
            </div>
          </div>
        </div>

        {message && (
          <div className={`message-container ${message.includes("Error") ? "error" : "success"}`}>
            <p>{message}</p>
          </div>
        )}

        <div className="actions-container">
          <Link to="/order-history" className="back-button">
            ← Back to Order History
          </Link>

          {!order.invoiced && (
            <button onClick={handleGenerateInvoice} className="generate-invoice-button">
              Generate Invoice
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetails

