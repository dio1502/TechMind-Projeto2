"use client"

import { createContext, useState, useEffect, useContext } from "react"


const OrderContext = createContext()


export const OrderProvider = ({ children }) => {
  
  const [orders, setOrders] = useState(() => {
    if (typeof window !== "undefined") {
      const savedOrders = localStorage.getItem("orders")
      return savedOrders
        ? JSON.parse(savedOrders)
        : [
            
            {
              id: "ORD001",
              recipientName: "John Doe",
              apartmentNumber: "101",
              orderNumber: "PKG001",
              packageType: "Box",
              deliveryDate: "2023-05-15",
              status: "Delivered",
            },
            {
              id: "ORD002",
              recipientName: "Jane Smith",
              apartmentNumber: "202",
              orderNumber: "PKG002",
              packageType: "Envelope",
              deliveryDate: "2023-05-16",
              status: "In Transit",
            },
          ]
    }
    return []
  })

 
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  
  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      ...orderData,
      deliveryDate: new Date().toISOString().split("T")[0], 
      status: "Processing",
    }
    setOrders([...orders, newOrder])
    return newOrder
  }

  
  const getOrderById = (id) => {
    return orders.find((order) => order.id === id) || null
  }


  const markOrderAsInvoiced = (id) => {
    const updatedOrders = orders.map((order) => (order.id === id ? { ...order, invoiced: true } : order))
    setOrders(updatedOrders)
  }


  const markOrderAsDelivered = (id) => {
    const updatedOrders = orders.map((order) => (order.id === id ? { ...order, status: "Delivered" } : order))
    setOrders(updatedOrders)
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById, markOrderAsInvoiced, markOrderAsDelivered }}>
      {children}
    </OrderContext.Provider>
  )
}



export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
