const BASE_URL = "http://localhost:8080/api";

class UserError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = this.constructor.name;
    this.errors = errors || {};
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();

    throw new UserError("User registration failed", errorData.error);
  }
  return response.json();
};

const api = {
  async createUser(userData) {
    console.log("____________", BASE_URL);
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  async getUsers(currentPage, pageSize, startDate, endDate) {
    const params = new URLSearchParams({
      page: currentPage,
      limit: pageSize,
      startDate,
      endDate,
    });
    const response = await fetch(`${BASE_URL}/users?${params}`);

    return handleResponse(response);
  },
};

export default api;
