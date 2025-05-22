"use client"

import { useParams, Link } from "react-router-dom"
import Header from "../components/Header"
import { useOrders } from "../context/OrderContext"

const OrderDetails = () => {
  const { id } = useParams()
  const { getOrderById } = useOrders()
  const order = getOrderById(id)

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

        <div className="actions-container">
          <Link to="/order-history" className="back-button">
            ← Back to Order History
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
