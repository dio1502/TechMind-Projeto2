"use client"

import { createContext, useState, useEffect, useContext } from "react"


const InvoiceContext = createContext()


export const InvoiceProvider = ({ children }) => {

  const [invoices, setInvoices] = useState(() => {
    if (typeof window !== "undefined") {
      const savedInvoices = localStorage.getItem("invoices")
      return savedInvoices
        ? JSON.parse(savedInvoices)
        : [

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


  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedInvoices = localStorage.getItem("invoices")
      if (savedInvoices) {
        const parsedInvoices = JSON.parse(savedInvoices)
        const updatedInvoices = parsedInvoices.map((invoice) => ({
          ...invoice,
          status: translateStatusToEnglish(invoice.status),
        }))


        if (JSON.stringify(parsedInvoices) !== JSON.stringify(updatedInvoices)) {
          setInvoices(updatedInvoices)
          localStorage.setItem("invoices", JSON.stringify(updatedInvoices))
        }
      }
    }
  }, [])


  const translateStatusToEnglish = (status) => {
    if (status === "Pago") return "Paid"
    if (status === "Em falta") return "Missing"
    if (status === "Overdue") return "Missing" 
    return status 
  }


  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices))
  }, [invoices])


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


  const getInvoiceById = (id) => {
    return invoices.find((invoice) => invoice.id === id) || null
  }


  const updateInvoiceStatus = (id, status, paymentMethod = null) => {

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


export const useInvoices = () => {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error("useInvoices must be used within an InvoiceProvider")
  }
  return context
}
