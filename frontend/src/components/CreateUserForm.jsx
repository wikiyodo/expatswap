import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const defaultFormState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  dateOfBirth: "",
};

const CreateUserForm = ({ onSubmit, errors }) => {
  const [formData, setFormData] = useState(defaultFormState);

  useEffect(() => {
    // Listen for custom event "formReset"
    const handleFormReset = () => {
      setFormData(defaultFormState);
    };

    window.addEventListener("formReset", handleFormReset);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("formReset", handleFormReset);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        {errors.firstName && (
          <span style={{ color: "red" }}>{errors.firstName}</span>
        )}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        {errors.lastName && (
          <span style={{ color: "red" }}>{errors.lastName}</span>
        )}
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        {errors.phoneNumber && (
          <span style={{ color: "red" }}>{errors.phoneNumber}</span>
        )}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
      </div>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        {errors.dateOfBirth && (
          <span style={{ color: "red" }}>{errors.dateOfBirth}</span>
        )}
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};

CreateUserForm.defaultProps = {
  onSubmit: () => {},
  errors: {},
};

CreateUserForm.propTypes = {
  onSubmit: PropTypes.func,
  errors: PropTypes.object,
};

export default CreateUserForm;
