"use client"

import { createContext, useState, useEffect, useContext } from "react"


const RequestContext = createContext()


export const RequestProvider = ({ children }) => {

  const [requests, setRequests] = useState(() => {
    if (typeof window !== "undefined") {
      const savedRequests = localStorage.getItem("requests")
      return savedRequests
        ? JSON.parse(savedRequests)
        : [
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


  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests))
  }, [requests])


  const addRequest = (requestData) => {
    const newRequest = {
      id: `REQ${String(requests.length + 1).padStart(3, "0")}`,
      ...requestData,
      apartmentNumber: requestData.apartmentNumber || "N/A",
      date: new Date().toISOString().split("T")[0], 
      status: "Pending",
      notes: "",
    }
    setRequests([...requests, newRequest])
    return newRequest
  }


  const getRequestById = (id) => {
    return requests.find((request) => request.id === id) || null
  }


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


export const useRequests = () => {
  const context = useContext(RequestContext)
  if (!context) {
    throw new Error("useRequests must be used within a RequestProvider")
  }
  return context
}
