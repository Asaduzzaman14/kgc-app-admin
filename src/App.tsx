import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

const Profile = lazy(() => import('./pages/Profile'));

import { SkeletonTheme } from 'react-loading-skeleton';
import useColorMode from './hooks/useColorMode';
import Lazyloding from './components/Lazyloding';

import BizTokenDashboard from './pages/Dashboard/TizaraTokenDashboard';
import Catagory from './pages/Catagory/Catagory';
import Services from './pages/Services/Services';
import AddServices from './pages/Services/AddServices';
import Donor from './pages/Donor/Donor';
import Allusers from './pages/Users/Allusers';
import Banner from './pages/Banner/Banner';
import ProtectedRoute from './hooks/ProtectedRoute';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [colorMode] = useColorMode();

  return (
    <>
      <SkeletonTheme
        baseColor={`${colorMode === 'light' ? '#e5e6ea' : '#1d2a39'}`}
        highlightColor="#47566c"
      >
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title="SignIn" />

                <SignIn />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="KGC ADMIN" />
                <ProtectedRoute>
                  <BizTokenDashboard />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/catagory"
            element={
              <>
                <PageTitle title="Catagory" />
                <ProtectedRoute>
                  <Catagory />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/services"
            element={
              <>
                <PageTitle title="services" />
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/add-service"
            element={
              <>
                <PageTitle title="services" />
                <ProtectedRoute>
                  <AddServices />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/all-users"
            element={
              <>
                <PageTitle title="All Users" />
                <ProtectedRoute>
                  <Allusers />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/donor"
            element={
              <>
                <PageTitle title="Donors" />
                <ProtectedRoute>
                  <Donor />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/donor"
            element={
              <>
                <PageTitle title="Donors" />
                <ProtectedRoute>
                  <Donor />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/banner"
            element={
              <>
                <PageTitle title="Banner" />
                <ProtectedRoute>
                  <Banner />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile" />
                <Suspense fallback={<Lazyloding />}>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />

          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup" />
                <SignUp />
              </>
            }
          />
        </Routes>
      </SkeletonTheme>
    </>
  );
}

export default App;
