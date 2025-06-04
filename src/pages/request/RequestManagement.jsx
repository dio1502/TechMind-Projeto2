
"use client";

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { useRequests } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";

const RequestManagement = () => {
  const { user } = useAuth();


  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }


  const { requests, updateRequestStatus } = useRequests();


  const [managementRequests, setManagementRequests] = useState(requests);
  const [selectedRequest, setSelectedRequest] = useState(
    requests[0] || null
  );
  const [actionNote, setActionNote] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [processedRequest, setProcessedRequest] = useState(null);


  useEffect(() => {
    setManagementRequests(requests);
    if (requests.length > 0) {
      setSelectedRequest((prev) => {

        if (!prev || !requests.find((r) => r.id === prev.id)) {
          return requests[0];
        }
        return prev;
      });
      setActionNote("");
    } else {
      setSelectedRequest(null);
      setActionNote("");
    }
  }, [requests]);


  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    setActionNote(request.notes || "");
  };


  const handleApprove = () => {
    if (!selectedRequest) return;

    updateRequestStatus(selectedRequest.id, "Approved", actionNote);

    setProcessedRequest({
      id: selectedRequest.id,
      date: selectedRequest.date,
      status: "Approved",
    });
    setShowModal(true);


    const updated = managementRequests.filter(
      (r) => r.id !== selectedRequest.id
    );
    setManagementRequests(updated);
    if (updated.length > 0) {
      setSelectedRequest(updated[0]);
      setActionNote("");
    } else {
      setSelectedRequest(null);
      setActionNote("");
    }
  };


  const handleReject = () => {
    if (!selectedRequest) return;

    updateRequestStatus(selectedRequest.id, "Rejected", actionNote);

    setProcessedRequest({
      id: selectedRequest.id,
      date: selectedRequest.date,
      status: "Rejected",
    });
    setShowModal(true);

    const updated = managementRequests.filter(
      (r) => r.id !== selectedRequest.id
    );
    setManagementRequests(updated);
    if (updated.length > 0) {
      setSelectedRequest(updated[0]);
      setActionNote("");
    } else {
      setSelectedRequest(null);
      setActionNote("");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  if (managementRequests.length === 0 && !showModal) {
    return (
      <div className="request-management-page">
        <Header title="Gestão de Pedidos" />
        <div className="no-requests">
          <p>There are no pending orders to manage.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="request-management-page">
      <Header title="Order Management" />

      <div className="management-container">
        <div className="management-header">
          <h2>Pending Orders ({managementRequests.length})</h2>
        </div>

        <div className="management-layout">

          <div className="request-list-container">
            <h3>Select an order</h3>
            <div className="request-list">
              {managementRequests.map((request) => (
                <div
                  key={request.id}
                  className={`request-list-item ${
                    selectedRequest?.id === request.id ? "active" : ""
                  }`}
                  onClick={() => handleSelectRequest(request)}
                >
                  <div className="request-list-header">
                    <span className="request-id">#{request.id}</span>
                    <span className="request-date">{request.date}</span>
                  </div>
                  <div className="request-list-subject">{request.subject}</div>
                  <div className="request-list-apartment">
                    Apt: {request.apartmentNumber || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>


          {selectedRequest && (
            <div className="request-details-panel">
              <h3>Order Deatils</h3>
              <div className="request-management-details">
                <div className="detail-row">
                  <label>Process Number:</label>
                  <div className="detail-value">{selectedRequest.id}</div>
                </div>
                <div className="detail-row">
                  <label>Date:</label>
                  <div className="detail-value">{selectedRequest.date}</div>
                </div>
                <div className="detail-row">
                  <label>Apartment:</label>
                  <div className="detail-value">
                    {selectedRequest.apartmentNumber || "N/A"}
                  </div>
                </div>
                <div className="detail-row">
                  <label>Topic:</label>
                  <div className="detail-value">{selectedRequest.subject}</div>
                </div>
                <div className="detail-row">
                  <label>Description:</label>
                  <div className="detail-value scrollable">
                    {selectedRequest.description}
                  </div>
                </div>
                <div className="detail-row">
                  <label>Notes:</label>
                  <textarea
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                    className="action-note"
                    placeholder="Enter notes about your decision..."
                    rows="3"
                  />
                </div>

                <div className="action-buttons">
                  <button
                    className="approve-button"
                    onClick={handleApprove}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button"
                    onClick={handleReject}
                  >
                    Refuse
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


      {showModal && processedRequest && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon-container">
              <div
                className="success-icon-bg"
                style={{
                  backgroundColor:
                    processedRequest.status === "Approved"
                      ? "#dcfce7"
                      : "#fee2e2",
                }}
              >
                {processedRequest.status === "Approved" ? (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="#22c55e"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>

            <h2 className="success-title">
              Order{" "}
              {processedRequest.status === "Approved"
                ? "Aprovado"
                : "Recusado"}{" "}
              placed successguly!
            </h2>
            <p className="success-subtitle">
              The order{" "}
              {processedRequest.status.toLowerCase()} was updated in the system.
            </p>

            <div className="order-info-list">
              <div className="info-item">
                <div className="info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Order ID</span>
                  <span className="info-value">{processedRequest.id}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    <line
                      x1="3"
                      y1="10"
                      x2="21"
                      y2="10"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Date</span>
                  <span className="info-value">{processedRequest.date}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Status</span>
                  <span className="info-value">{processedRequest.status}</span>
                </div>
              </div>
            </div>

            <div className="modal-buttons">
              <button className="continue-button" onClick={handleCloseModal}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RequestManagement;
