"use client"

import { createContext, useState, useEffect, useContext } from "react"

// Create the context
const InvoiceContext = createContext()

// Create a provider component
export const InvoiceProvider = ({ children }) => {
  // Initialize state with data from localStorage if available
  const [invoices, setInvoices] = useState(() => {
    if (typeof window !== "undefined") {
      const savedInvoices = localStorage.getItem("invoices")
      return savedInvoices
        ? JSON.parse(savedInvoices)
        : [
            // Initial sample data
            {
              id: "processo-xx",
              apartmentNumber: "22y",
              issueDate: "2023-05-01",
              paymentDate: "2023-05-15",
              status: "Paid",
              fee: 50,
            },
            {
              id: "processo-yy",
              apartmentNumber: "est",
              issueDate: "2023-05-01",
              paymentDate: null,
              status: "Missing",
              fee: 50,
            },
            {
              id: "processo-zz",
              apartmentNumber: "22y",
              issueDate: "2023-04-01",
              paymentDate: "2023-04-10",
              status: "Paid",
              fee: 50,
              extraInfo: "5",
            },
            {
              id: "processo-ww",
              apartmentNumber: "22y",
              issueDate: "2023-04-01",
              paymentDate: null,
              status: "Missing",
              fee: 50,
              extraInfo: "5",
            },
          ]
    }
    return []
  })

  // When the component mounts, convert any Portuguese status values to English
  // and ensure "Overdue" is changed to "Missing"
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedInvoices = localStorage.getItem("invoices")
      if (savedInvoices) {
        const parsedInvoices = JSON.parse(savedInvoices)
        const updatedInvoices = parsedInvoices.map((invoice) => ({
          ...invoice,
          status: translateStatusToEnglish(invoice.status),
        }))

        // Only update if there were changes
        if (JSON.stringify(parsedInvoices) !== JSON.stringify(updatedInvoices)) {
          setInvoices(updatedInvoices)
          localStorage.setItem("invoices", JSON.stringify(updatedInvoices))
        }
      }
    }
  }, [])

  // Helper function to translate status
  const translateStatusToEnglish = (status) => {
    if (status === "Pago") return "Paid"
    if (status === "Em falta") return "Missing"
    if (status === "Overdue") return "Missing" // Convert any existing "Overdue" to "Missing"
    return status // Return as is if already in English or unknown
  }

  // Save to localStorage whenever invoices change
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices))
  }, [invoices])

  // Function to add a new invoice
  const addInvoice = (invoiceData) => {
    const newInvoice = {
      id: `processo-${String(invoices.length + 1).padStart(2, "0")}`,
      issueDate: new Date().toISOString().split("T")[0],
      paymentDate: null,
      status: "Missing",
      ...invoiceData,
    }
    setInvoices([...invoices, newInvoice])
    return newInvoice
  }

  // Function to get invoice by ID
  const getInvoiceById = (id) => {
    return invoices.find((invoice) => invoice.id === id) || null
  }

  // Function to update invoice status
  const updateInvoiceStatus = (id, status, paymentMethod = null) => {
    // Ensure we're using "Missing" instead of "Overdue"
    const normalizedStatus = status === "Overdue" ? "Missing" : status

    const updatedInvoices = invoices.map((invoice) => {
      if (invoice.id === id) {
        return {
          ...invoice,
          status: normalizedStatus,
          paymentDate: normalizedStatus === "Paid" ? new Date().toISOString().split("T")[0] : invoice.paymentDate,
          paymentMethod: normalizedStatus === "Paid" ? paymentMethod || "Card" : invoice.paymentMethod,
        }
      }
      return invoice
    })
    setInvoices(updatedInvoices)
  }

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, getInvoiceById, updateInvoiceStatus }}>
      {children}
    </InvoiceContext.Provider>
  )
}

// Custom hook to use the invoice context
export const useInvoices = () => {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error("useInvoices must be used within an InvoiceProvider")
  }
  return context
}
