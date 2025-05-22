"use client"

import { createContext, useState, useEffect, useContext } from "react"

// Create the context
const RequestContext = createContext()

// Create a provider
export const RequestProvider = ({ children }) => {
  // Initialize state with data from localStorage if available
  const [requests, setRequests] = useState(() => {
    if (typeof window !== "undefined") {
      const savedRequests = localStorage.getItem("requests")
      return savedRequests
        ? JSON.parse(savedRequests)
        : [
            // Initial sample data
            {
              id: "REQ001",
              subject: "Leaking Faucet",
              description: "The kitchen faucet has been leaking constantly for the past two days.",
              apartmentNumber: "101",
              date: "2023-05-10",
              status: "Pending",
              notes: "",
            },
            {
              id: "REQ002",
              subject: "Electrical Issue",
              description: "The lights in the living room are flickering intermittently.",
              apartmentNumber: "203",
              date: "2023-05-12",
              status: "Approved",
              notes: "Electrician scheduled for next Monday.",
            },
            {
              id: "REQ003",
              subject: "Common Area Cleaning",
              description: "Request additional cleaning in the pool area.",
              apartmentNumber: "305",
              date: "2023-05-15",
              status: "Rejected",
              notes: "Regular cleaning is scheduled for Fridays.",
            },
          ]
    }
    return []
  })

  // Save to localStorage whenever requests change
  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests))
  }, [requests])

  // Function to add a new request
  const addRequest = (requestData) => {
    const newRequest = {
      id: `REQ${String(requests.length + 1).padStart(3, "0")}`,
      ...requestData,
      apartmentNumber: requestData.apartmentNumber || "N/A",
      date: new Date().toISOString().split("T")[0], // Current date
      status: "Pending",
      notes: "",
    }
    setRequests([...requests, newRequest])
    return newRequest
  }

  // Function to get a request by ID
  const getRequestById = (id) => {
    return requests.find((request) => request.id === id) || null
  }

  // Function to update a request's status and notes
  const updateRequestStatus = (id, status, notes = "") => {
    const updatedRequests = requests.map((request) => (request.id === id ? { ...request, status, notes } : request))
    setRequests(updatedRequests)
    return updatedRequests.find((request) => request.id === id)
  }

  return (
    <RequestContext.Provider value={{ requests, addRequest, getRequestById, updateRequestStatus }}>
      {children}
    </RequestContext.Provider>
  )
}

// Custom hook to use the request context
export const useRequests = () => {
  const context = useContext(RequestContext)
  if (!context) {
    throw new Error("useRequests must be used within a RequestProvider")
  }
  return context
}
