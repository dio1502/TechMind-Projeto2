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

  return <OrderContext.Provider value={{ orders, addOrder, getOrderById }}>{children}</OrderContext.Provider>
}


export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
