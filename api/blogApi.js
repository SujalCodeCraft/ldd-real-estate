import { BASE_URL } from "./baseApi.js";

const loader = document.getElementById("loader");
const tabs = document.getElementById("myTabContent");
// Get all blogs
export const getAllBlogs = async (page = 1, limit = 5) => {
  try {
    loader.style.display = "block";
    if (tabs) {
      tabs.style.display = "none";
    }
    const response = await fetch(
      `${BASE_URL}/blogs?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    loader.style.display = "none";
    if (tabs) {
      tabs.style.display = "block";
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

// Get a blog by ID
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
    console.error("Error fetching blog:", error);
    return null;
  }
};

// Add a new blog
export const addBlog = async (blogData) => {
  try {
    loader.style.display = "block";
    if (tabs) {
      tabs.style.display = "none";
    }
    const response = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      body: blogData,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    loader.style.display = "none";
    if (tabs) {
      tabs.style.display = "block";
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding blog:", error);
    return null;
  }
};

// Update a blog by ID
export const updateBlogById = async (id, blogData) => {
  try {
    loader.style.display = "block";
    if (tabs) {
      tabs.style.display = "none";
    }
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "PUT",
      body: blogData,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    loader.style.display = "none";
    if (tabs) {
      tabs.style.display = "block";
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating blog:", error);
    return null;
  }
};

// Delete a blog by ID
export const deleteBlogById = async (id) => {
  try {
    loader.style.display = "block";
    if (tabs) {
      tabs.style.display = "none";
    }
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    loader.style.display = "none";
    if (tabs) {
      tabs.style.display = "block";
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting blog:", error);
    return null;
  }
};

const page = 1;
const limit = 5;

let currentPage = 1;
let totalPages = 1;

const fetchData = async (endpoint, containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  try {
    if (endpoint === "blogs") {
      const blogs = await getAllBlogs(page, limit);
      populateBlogsTable(container, blogs); // Populate the blog table
    }
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
  }
};

let editingBlogId = null;
// Edit Blog Functionality
const editBlog = (blogId) => {
  console.log("Edit Blog Functionality");
  editingBlogId = blogId;
  getBlogById(blogId).then((blog) => {
    populateEditBlogForm(blog);
  });
};
const deleteBlog = (blogId) => {
  console.log("delete Blog Functionality");
  editingBlogId = blogId;
  getBlogById(blogId).then(async (blog) => {
    await deleteBlogById(blog._id);
    fetchData("blogs", "blogs-container");
    document.getElementById("imagePreview").style =
      "display: none; max-width: 100%; height: auto";
  });
};

// Function to populate blogs table
export const populateBlogsTable = (container, blogs) => {
  const sliceText = 50;
  container.innerHTML = ""; // Clear previous content

  // Check if the response contains blogs data
  if (!blogs || !blogs.data || blogs.data.length === 0) {
    container.innerHTML = "<tr><td colspan='4'>No blogs available</td></tr>";
    return;
  }

  const { currentPage: page, totalDocs } = blogs;

  currentPage = page;
  totalPages = totalDocs;

  blogs.data.forEach((blog) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${blog.title.slice(0, sliceText)}</td>
      <td>${blog.content[0].slice(0, sliceText)}${
      blog.content[0].length > sliceText ? "..." : ""
    }</td>
      <td>${blog.author}</td>
      <td>
        <button class="btn btn-warning btn-sm edit-btn" data-id="${
          blog._id
        }">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${
          blog._id
        }">Delete</button>
      </td>
    `;
    container.appendChild(row);
  });

  // Attach event listeners for editing and deleting blogs
  const editButtons = container.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const blogId = event.target.dataset.id;
      editBlog(blogId); // Call the editBlog function with the blogId
    });
  });

  const deleteButtons = container.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const blogId = event.target.dataset.id;
      deleteBlog(blogId); // Call the deleteBlog function with the blogId
    });
  });

  // // Pagination Controls
  // const paginationContainer = document.getElementById("pagination-container");
  // paginationContainer.innerHTML = ""; // Clear previous pagination controls

  // // Add "Previous" button
  // if (page > 1) {
  //   const prevButton = document.createElement("button");
  //   prevButton.textContent = "Previous";
  //   prevButton.classList.add("btn", "btn-secondary", "btn-sm");
  //   prevButton.addEventListener("click", () => {
  //     fetchData("blogs", "blogs-container", page - 1); // Load previous page
  //   });
  //   paginationContainer.appendChild(prevButton);
  // }

  // // Add "Next" button
  // if (page < totalPages) {
  //   const nextButton = document.createElement("button");
  //   nextButton.textContent = "Next";
  //   nextButton.classList.add("btn", "btn-secondary", "btn-sm");
  //   nextButton.addEventListener("click", () => {
  //     fetchData("blogs", "blogs-container", page + 1); // Load next page
  //   });
  //   paginationContainer.appendChild(nextButton);
  // }

  // // Optionally: Adding the page number in the pagination
  // const pageInfo = document.createElement("span");
  // pageInfo.textContent = `Page ${page} of ${totalPages}`;
  // pageInfo.classList.add("pagination-info");
  // paginationContainer.appendChild(pageInfo);
};
export const populateEditBlogForm = (blog) => {
  // Populate Title
  document.getElementById("blogTitle").value = blog.title;

  // Populate Author
  document.getElementById("blogAuthor").value = blog.author;

  // Show or hide the image preview based on the blog's thumbnail (media)
  const imagePreview = document.getElementById("imagePreview");
  if (blog.media) {
    imagePreview.src = blog.media; // Set the image src
    imagePreview.style.display = "block"; // Show the image preview
  } else {
    imagePreview.src = ""; // Clear src if no thumbnail (media)
    imagePreview.style.display = "none"; // Hide the preview
  }

  // Clear existing content input boxes
  const contentContainer = document.getElementById("contentContainer");
  contentContainer.innerHTML = "";

  // Populate Content Input Boxes
  blog.content.forEach((paragraph, index) => {
    const contentItem = document.createElement("div");
    contentItem.classList.add("content-item", "mb-2");

    contentItem.innerHTML = `
      <textarea
        class="form-control blogContent"
        rows="3"
        placeholder="Edit paragraph ${index + 1}"
      >${paragraph}</textarea>
      <button
        type="button"
        class="btn btn-danger removeContent mt-2"
      >
        - Remove
      </button>
    `;

    contentContainer.appendChild(contentItem);

    // Attach event listener to the remove button
    const removeButton = contentItem.querySelector(".removeContent");
    removeButton.addEventListener("click", () => {
      contentContainer.removeChild(contentItem);
    });
  });

  // Clear the Image Input (cannot populate due to browser limitations)
  document.getElementById("blogImage").value = "";
};

export const handleBlogFormSubmission = async (event, blogId) => {
  event.preventDefault();

  const title = document.getElementById("blogTitle").value;
  const author = document.getElementById("blogAuthor").value;

  // Collect all content from dynamically added inputs
  const contentElements = document.querySelectorAll(".blogContent");
  const content = Array.from(contentElements).map((textarea) => textarea.value);

  const image = document.getElementById("blogImage").files[0];

  console.log(title, author, content);

  const formData = new FormData();
  formData.append("data", JSON.stringify({ title, author, content }));
  if (image) formData.append("photos", image);

  try {
    if (blogId) {
      await updateBlogById(blogId, formData); // Update existing blog
    } else {
      await addBlog(formData); // Add new blog
    }

    // Clear the form and reload the blogs table
    document.getElementById("blogTitle").value = "";
    document.getElementById("blogAuthor").value = "";
    document.querySelectorAll(".blogContent").forEach((el) => el.remove());
    const contentContainer = document.getElementById("contentContainer");
    contentContainer.innerHTML = `
      <div class="content-item mb-2">
        <textarea
          class="form-control blogContent"
          rows="3"
          placeholder="Add a paragraph"
        ></textarea>
      </div>
    `;
    document.getElementById("blogImage").value = "";
    document.getElementById("imagePreview").style =
      "display: none; max-width: 100%; height: auto";

    // Reload blogs
    fetchData("blogs", "blogs-container");
  } catch (error) {
    console.error("Error handling form submission:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Blog Form Submission
  document.getElementById("blogImage").addEventListener("change", (event) => {
    const file = event.target.files[0]; // Get the selected file
    const imagePreview = document.getElementById("imagePreview");

    if (file) {
      const reader = new FileReader();

      // When the file is loaded, set the src of the image preview
      reader.onload = () => {
        imagePreview.src = reader.result; // Set the base64 data URL
        imagePreview.style.display = "block"; // Show the image
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      // If no file is selected, hide the preview
      imagePreview.src = "";
      imagePreview.style.display = "none";
    }
  });

  document.getElementById("blogForm").addEventListener("submit", (event) => {
    handleBlogFormSubmission(event, editingBlogId);
  });

  document.getElementById("addContent").addEventListener("click", () => {
    const contentContainer = document.getElementById("contentContainer");

    const newContentItem = document.createElement("div");
    newContentItem.classList.add("content-item", "mb-2");

    newContentItem.innerHTML = `
      <textarea
        class="form-control blogContent"
        rows="3"
        placeholder="Add another paragraph"
      ></textarea>
      <button
        type="button"
        class="btn btn-danger removeContent mt-2"
      >
        - Remove
      </button>
    `;

    contentContainer.appendChild(newContentItem);

    // Add event listener for the remove button
    newContentItem
      .querySelector(".removeContent")
      .addEventListener("click", () => {
        contentContainer.removeChild(newContentItem);
      });
  });

  // Attach remove functionality to existing items
  document.querySelectorAll(".removeContent").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const contentItem = event.target.closest(".content-item");
      contentItem.parentElement.removeChild(contentItem);
    });
  });
});
