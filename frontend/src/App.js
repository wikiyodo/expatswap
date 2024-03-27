import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUserPage from "./pages/CreateUserPage";
import UserTablePage from "./pages/UserTablePage";
import "./App.css";

const App = () => {
  useEffect(() => {
    // Set page title to "Expatswap"
    document.title = "Expatswap";
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>Expatswap User Management</h1>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/create-user">Create User</a>
              </li>
              <li>
                <a href="/user-table">User Table</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={<h2>Welcome to Expatswap User Management</h2>}
            />
            <Route path="/create-user" element={<CreateUserPage />} />
            <Route path="/user-table" element={<UserTablePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
