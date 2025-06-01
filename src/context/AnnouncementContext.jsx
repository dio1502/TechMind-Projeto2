"use client"

import { createContext, useState, useEffect, useContext } from "react"


const AnnouncementContext = createContext()


export const AnnouncementProvider = ({ children }) => {
  
  const [announcements, setAnnouncements] = useState(() => {
    if (typeof window !== "undefined") {
      const savedAnnouncements = localStorage.getItem("announcements")
      return savedAnnouncements
        ? JSON.parse(savedAnnouncements)
        : []
    }
    return []
  })
 
  useEffect(() => {
    localStorage.setItem("announcements", JSON.stringify(announcements))
  }, [announcements])

  
  const addAnnouncement = (announcementData) => {
    const newAnnouncement = {
      id: `AN${String(announcements.length + 1).padStart(3, "0")}`,
      ...announcementData,
      deliveryDate: new Date().toISOString().split("T")[0], 
    }
    setAnnouncements([...announcements, newAnnouncement])
    return newAnnouncement
  }

  
  const getAnnouncementById = (id) => {
    return announcements.find((announcement) => announcement.id === id) || null
  }

  return <AnnouncementContext.Provider value={{ announcements, addAnnouncement, getAnnouncementById }}>{children}</AnnouncementContext.Provider>
}


export const useAnnouncements = () => {
  const context = useContext(AnnouncementContext)
  if (!context) {
    throw new Error("useAnnouncement must be used within an AnnouncementProvider")
  }
  return context
}