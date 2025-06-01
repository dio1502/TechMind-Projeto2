"use client"

import { useState, useEffect } from "react"
import Header from "../../components/Header"
import { useRequests } from "../../context/RequestContext"
import { useAuth } from "../../context/AuthContext"
import { Navigate } from "react-router-dom"

const RequestManagement = () => {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />
  }

  const { requests, updateRequestStatus } = useRequests()

  // Filter to only show pending requests
  const pendingRequests = requests.filter((request) => request.status === "Pending")

  const [selectedRequest, setSelectedRequest] = useState(pendingRequests[0] || null)
  const [actionNote, setActionNote] = useState("")
  const [managementRequests, setManagementRequests] = useState(pendingRequests)

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [processedRequest, setProcessedRequest] = useState(null)

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

  // Placeholder para os botões de aprovação/rejeição (usaria {user.role === "admin"} aqui)
  // Exemplo:
  // {user.role === "admin" && (
  //   <>
  //     <button onClick={handleApprove}>Aprovar</button>
  //     <button onClick={handleReject}>Recusar</button>
  //   </>
  // )}

  return (
    <>
      <Header title="Gestão de Pedidos" />
      {/* ...restante conteúdo da página... */}
    </>
  )
}

export default RequestManagement