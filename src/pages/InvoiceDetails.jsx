"use client"

import { Link, useParams } from "react-router-dom"
import Header from "../components/Header"
import { useInvoices } from "../context/InvoiceContext"

const InvoiceDetails = () => {
  const { id } = useParams()
  const { getInvoiceById } = useInvoices()
  const invoice = getInvoiceById(id)

  // Function to ensure status is displayed correctly
  const displayStatus = (status) => {
    if (status === "Overdue") return "Missing"
    return status
  }

  // Function to get the correct CSS class for status
  const getStatusClass = (status) => {
    if (status === "Overdue") return "missing"
    return status.toLowerCase().replace(" ", "-")
  }

  if (!invoice) {
    return (
      <div className="invoice-details-page">
        <Header title="Invoice Details" />
        <div className="not-found-container">
          <p>Invoice not found</p>
          <Link to="/invoice-history" className="back-button">
            ← Back to History
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="invoice-details-page">
      <Header title={`Invoice Details: #${invoice.id}`} />

      <div className="invoice-details-container">
        <div className="invoice-details-section">
          <h2 className="section-title">Invoice Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Invoice Number:</span>
              <span className="detail-value">{invoice.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Apartment:</span>
              <span className="detail-value">#{invoice.apartmentNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className={`detail-value status-badge status-${getStatusClass(invoice.status)}`}>
                {displayStatus(invoice.status)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Issue Date:</span>
              <span className="detail-value">{invoice.issueDate}</span>
            </div>
          </div>
        </div>

        <div className="invoice-details-section">
          <h2 className="section-title">Payment Details</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Condominium Fee:</span>
              <span className="detail-value">{invoice.fee}€</span>
            </div>
            {invoice.extraInfo && (
              <div className="detail-item">
                <span className="detail-label">Electricity:</span>
                <span className="detail-value">#{invoice.extraInfo}</span>
              </div>
            )}
            <div className="detail-item">
              <span className="detail-label">Payment Date:</span>
              <span className="detail-value">{invoice.paymentDate || "Not paid"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-value">{invoice.paymentMethod || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="actions-container">
          <Link to="/invoice-history" className="back-button">
            ← Back to History
          </Link>

          {invoice.status !== "Paid" && (
            <Link to={`/invoice-payment/${invoice.id}`} className="pay-button">
              Pay Invoice
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetails


