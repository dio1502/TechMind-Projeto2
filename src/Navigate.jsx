
import { createContext, useContext, useState } from "react"

const NavigateContext = createContext()

export function NavigateProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("login") // colocamos o Login como pagina atual-inicial


  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  return <NavigateContext.Provider value={{ currentPage, navigateTo }}>{children}</NavigateContext.Provider>
}


export function useNavigate() {
  const context = useContext(NavigateContext)
  return context
}


export const navigateToLogin = (navigate) => {
  navigate("login")
}

export const navigateToSignup = (navigate) => {
  navigate("signup")
}

/*export const navigateToHome = (navigate) => {
  navigate("home")
}*/