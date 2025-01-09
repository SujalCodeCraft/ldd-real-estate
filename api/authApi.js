import { BASE_URL,myFunction } from "./baseApi.js";

// User Login
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

// User Signup
export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error during signup:", error);
    return null;
  }
};

// Get User Details
export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/own`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
