import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from '../Pages/LogIn';
import SignUp from '../pages/SignUp';
import HomeAnnoucement from '../pages/AnnouncementHome';
import ForgotPassword from '../pages/ForgotPassword';
import ForgotPasswordSelection from '../subpages/ForgotPasswordSelection';
import ForgotPasswordNewCredentials from '../subpages/ForgotPasswordNewCredentials';

import AnnouncementDetails from '../pages/AnnouncemnetDetails';
import AnnouncementHistory from "../pages/AnnouncementHistory"
import AnnouncementRegistration from '../pages/AnnouncementRegistration';

import OrderDetails from '../pages/OrderDetails';
import OrderHistory from '../pages/OrderHistory';
import OrderRegistration from '../pages/OrderRegistration';

import "../css/App.css"
import { AnnouncementProvider } from "../context/AnnouncementContext"


function App() {
  return (
  <><></><AnnouncementProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LogIn />} />

            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/password" element={<ForgotPassword />} />
            <Route path="/password-selection" element={<ForgotPasswordSelection />} />
            <Route path="/forgotpassword-newcredentials" element={<ForgotPasswordNewCredentials />} />

            <Route path="/announcement-home" element={<HomeAnnoucement />} />
            <Route path="/announcement-registration" element={<AnnouncementRegistration />} />
            <Route path="/announcement-history" element={<AnnouncementHistory />} />
            <Route path="/announcement-details/:id" element={<AnnouncementDetails />} />

            <Route path="/order-registration" element={<OrderRegistration />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-details" element={<OrderDetails />} />
          </Routes>
        </div>
      </Router>
    </AnnouncementProvider></>
  )
}


export default App
