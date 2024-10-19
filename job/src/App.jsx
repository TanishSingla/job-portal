import NavbarComp from './components/NavbarComp';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import SendMail from './pages/SendMail';
import VerifyPage from './pages/VerifyPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useUserStore } from './store/useUserStore';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import CreateJobPostPage from './pages/CreateJobPostPage';
import JobPostedByMe from './pages/JobPostedByMe';


function App() {
  const { user, profile } = useUserStore();

  useEffect(() => {
    profile();
  }, [profile]);

  const isLoggedIn = user && (user.isEmailVerified || user.isMobileVerified);

  return (
    <Router>
      <NavbarComp userName={isLoggedIn ? user.name : null} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <SignUpPage />} />
        <Route path="/verify" element={isLoggedIn ? <Navigate to="/home" /> : <VerifyPage />} />
        <Route path="/sendmail" element={isLoggedIn ? <SendMail />
          : <Navigate to="/" />} />
        <Route path="/createJobPost" element={isLoggedIn ? <CreateJobPostPage />
          : <Navigate to="/" />} />
        <Route path="/jobPostedByMe" element={isLoggedIn ? < JobPostedByMe />
          : <Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
