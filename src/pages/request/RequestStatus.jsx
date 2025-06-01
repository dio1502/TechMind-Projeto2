"use client";

import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import { useRequests } from "../../context/RequestContext";

const RequestStatus = () => {
  const { id } = useParams();
  const { getRequestById } = useRequests();
  const request = getRequestById(id);

  if (!request) {
    return (
      <div className="request-status-page">
        <Header title="Request Status" />
        <div className="not-found-container">
          <p>Request not found</p>
          <Link to="/" className="back-button">
            ← Back to main menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="request-status-page">
      <Header title="Request Status" />

      <div className="order-details-container">
        <div className="detail-row">
          <label>Process #:</label>
          <div className="detail-value">{request.id}</div>
        </div>

        <div className="detail-row">
          <label>Subject:</label>
          <div className="detail-value">{request.subject}</div>
        </div>

        <div className="detail-row">
          <label>Description:</label>
          <div className="detail-value scrollable">{request.description}</div>
        </div>

        <div className="detail-row">
          <label>Decision regarding the request:</label>
          <div className="detail-value">{request.status}</div>
        </div>

        <div className="detail-row">
          <label>Notes:</label>
          <div className="detail-value scrollable">{request.notes || "No notes available"}</div>
        </div>
      </div>
    </div>
  );
};

export default RequestStatus;
