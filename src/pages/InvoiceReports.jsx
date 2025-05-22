"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import { useInvoices } from "../context/InvoiceContext"

const InvoiceReports = () => {
  const { invoices } = useInvoices()
  const [viewMode, setViewMode] = useState("byMonth") // byMonth or detailed

  // Function to ensure status is displayed correctly
  const displayStatus = (status) => {
    if (status === "Overdue") return "Missing"
    return status
  }

  // Group invoices by month
  const groupedByMonth = invoices.reduce((acc, invoice) => {
    const date = new Date(invoice.paymentDate || invoice.issueDate)
    const month = date.toLocaleString("default", { month: "long" })

    if (!acc[month]) {
      acc[month] = []
    }

    acc[month].push(invoice)
    return acc
  }, {})

  return (
    <div className="invoice-reports-page">
      <Header title="Invoice Reports" />

      <div className="view-toggle">
        <button
          className={`toggle-button ${viewMode === "byMonth" ? "active" : ""}`}
          onClick={() => setViewMode("byMonth")}
        >
          By Month
        </button>
        <button
          className={`toggle-button ${viewMode === "detailed" ? "active" : ""}`}
          onClick={() => setViewMode("detailed")}
        >
          Detailed
        </button>
      </div>

      {viewMode === "byMonth" ? (
        <div className="invoice-container">
          {Object.keys(groupedByMonth).map((month) => (
            <div key={month} className="month-section">
              <h2 className="month-title">{month}</h2>
              <div className="invoice-list">
                {groupedByMonth[month].map((invoice) => (
                  <div key={invoice.id} className="invoice-item">
                    <div className="invoice-details">
                      <div className="invoice-info">
                        <div className="invoice-id">#{invoice.id}</div>
                        <div className="invoice-apartment">Apartment: #{invoice.apartmentNumber}</div>
                      </div>
                      <div className="invoice-payment">
                        <div className="payment-date">Payment date: {invoice.paymentDate || "N/A"}</div>
                        <div className="payment-status">Payment status: {displayStatus(invoice.status)}</div>
                      </div>
                      <div className="invoice-actions">
                        <Link to={`/invoice-details/${invoice.id}`} className="details-link">
                          More details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="invoice-container detailed">
          <div className="invoice-list">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="invoice-item detailed">
                <div className="invoice-details">
                  <div className="invoice-info">
                    <div className="invoice-id">#{invoice.id}</div>
                    <div className="invoice-apartment">Apartment: #{invoice.apartmentNumber}</div>
                  </div>
                  <div className="invoice-payment">
                    <div className="payment-date">Payment date: {invoice.paymentDate || "N/A"}</div>
                    <div className="condominium-fee">Condominium fee: {invoice.fee}€</div>
                    <div className="payment-status">Payment status: {displayStatus(invoice.status)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoiceReports

