import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Breathing from "./pages/Breathing";
import Playgames from "./pages/Playgames";
import AuthPage from "./pages/authPage";
import "./App.css";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // ✅ If user logs in, send email to backend (PORT 5001)
      if (currentUser) {
        try {
          await axios.post("http://localhost:5001/api/save-email", {
            email: currentUser.email,
          });
          console.log("✅ User email sent to backend for reminders");
        } catch (error) {
          console.error("❌ Error sending email request to backend:", error);
        }
      }
    });
  }, []);

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // ✅ Ensure UI updates immediately
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ✅ Show Auth Page if User is Not Logged In
  if (!user) {
    return <AuthPage onAuthSuccess={() => setUser(auth.currentUser)} />;
  }

  return (
    <Router>
      <nav className="navbar">
        <ul className="mynav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <a
              href="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/04/20/20250304201104-D7QUHHCH.json"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chatbot
            </a>
          </li>
          <li className="nav-item">
            <Link to="/tools" className="nav-link">Tools</Link>
          </li>

          {/* ✅ Community Support Dropdown */}
          <li className="nav-item dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}>
            <span className="nav-link">Community Support ▾</span>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="http://localhost:7001" className="dropdown-item">Anonymous Chat</Link></li>
                <li><Link to="http://localhost:5555" className="dropdown-item">Posts</Link></li>
                <li><Link to="http://localhost:4000" className="dropdown-item">Journal</Link></li>
              </ul>
            )}
          </li>

          {/* ✅ User Email Dropdown */}
          <li className="nav-item dropdown"
              onMouseEnter={() => setUserDropdown(true)}
              onMouseLeave={() => setUserDropdown(false)}>
            <span className="nav-link">{user?.email || "User"} ▾</span>
            {userDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home userEmail={user?.email} />} />
          <Route path="/tools" element={<Games />} />
          <Route path="/tools/breathing" element={<Breathing />} />
          <Route path="/tools/playgames" element={<Playgames />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
