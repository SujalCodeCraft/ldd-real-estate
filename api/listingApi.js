import { BASE_URL } from "./baseApi.js";

// Get all items
export const getAllListings = async () => {
  try {
    const response = await fetch(`${BASE_URL}/listing`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    return null;
  }
};

// Get an item by ID
export const getListingById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/listing/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching item:", error);
    return null;
  }
};

// Add a new item
export const addListing = async (itemData) => {
  try {
    const response = await fetch(`${BASE_URL}/listing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
};

// Update an item by ID
export const updateListingById = async (id, itemData) => {
  try {
    const response = await fetch(`${BASE_URL}/listing/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating item:", error);
    return null;
  }
};

// Delete an item by ID
export const deleteListingById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/listing/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;
  }
};
