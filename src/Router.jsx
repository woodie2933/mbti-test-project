import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import TestPage from "./pages/TestPage";
import TestResultPage from "./pages/TestResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState({});

  return (
    <Router>
      <Layout>
        <Routes>
          <Route>
            <Route
              path="/"
              element={
                <Home
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/result" element={<TestResultPage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
