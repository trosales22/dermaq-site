import './App.css';
import Wrapper from 'components/Wrapper';
import { Route, Routes } from 'react-router-dom';
import LandingPage from 'pages/Landing';
import SessionDetailPage from 'pages/SessionDetail';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';
import ProtectedRoute from 'components/ProtectedRoute';
import ProfilePage from 'pages/Profile';
import UnauthenticatedRoute from 'components/UnauthenticatedRoute';
import ReservationPage from 'pages/Reservation';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<UnauthenticatedRoute />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reservations" element={<ReservationPage />} />
        </Route>

        <Route path="/sessions/:refno" element={<SessionDetailPage />} />
      </Routes>

      <Toaster />
    </Wrapper>
  );
}

export default App;
