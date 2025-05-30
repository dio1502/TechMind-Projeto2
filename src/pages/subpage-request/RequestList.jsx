"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import { useRequests } from "../../context/RequestContext"

const RequestList = () => {
  const { requests } = useRequests()
  const [searchTerm, setSearchTerm] = useState("")


  const filteredRequests = requests.filter((request) => {
    const searchLower = searchTerm.toLowerCase()


    const matchesText =
      request.subject?.toLowerCase().includes(searchLower) || request.id?.toLowerCase().includes(searchLower)


    const matchesDate =
      request.date &&

      (request.date.includes(searchTerm) ||

        request.date.startsWith(searchTerm) ||

        (searchTerm.includes("/") && request.date.includes(searchTerm.split("/").reverse().join("-"))) ||

        (searchTerm.includes("/") &&
          searchTerm.length <= 5 &&
          request.date.slice(5).replace("-", "/").includes(searchTerm)) ||

        new Date(request.date)
          .toLocaleDateString("pt-PT")
          .includes(searchTerm) ||
        new Date(request.date).toLocaleDateString("en-GB").includes(searchTerm))

    return matchesText || matchesDate
  })

  return (
    <div className="request-list-page">
      <Header title="Request List" />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search requests by subject, ID, or date..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredRequests.length === 0 ? (
        <div className="no-requests">
          <p>
            No requests found. {searchTerm ? "Try a different search term." : "Create a new request to get started."}
          </p>
          {!searchTerm && (
            <Link to="/create-request" className="create-link">
              Create New Request
            </Link>
          )}
        </div>
      ) : (
        <div className="orders-container">
          {filteredRequests.map((request) => (
            <div key={request.id} className="request-item">
              <div className="request-header">
                <div className="request-id">Request #{request.id}</div>
                <div className="request-status">{request.status}</div>
              </div>
              <div className="request-details">
                <div className="request-subject">Subject: {request.subject}</div>
                <div className="request-apartment">Apartment: {request.apartmentNumber}</div>
                <div className="request-date">Date: {request.date}</div>
              </div>
              <div className="request-actions">
                <Link to={`/request-status/${request.id}`} className="details-link">
                  More details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RequestList

