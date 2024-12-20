import { BASE_URL } from "./baseApi.js";

// Get all contacts
export const getAllContacts = async (page,limit) => {
  try {
    const response = await fetch(`${BASE_URL}/contact?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return null;
  }
};

// Get a contact by ID
export const getContactById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/contact/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching contact:", error);
    return null;
  }
};

// Add a new contact
export const createContact = async (contactData) => {
  try {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating contact:", error);
    return null;
  }
};

// Update a contact by ID
export const updateContactById = async (id, contactData) => {
  try {
    const response = await fetch(`${BASE_URL}/contact/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating contact:", error);
    return null;
  }
};

// Delete a contact by ID
export const deleteContactById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/contact/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting contact:", error);
    return null;
  }
};

export const populateContactsTable = (container, contacts) => {
  contacts.data.forEach((contact) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>${contact.message}</td>
    `;
    container.appendChild(row);
  });
};

export const handleSubmitContactForm = async (event) => {
  event.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const phone = document.getElementById("contactPhone").value;
  const message = document.getElementById("contactMessage").value;

  console.log(name, email, phone, message);

  try {
    await createContact({ name, email, phone, message });

    // Clear the form
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactPhone").value = "";
    document.getElementById("contactMessage").value = "";

    // Optionally, refresh the contacts table
    fetchData("contacts", "contacts-container");
  } catch (error) {
    console.error("Error handling contact form submission:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Blog Form Submission
  document.getElementById("contactForm").addEventListener("submit", (event) => {
    handleSubmitContactForm(event);
  });
});
