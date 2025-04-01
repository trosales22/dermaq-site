import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from 'components/Wrapper'
import { Route, Routes } from "react-router-dom";
import LandingPage from 'pages/Landing';
import SessionDetailPage from 'pages/SessionDetail';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/sessions/:refno" element={<SessionDetailPage />} />
      </Routes>

      <ToastContainer />
    </Wrapper>
  )
}

export default App;
