"use client"

import { useState } from "react"
import Header from "../../components/Header"
import { Link } from "react-router-dom"
import { useAnnouncements } from "../../context/AnnouncementContext"


const AnnouncementHistory = () => {
  const { announcements } = useAnnouncements()
  const [searchTerm, setSearchTerm] = useState("")

  
  const filteredAnnouncements = announcements.filter((announcement) => {
    const searchLower = searchTerm.toLowerCase()

    // Pesquisa original por nome, número da encomenda e ID
    const matchesText =
      announcement.subject?.toLowerCase().includes(searchLower) ||
      announcement.description?.toLowerCase().includes(searchLower) 

    // Pesquisa por data (nova funcionalidade)
    const matchesDate =
      announcement.deliveryDate &&
      // Full date match (YYYY-MM-DD)
        (announcement.deliveryDate.includes(searchTerm) ||
        // Year match (YYYY)
          announcement.deliveryDate.startsWith(searchTerm) ||
        // Month/Year match (MM/YYYY format converted to YYYY-MM)
        (searchTerm.includes("/") && announcement.deliveryDate.includes(searchTerm.split("/").reverse().join("-"))) ||
        // Day/Month match (DD/MM format)
        (searchTerm.includes("/") &&
          searchTerm.length <= 5 &&
          announcement.deliveryDate.slice(5).replace("-", "/").includes(searchTerm)) ||
        // Formatted date display match (DD/MM/YYYY)
        new Date(announcement.deliveryDate)
          .toLocaleDateString("pt-PT")
          .includes(searchTerm) ||
        new Date(announcement.deliveryDate).toLocaleDateString("en-GB").includes(searchTerm))

    return matchesText || matchesDate
  })

  return (
    <div className="announcement-history-page">
      <Header title="Announcement History" />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search announcement..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredAnnouncements.length === 0 ? (
        <div className="no-announcements">
          <p>No announcements found. {searchTerm ? "Try a different search term." : "Register a new announcement to get started."}</p>
          {!searchTerm && (
            <Link to="/announcement-registration" className="register-link">
              Register New Announcement
            </Link>
          )}
        </div>
      ) : (
        <div className="announcements-container">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="announcement-item">
              <div className="announcement-details">
                <div className="announcement-info">
                  <p className="announcement-id">Announcement #{announcement.id}</p>
                  <p className="delivery-date">Delivery date: {announcement.deliveryDate}</p>
                  <p className="announcement-subject">Subject: {announcement.subject}</p>
                  <p className="announcement-description">Description: {announcement.description}</p>
                  <Link to={`/announcement-details/${announcement.id}`} className="more-details-link">
                    More details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AnnouncementHistory