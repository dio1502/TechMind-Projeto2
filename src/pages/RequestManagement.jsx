"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import { useRequests } from "../context/RequestContext"

const RequestManagement = () => {
  const { requests, updateRequestStatus } = useRequests()

  // Filter to only show pending requests
  const pendingRequests = requests.filter((request) => request.status === "Pending")

  const [selectedRequest, setSelectedRequest] = useState(pendingRequests[0] || null)
  const [actionNote, setActionNote] = useState("")
  const [managementRequests, setManagementRequests] = useState(pendingRequests)

  // Update selected request when pending requests change
  useEffect(() => {
    setManagementRequests(pendingRequests)
    if (pendingRequests.length > 0 && (!selectedRequest || !pendingRequests.find((r) => r.id === selectedRequest.id))) {
      setSelectedRequest(pendingRequests[0])
      setActionNote("")
    } else if (pendingRequests.length === 0) {
      setSelectedRequest(null)
      setActionNote("")
    }
  }, [pendingRequests, selectedRequest])

  // Handle selecting a request
  const handleSelectRequest = (request) => {
    setSelectedRequest(request)
    setActionNote(request.notes || "")
  }

  // Handle approving a request
  const handleApprove = () => {
    if (!selectedRequest) return

    updateRequestStatus(selectedRequest.id, "Approved", actionNote)

    // Remove the request from the management list
    const updatedRequests = managementRequests.filter((request) => request.id !== selectedRequest.id)

    setManagementRequests(updatedRequests)

    // Select the next request if available
    if (updatedRequests.length > 0) {
      setSelectedRequest(updatedRequests[0])
      setActionNote("")
    } else {
      setSelectedRequest(null)
      setActionNote("")
    }

    alert("Request approved successfully!")
  }

  // Handle rejecting a request
  const handleReject = () => {
    if (!selectedRequest) return

    updateRequestStatus(selectedRequest.id, "Rejected", actionNote)

    // Remove the request from the management list
    const updatedRequests = managementRequests.filter((request) => request.id !== selectedRequest.id)

    setManagementRequests(updatedRequests)

    // Select the next request if available
    if (updatedRequests.length > 0) {
      setSelectedRequest(updatedRequests[0])
      setActionNote("")
    } else {
      setSelectedRequest(null)
      setActionNote("")
    }

    alert("Request rejected.")
  }

  if (managementRequests.length === 0) {
    return (
      <div className="request-management-page">
        <Header title="Request Management" />
        <div className="no-requests">
          <p>No pending requests to manage.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="request-management-page">
      <Header title="Request Management" />

      <div className="management-container">
        <div className="management-header">
          <h2>Pending Requests ({managementRequests.length})</h2>
        </div>

        <div className="management-layout">
          <div className="request-list-container">
            <h3>Select a Request</h3>
            <div className="request-list">
              {managementRequests.map((request) => (
                <div
                  key={request.id}
                  className={`request-list-item ${selectedRequest?.id === request.id ? "active" : ""}`}
                  onClick={() => handleSelectRequest(request)}
                >
                  <div className="request-list-header">
                    <span className="request-id">#{request.id}</span>
                    <span className="request-date">{request.date}</span>
                  </div>
                  <div className="request-list-subject">{request.subject}</div>
                  <div className="request-list-apartment">Apt: {request.apartmentNumber || "N/A"}</div>
                </div>
              ))}
            </div>
          </div>

          {selectedRequest && (
            <div className="request-details-panel">
              <h3>Request Details</h3>
              <div className="request-management-details">
                <div className="detail-row">
                  <label>Process #:</label>
                  <div className="detail-value">{selectedRequest.id}</div>
                </div>

                <div className="detail-row">
                  <label>Date:</label>
                  <div className="detail-value">{selectedRequest.date}</div>
                </div>

                <div className="detail-row">
                  <label>Apartment #:</label>
                  <div className="detail-value">{selectedRequest.apartmentNumber || "N/A"}</div>
                </div>

                <div className="detail-row">
                  <label>Subject:</label>
                  <div className="detail-value">{selectedRequest.subject}</div>
                </div>

                <div className="detail-row">
                  <label>Description:</label>
                  <div className="detail-value scrollable">{selectedRequest.description}</div>
                </div>

                <div className="detail-row">
                  <label>Action Notes:</label>
                  <textarea
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                    className="action-note"
                    placeholder="Enter notes about your decision..."
                    rows="3"
                  ></textarea>
                </div>

                <div className="action-buttons">
                  <button className="approve-button" onClick={handleApprove}>
                    Approve
                  </button>
                  <button className="reject-button" onClick={handleReject}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestManagement
