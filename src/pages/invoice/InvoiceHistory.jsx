"use client"

import { Link } from "react-router-dom"
import Header from "../../components/Header"
import { useInvoices } from "../../context/InvoiceContext"

const InvoiceHistory = () => {
  const { invoices } = useInvoices()


  const displayStatus = (status) => {
    if (status === "Overdue") return "Missing"
    return status
  }

  return (
    <div className="invoice-history-page">
      <Header title="Invoice History" />

      <div className="invoice-container">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="invoice-item">
            <div className="invoice-details">
              <div className="invoice-info">
                <div className="invoice-id">#{invoice.id}</div>
                <div className="payment-date">Payment date: {invoice.paymentDate || "N/A"}</div>
                <div className="payment-status">Payment status: {displayStatus(invoice.status)}</div>
              </div>
              <div className="invoice-actions">
                <Link to={`/invoice-details/${invoice.id}`} className="details-link">
                  More details
                </Link>
              </div>
            </div>
            {invoice.extraInfo && (
              <div className="extra-info">
                <div className="extra-info-label">Electricity: #{invoice.extraInfo}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvoiceHistory


