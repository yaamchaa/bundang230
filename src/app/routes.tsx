import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { FirstyoolBrand } from './pages/FirstyoolBrand';
import { FirstyoolGallery } from './pages/FirstyoolGallery';
import { FirstyoolInformation } from './pages/FirstyoolInformation';
import { KirochadaBrand } from './pages/Kirochada';
import { KirochadaGallery } from './pages/KirochadaGallery';
import { KirochadaInformation } from './pages/KirochadaInformation';
import { ContactInquiry } from './pages/ContactInquiry';
import { ContactAgree } from './pages/ContactAgree';
import { ContactActivity } from './pages/ContactActivity';

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AdminLoginPage from './pages/admin-login';
import AdminCodesPage from './pages/admin-codes';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
      {
        path: 'admin/login',
        Component: AdminLoginPage,
      },
      {
  path: 'admin/codes',
  element: (
    <ProtectedRoute allowMember={true}>
      <AdminCodesPage />
    </ProtectedRoute>
  ),
},
      {
        path: 'firstyool',
        Component: FirstyoolBrand,
      },
      {
        path: 'firstyool/gallery',
        Component: FirstyoolGallery,
      },
      {
        path: 'firstyool/information',
        Component: FirstyoolInformation,
      },
      {
        path: 'kirochada',
        element: (
          <ProtectedRoute allowMember={true}>
            <KirochadaBrand />
          </ProtectedRoute>
        ),
      },
      {
        path: 'kirochada/gallery',
        element: (
          <ProtectedRoute allowMember={true}>
            <KirochadaGallery />
          </ProtectedRoute>
        ),
      },
      {
        path: 'kirochada/information',
        element: (
          <ProtectedRoute allowMember={true}>
            <KirochadaInformation />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contact/inquiry',
        element: (
          <ProtectedRoute allowMember={true}>
            <ContactInquiry />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contact/agree',
        element: (
          <ProtectedRoute allowMember={true}>
            <ContactAgree />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contact/activity',
        element: (
          <ProtectedRoute allowMember={true}>
            <ContactActivity />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        Component: () => (
          <div className="pt-[100px] min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-light mb-4">404</h1>
              <p className="text-gray-400">Page Not Found</p>
            </div>
          </div>
        ),
      },
    ],
    },
], {
  basename: '/bundang230',
});