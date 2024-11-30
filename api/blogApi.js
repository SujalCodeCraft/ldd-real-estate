import { BASE_URL } from "./baseApi.js";

export const getAllBlogs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/blogs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};
