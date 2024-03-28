import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import api from "../services/api";

const UserTablePage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [userFilters, setUserFilters] = useState({
    pageSize: 1,
    startDate: "",
    endDate: "",
    currentPage: 1,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { users, hasMore } = await api.getUsers(userFilters);

        setUsers(users);
        setHasMore(Boolean(hasMore));
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [userFilters]);

  const handlePageChange = (page) => {
    setUserFilters((prevState) => ({ ...prevState, currentPage: page }));
  };

  const handlePageSizeChange = (size) => {
    setUserFilters((prevState) => ({ ...prevState, pageSize: size }));
  };

  const handleFilterChange = (e, type) => {
    const value = e.target.value;
    if (type === "start") {
      setUserFilters((prevState) => ({ ...prevState, startDate: value }));
    } else {
      setUserFilters((prevState) => ({ ...prevState, endDate: value }));
    }
  };

  return (
    <div>
      <h1>User Table</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: "flex", gap: 15, flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 7 }}>
            <span>Filter by Date of Birth:</span>
            <input
              type="date"
              value={userFilters.startDate}
              onChange={(e) => handleFilterChange(e, "start")}
            />
            <span>to</span>
            <input
              type="date"
              value={userFilters.endDate}
              onChange={(e) => handleFilterChange(e, "end")}
            />
          </div>

          <UserTable users={users} />
          <div style={{ display: "flex", gap: 7 }}>
            <span>Page:</span>
            <button
              onClick={() => handlePageChange(userFilters.currentPage - 1)}
              disabled={userFilters.currentPage === 1 || isLoading}
            >
              Prev
            </button>
            <span>{userFilters.currentPage}</span>
            <button
              onClick={() => handlePageChange(userFilters.currentPage + 1)}
              disabled={!hasMore || isLoading}
            >
              Next
            </button>
          </div>
          <div>
            <span>Items per page:</span>
            <select
              value={userFilters.pageSize}
              onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
            >
              <option value={5}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTablePage;
