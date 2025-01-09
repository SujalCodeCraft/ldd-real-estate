import { BASE_URL, myFunction } from "./baseApi.js";

// Get all contacts
export const getAllContacts = async (page, limit) => {
  try {
    const response = await fetch(
      `${BASE_URL}/contact?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
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

const page = 1;
const limit = 8;

let currentPage = 1;
let totalPages = 1;
const fetchData = async (endpoint, containerId, page = 1) => {
  console.log({ page });
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  console.log(endpoint, containerId, page);
  try {
    if (endpoint === "contact") {
      const data = await getAllContacts(page, limit);
      populateContactsTable(container, data); // Populate the listings table
      updatePaginationControls(
        "contact-pagination-container",
        data.currentPage,
        data.totalPages
      );
    }
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
  }
};

const updatePaginationControls = (containerId, currentPage, totalPages) => {
  console.log(currentPage, totalPages, "updatePaginationControls");
  const paginationContainer = document.getElementById(containerId);
  paginationContainer.innerHTML = ""; // Clear previous pagination controls

  // Add "Previous" button
  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.classList.add("btn", "btn-secondary", "btn-sm", "me-2");
    prevButton.addEventListener("click", () => {
      fetchData("contact", "contacts-container", currentPage - 1); // Load previous page
    });
    paginationContainer.appendChild(prevButton);
  }
  // Optionally: Display the current page info
  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  pageInfo.classList.add("pagination-info", "ms-3");
  paginationContainer.appendChild(pageInfo);
  // Add "Next" button
  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.classList.add("btn", "btn-secondary", "btn-sm", "ms-2");
    nextButton.addEventListener("click", () => {
      fetchData("contact", "contacts-container", currentPage + 1); // Load next page
    });
    paginationContainer.appendChild(nextButton);
  }
};

export const populateContactsTable = (container, contacts) => {
  const { currentPage: page, totalPages: totalCount } = contacts;

  console.log(page, totalCount);
  currentPage = page;
  totalPages = totalCount;
  updatePaginationControls("contact-pagination-container", page, totalCount);

  contacts.data.forEach((contact) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>${contact.email}</td>
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
  const propertySelect = document.getElementById("car-select");
  let propertyType = "";

  if (propertySelect) {
    propertyType = propertySelect.value;
  }

  console.log(name, email, phone, message);

  try {
    await createContact({ name, email, phone, message, propertyType });

    // Clear the form
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactPhone").value = "";
    document.getElementById("contactMessage").value = "";

    myFunction();

    // Optionally, refresh the contacts table
    fetchData("contacts", "contacts-container", currentPage);
  } catch (error) {
    console.error("Error handling contact form submission:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Blog Form Submission
  document.getElementById("contactForm").addEventListener("submit", (event) => {
    handleSubmitContactForm(event);
  });

  fetchData("contact", "contacts-container", currentPage);
});
