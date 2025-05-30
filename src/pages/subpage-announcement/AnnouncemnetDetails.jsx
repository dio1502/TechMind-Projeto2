"use client"

import { useParams, Link } from "react-router-dom"
import Header from "../../components/Header"
import { useAnnouncements } from "../../context/AnnouncementContext"

const AnnouncementDetails = () => {
  const { id } = useParams()
  const { getAnnouncementById } = useAnnouncements()
  const announcement = getAnnouncementById(id)

  if (!announcement) {
    return (
      <div className="announcement-details-page">
        <Header title="Announcement Details" />
        <div className="loading-container">
          <p>Order not found</p>
          <Link to="/announcement-history" className="back-button">
            ← Back to Announcement History
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="announcement-details-page">
      <Header title={`Announcement Details: #${announcement.id}`} />

      <div className="announcement-details-container">
        <div className="announcement-details-section">
          <h2 className="section-title">Announcement Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Announcement Subject:</span>
              <span className="detail-value">{announcement.subject}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Announcement Description:</span>
              <span className="detail-value">{announcement.description}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Announcement ID:</span>
              <span className="detail-value">{announcement.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Delivery Date:</span>
              <span className="detail-value">{announcement.deliveryDate}</span>
            </div>
          </div>
        </div>

        

        <div className="actions-container">
          <Link to="/announcement-history" className="back-button">
            ← Back to Announcement History
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementDetails
