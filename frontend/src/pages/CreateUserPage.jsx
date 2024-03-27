import React, { useState } from "react";
import CreateUserForm from "../components/CreateUserForm";
import api from "../services/api";

const CreateUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);

      // Make API request to create user
      await api.createUser(formData);

      // Reset form and state
      setError(null);
      setSuccessMessage("User created successfully!");
    } catch (error) {
      console.log("error::: ", error.message, error.errors);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <CreateUserForm onSubmit={handleSubmit} errors={error?.errors} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default CreateUserPage;
