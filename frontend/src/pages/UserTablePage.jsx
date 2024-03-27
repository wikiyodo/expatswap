import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";

const UserTablePage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Table</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? <p>Loading...</p> : <UserTable users={users} />}
    </div>
  );
};

export default UserTablePage;
