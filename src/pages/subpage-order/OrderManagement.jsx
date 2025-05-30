"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { useOrders } from "../../context/OrderContext"

const OrderManagement = () => {
  const navigate = useNavigate()
  const { orders, markOrderAsDelivered } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [message, setMessage] = useState("")


  const pendingOrders = orders.filter((order) => order.status !== "Delivered")

  const handleOrderSelect = (order) => {
    setSelectedOrder(order)
    setMessage("")
  }

  const handleMarkAsArrived = () => {
    if (!selectedOrder) return

    try {
      markOrderAsDelivered(selectedOrder.id)
      setMessage("Order marked as delivered successfully!")


      setSelectedOrder({
        ...selectedOrder,
        status: "Delivered",
      })


      setTimeout(() => {
        setMessage("")
        setSelectedOrder(null)
      }, 2000)
    } catch (error) {
      setMessage("Error updating order status: " + (error.message || "Unknown error"))
    }
  }

  return (
    <div className="order-management-page">
      <Header title="Order Management" />

      <div className="management-container">
        <div className="management-header">
          <h2>Pending Orders ({pendingOrders.length})</h2>
        </div>

        <div className="management-layout">
          <div className="request-list-container">
            <h3>Select an Order</h3>
            <div className="request-list no-scroll">
              {pendingOrders.length === 0 ? (
                <div className="no-orders">
                  <p>No pending orders</p>
                </div>
              ) : (
                pendingOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`request-list-item ${selectedOrder?.id === order.id ? "active" : ""}`}
                    onClick={() => handleOrderSelect(order)}
                  >
                    <div className="request-list-header">
                      <span className="request-id">#{order.id}</span>
                      <span className="request-date">{order.deliveryDate}</span>
                    </div>
                    <div className="request-list-subject">{order.recipientName}</div>
                    <div className="request-list-apartment">Apt: {order.apartmentNumber}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="request-details-panel">
            <h3>Order Details</h3>
            {selectedOrder ? (
              <div className="request-detail-view">
                <div className="detail-row">
                  <label>Order #:</label>
                  <div className="detail-value">{selectedOrder.id}</div>
                </div>

                <div className="detail-row">
                  <label>Date:</label>
                  <div className="detail-value">{selectedOrder.deliveryDate}</div>
                </div>

                <div className="detail-row">
                  <label>Apartment #:</label>
                  <div className="detail-value">{selectedOrder.apartmentNumber}</div>
                </div>

                <div className="detail-row">
                  <label>Recipient:</label>
                  <div className="detail-value">{selectedOrder.recipientName}</div>
                </div>

                <div className="detail-row">
                  <label>Package Type:</label>
                  <div className="detail-value">{selectedOrder.packageType}</div>
                </div>

                <div className="detail-row">
                  <label>Order Number:</label>
                  <div className="detail-value">{selectedOrder.orderNumber}</div>
                </div>

                <div className="detail-row">
                  <label>Current Status:</label>
                  <div className="detail-value">
                    <span className={`status-badge status-${selectedOrder.status.toLowerCase().replace(" ", "-")}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                {message && (
                  <div className={`message-container ${message.includes("Error") ? "error" : "success"}`}>
                    <p>{message}</p>
                  </div>
                )}

                <div className="action-buttons-container">
                  {selectedOrder.status !== "Delivered" && (
                    <button className="arrived-button" onClick={handleMarkAsArrived}>
                      Arrived
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderManagement