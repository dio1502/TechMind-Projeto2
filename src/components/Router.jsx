import { Routes, Route, Navigate } from 'react-router-dom';
import LogIn from '../pages/subpage-login/LogIn';
import SignUp from '../pages/subpage-login/SignUp';
import HomeAnnoucement from '../pages/subpage-announcement/AnnouncementHome';
import ForgotPassword from '../pages/subpage-login/ForgotPassword';
import ForgotPasswordSelection from '../pages/subpage-login/subpage-password/ForgotPasswordSelection';
import ForgotPasswordNewCredentials from '../pages/subpage-login/subpage-password/ForgotPasswordNewCredentials';
import { AuthProvider } from '../context/AuthContext.jsx';
import RequireAuth from "../components/requireAuth.jsx";
import RequireRole from "../components/requireRole.jsx";

import AnnouncementDetails from '../pages/subpage-announcement/AnnouncemnetDetails';
import AnnouncementHistory from "../pages/subpage-announcement/AnnouncementHistory"
import AnnouncementRegistration from '../pages/subpage-announcement/AnnouncementRegistration';

import OrderDetails from '../pages/subpage-order/OrderDetails';
import OrderHistory from '../pages/subpage-order/OrderHistory';
import OrderRegistration from '../pages/subpage-order/OrderRegistration';

import CreateRequest from "../pages/subpage-request/CreateRequest"
import RequestStatus from "../pages/request/RequestStatus.jsx"
import RequestList from '../pages/request/RequestList';
import RequestManagement from "../pages/request/RequestManagement"

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
            <AuthProvider>
              <div className="app">
                <Routes>
                <Route path="/" element={<LogIn />} />

                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/password" element={<ForgotPassword />} />
                <Route path="/password-selection" element={<ForgotPasswordSelection />} />
                <Route path="/forgotpassword-newcredentials" element={<ForgotPasswordNewCredentials />} />

                {/* QUALQUER ROTA ABAIXO SÓ ACESSÍVEL SE ESTIVER LOGADO */}
                <Route element={<RequireAuth />}>
                  {/* Páginas disponíveis para qualquer usuário logado (admin ou user) */}
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

                  <Route path="/invoice-reports" element={<InvoiceReports />} />
                  <Route path="/invoice-history" element={<InvoiceHistory />} />
                  <Route path="/invoice-details/:id" element={<InvoiceDetails />} />
                  <Route path="/invoice-payment/:id" element={<InvoicePayment />} />
                </Route>

                {/* ROTAS SÓ PARA ADMIN */}
                <Route element={<RequireRole role="admin" />}>
                  <Route path="/request-management" element={<RequestManagement />} />
                  <Route path="/ordermanagement" element={<OrderManagement />} />
                </Route>
                  
                  {/* Se nada bater, redireciona para / */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </AuthProvider>
          </InvoiceProvider>
        </RequestProvider>
      </OrderProvider>
    </AnnouncementProvider>
  )
}

export default App