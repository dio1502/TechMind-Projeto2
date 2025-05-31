import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LogIn from '../pages/subpage-login/LogIn';
import SignUp from '../pages/subpage-login/SignUp';
import HomeAnnoucement from '../pages/subpage-announcement/AnnouncementHome';
import ForgotPassword from '../pages/subpage-login/ForgotPassword';
import ForgotPasswordSelection from '../pages/subpage-login/subpage-password/ForgotPasswordSelection';
import ForgotPasswordNewCredentials from '../pages/subpage-login/subpage-password/ForgotPasswordNewCredentials';

import AnnouncementDetails from '../pages/subpage-announcement/AnnouncemnetDetails';
import AnnouncementHistory from "../pages/subpage-announcement/AnnouncementHistory"
import AnnouncementRegistration from '../pages/subpage-announcement/AnnouncementRegistration';

import OrderDetails from '../pages/subpage-order/OrderDetails';
import OrderHistory from '../pages/subpage-order/OrderHistory';
import OrderRegistration from '../pages/subpage-order/OrderRegistration';

import CreateRequest from "../pages/subpage-request/CreateRequest"
import RequestStatus from "../pages/subpage-request/RequestStatus"
import RequestList from '../pages/subpage-request/RequestList';
import RequestManagement from "../pages/subpage-request/RequestManagement"

import InvoiceReports from "../pages/invoice/InvoiceReports"
import InvoiceHistory from "../pages/invoice/InvoiceHistory"
import InvoiceDetails from "../pages/invoice/InvoiceDetails"
import InvoicePayment from "../pages/invoice/InvoicePayment"

import { OrderProvider } from '../context/OrderContext';
import { RequestProvider } from "../context/RequestContext"
import { InvoiceProvider } from '../context/InvoiceContext';

import OrderManagement from '../pages/subpage-order/OrderManagement';

import HomePage from '../HomePage';
import "../css/App.css"
import { AnnouncementProvider } from "../context/AnnouncementContext"


function App() {
  return (
    <AnnouncementProvider>
      <OrderProvider>
        <RequestProvider>
          <InvoiceProvider>
            <Router>
              <div className="app">
                <Routes>
                <Route path="/" element={<LogIn />} />

                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/password" element={<ForgotPassword />} />
                <Route path="/password-selection" element={<ForgotPasswordSelection />} />
                <Route path="/forgotpassword-newcredentials" element={<ForgotPasswordNewCredentials />} />

                <Route path="/homepage" element={<HomePage />} />

                <Route path="/announcement-registration" element={<AnnouncementRegistration />} />
                <Route path="/announcement-history" element={<AnnouncementHistory />} />
                <Route path="/announcement-details/:id" element={<AnnouncementDetails />} />

                <Route path="/order-registration" element={<OrderRegistration />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/order-details/:id" element={<OrderDetails />} />

                <Route path="/create-request" element={<CreateRequest />} />
                <Route path="/request-status/:id" element={<RequestStatus />} />
                <Route path="/request-list" element={<RequestList />} />
                <Route path="/order-management" element={<OrderManagement />} />
                <Route path="/request-management" element={<RequestManagement />} />

                <Route path="/invoice-reports" element={<InvoiceReports />} />
                <Route path="/invoice-history" element={<InvoiceHistory />} />
                <Route path="/invoice-details/:id" element={<InvoiceDetails />} />
                <Route path="/invoice-payment/:id" element={<InvoicePayment />} />
                </Routes>
              </div>
            </Router>
          </InvoiceProvider>
        </RequestProvider>
      </OrderProvider>
    </AnnouncementProvider>
  )
}

export default App
