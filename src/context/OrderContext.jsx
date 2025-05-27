"use client"

import { createContext, useState, useEffect, useContext } from "react"

// Create the context
const OrderContext = createContext()

// Create a provider component
export const OrderProvider = ({ children }) => {
  // Initialize state with data from localStorage if available
  const [orders, setOrders] = useState(() => {
    if (typeof window !== "undefined") {
      const savedOrders = localStorage.getItem("orders")
      return savedOrders
        ? JSON.parse(savedOrders)
        : [
            // Initial sample data
            {
              id: "ORD001",
              recipientName: "John Doe",
              apartmentNumber: "101",
              orderNumber: "PKG001",
              packageType: "Box",
              deliveryDate: "2023-05-15",
              status: "Delivered",
              invoiced: false,
            },
            {
              id: "ORD002",
              recipientName: "Jane Smith",
              apartmentNumber: "202",
              orderNumber: "PKG002",
              packageType: "Envelope",
              deliveryDate: "2023-05-16",
              status: "In Transit",
              invoiced: false,
            },
          ]
    }
    return []
  })

  // Save to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  // Function to add a new order
  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      ...orderData,
      deliveryDate: new Date().toISOString().split("T")[0], // Today's date
      status: "Processing",
      invoiced: false,
    }
    setOrders([...orders, newOrder])
    return newOrder
  }

  // Function to get order by ID
  const getOrderById = (id) => {
    return orders.find((order) => order.id === id) || null
  }

  // Function to mark an order as invoiced
  const markOrderAsInvoiced = (id) => {
    const updatedOrders = orders.map((order) => (order.id === id ? { ...order, invoiced: true } : order))
    setOrders(updatedOrders)
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById, markOrderAsInvoiced }}>
      {children}
    </OrderContext.Provider>
  )
}

// Custom hook to use the order context
export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
