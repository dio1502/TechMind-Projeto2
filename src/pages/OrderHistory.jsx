"use client"

import { useState } from "react"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { useOrders } from "../context/OrderContext"

const OrderHistory = () => {
  const { orders } = useOrders()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase()

    // Pesquisa original por nome, número da encomenda e ID
    const matchesText =
      order.recipientName?.toLowerCase().includes(searchLower) ||
      order.orderNumber?.toLowerCase().includes(searchLower) ||
      order.id?.toLowerCase().includes(searchLower)

    // Pesquisa por data (nova funcionalidade)
    const matchesDate =
      order.deliveryDate &&
      // Full date match (YYYY-MM-DD)
      (order.deliveryDate.includes(searchTerm) ||
        // Year match (YYYY)
        order.deliveryDate.startsWith(searchTerm) ||
        // Month/Year match (MM/YYYY format converted to YYYY-MM)
        (searchTerm.includes("/") && order.deliveryDate.includes(searchTerm.split("/").reverse().join("-"))) ||
        // Day/Month match (DD/MM format)
        (searchTerm.includes("/") &&
          searchTerm.length <= 5 &&
          order.deliveryDate.slice(5).replace("-", "/").includes(searchTerm)) ||
        // Formatted date display match (DD/MM/YYYY)
        new Date(order.deliveryDate)
          .toLocaleDateString("pt-PT")
          .includes(searchTerm) ||
        new Date(order.deliveryDate).toLocaleDateString("en-GB").includes(searchTerm))

    return matchesText || matchesDate
  })

  return (
    <div className="order-history-page">
      <Header title="Order History" />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search orders by name, ID, order number, or date..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found. {searchTerm ? "Try a different search term." : "Register a new order to get started."}</p>
          {!searchTerm && (
            <Link to="/order-registration" className="register-link">
              Register New Order
            </Link>
          )}
        </div>
      ) : (
        <div className="orders-container">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-details">
                <div className="order-info">
                  <p className="order-id">Order #{order.id}</p>
                  <p className="delivery-date">Delivery date: {order.deliveryDate}</p>
                  <p className="recipient-name">Recipient: {order.recipientName}</p>
                </div>
                <div className="package-info">
                  <p className="package-type">Package type: {order.packageType}</p>
                  <p className="order-status">
                    Status:{" "}
                    <span className={`status-${order.status.toLowerCase().replace(" ", "-")}`}>{order.status}</span>
                  </p>
                  <Link to={`/order-details/${order.id}`} className="more-details-link">
                    More details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderHistory

