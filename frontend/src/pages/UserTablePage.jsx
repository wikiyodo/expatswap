import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import api from "../services/api";

const UserTablePage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { users, hasMore } = await api.getUsers(
          currentPage,
          pageSize,
          startDate,
          endDate
        );

        console.log(users);

        setUsers(users);
        setHasMore(Boolean(hasMore));
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, pageSize, startDate, endDate]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handleFilterChange = (e, type) => {
    const value = e.target.value;
    if (type === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  console.log({ startDate, endDate });

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
              value={startDate}
              onChange={(e) => handleFilterChange(e, "start")}
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleFilterChange(e, "end")}
            />
          </div>

          <UserTable users={users} />
          <div style={{ display: "flex", gap: 7 }}>
            <span>Page:</span>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
            >
              Prev
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasMore || isLoading}
            >
              Next
            </button>
          </div>
          <div>
            <span>Items per page:</span>
            <select
              value={pageSize}
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
