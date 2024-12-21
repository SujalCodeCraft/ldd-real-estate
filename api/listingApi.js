import { BASE_URL } from "./baseApi.js";

const loader = document.getElementById("loader");
const tabs = document.getElementById("myTabContent");

// Get all items
export const getAllListings = async (page, limit) => {
  try {
    loader.style.display = "block";
    if (tabs) {
      tabs.style.display = "none";
    }
    const response = await fetch(
      `${BASE_URL}/listing?page=${page}&limit=${limit}`,
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
    loader.style.display = "block";
    if (tabs) {
      tabs.style.display = "none";
    }
    const response = await fetch(`${BASE_URL}/listing`, {
      method: "POST",
      body: itemData,
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
    console.error("Error adding item:", error);
    return null;
  }
};

// Update an item by ID
export const updateListingById = async (id, itemData) => {
  try {
    loader.style.display = "block";
    if (tabs) {
      tabs.style.display = "none";
    }
    const response = await fetch(`${BASE_URL}/listing/${id}`, {
      method: "PUT",
      body: itemData,
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
    console.error("Error updating item:", error);
    return null;
  }
};

// Delete an item by ID
export const deleteListingById = async (id) => {
  try {
    loader.style.display = "block";
    if (tabs) {
      tabs.style.display = "none";
    }
    const response = await fetch(`${BASE_URL}/listing/${id}`, {
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
    console.error("Error deleting item:", error);
    return null;
  }
};

let editingListingId = null;
const page = 1;
const limit = 8;

let currentPage = 1;
let totalPages = 1;
let imagesToRemove = []; // Stores filenames of media to remove
let newImages = [];
const fetchData = async (endpoint, containerId, page = 1) => {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  try {
    if (endpoint === "listing") {
      const data = await getAllListings(page, limit);
      populateListingsTable(container, data); // Populate the listings table
      updatePaginationControls(
        "listing-pagination-container",
        data.currentPage,
        data.totalPages
      );
    }
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
  }
};

const updatePaginationControls = (containerId, currentPage, totalPages) => {
  const paginationContainer = document.getElementById(containerId);
  paginationContainer.innerHTML = ""; // Clear previous pagination controls

  // Add "Previous" button
  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.classList.add("btn", "btn-secondary", "btn-sm", "me-2");
    prevButton.addEventListener("click", () => {
      fetchData("listing", "listings-container", currentPage - 1); // Load previous page
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
      fetchData("listing", "listings-container", currentPage + 1); // Load next page
    });
    paginationContainer.appendChild(nextButton);
  }
};

const renderMedia = (mediaArray) => {
  const mediaPreview = document.getElementById("mediaPreview");
  mediaPreview.innerHTML = "";

  mediaArray.forEach((media, index) => {
    const mediaItem = document.createElement("div");
    mediaItem.classList.add("media-item", "me-3", "mb-3");
    mediaItem.innerHTML = `
      <img src="${media}" alt="Media Preview" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover;" />
      <button type="button" class="btn btn-danger btn-sm mt-2 removeMedia" data-index="${index}">
        Remove
      </button>
    `;

    mediaPreview.appendChild(mediaItem);

    // Attach event listener for remove button
    mediaItem.querySelector(".removeMedia").addEventListener("click", () => {
      imagesToRemove.push(media); // Add to imagesToRemove array
      mediaArray.splice(index, 1); // Remove from the mediaArray
      renderMedia(mediaArray); // Re-render the media preview
    });
  });
};

// Edit Listing Functionality
const editListing = (listingId) => {
  console.log("Edit listing Functionality");

  editingListingId = listingId;
  // Fetch listing data and populate the form
  getListingById(listingId).then((listing) => {
    populateEditListingForm(listing);
  });
};

const deleteListing = (listingId) => {
  console.log("delete Listing Functionality");
  editingListingId = listingId;

  getListingById(listingId).then(async (listing) => {
    await deleteListingById(listing._id);
    fetchData("listing", "listings-container",currentPage);
    const mediaPreview = document.getElementById("mediaPreview");
    mediaPreview.innerHTML = "";

    newImages = [];
    imagesToRemove = [];
  });
};

export const populateListingsTable = (container, listings) => {
  const sliceText = 50;

  const { currentPage: page, totalPages: totalCount } = listings;

  console.log(page, totalCount);
  currentPage = page;
  totalPages = totalCount;
  updatePaginationControls(
    "listing-pagination-container",
    page,
    totalCount
  );
  listings.data.forEach((listing) => {
    const row = document.createElement("tr");
    row.innerHTML = `
   <td>${listing.title}</td>
            <td>${listing.price}</td>
            <td>${listing.bedrooms}</td>
            <td>${listing.bathrooms}</td>
            <td>${listing.area}</td>
           <td>${listing.location.city} ${listing.location.locality} ${
      listing.location.microMarket
    }? , ${listing.location.microMarket}
              : ""
          } </td>
            <td>${listing.highlights?.description.slice(0, sliceText)}${
      listing.highlights?.description.length > sliceText ? "..." : ""
    }</td>

              <td>
        <button class="btn btn-warning btn-sm edit-btn" data-id="${
          listing._id
        }">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${
          listing._id
        }">Delete</button>
      </td>
    `;
    container.appendChild(row);
  });
  const editButtons = container.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const listingId = event.target.dataset.id;
      editListing(listingId); // Call the editBlog function with the listingId
    });
  });

  const deleteButtons = container.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const listingId = event.target.dataset.id;
      deleteListing(listingId); // Call the deleteBlog function with the listingId
    });
  });
};

export const populateEditListingForm = (listing) => {
  document.getElementById("title").value = listing.title;
  document.getElementById("price").value = listing.price;
  document.getElementById("map").value = listing.map || "";
  document.getElementById("bedrooms").value = listing.bedrooms || "";
  document.getElementById("bathrooms").value = listing.bathrooms || "";
  document.getElementById("additionalRooms").value =
    listing.additionalRooms || "";
  document.getElementById("balcony").value = listing.balcony || "";
  document.getElementById("facing").value = listing.facing || "";
  document.getElementById("floorNumber").value = listing.floorNumber || "";
  document.getElementById("flooring").value = listing.flooring || "";
  document.getElementById("powerBackup").value = listing.powerBackup || "";
  document.getElementById("totalFloors").value = listing.totalFloors || "";
  document.getElementById("unitNumber").value = listing.unitNumber || "";
  document.getElementById("view").value = listing.view || "";

  document.getElementById("area").value = listing.area || "";
  document.getElementById("highlightDescription").value =
    listing.highlights.description || "";
  document.getElementById("furnishingStatus").value =
    listing.furnishingStatus || "";
  document.getElementById("city").value = listing.location?.city || "";
  document.getElementById("locality").value = listing.location?.locality || "";
  document.getElementById("microMarket").value =
    listing.location?.microMarket || "";
  document.getElementById("listingType").value =
    listing.propertyDetails?.listingType || "";
  document.getElementById("buildingType").value =
    listing.propertyDetails?.buildingType || "";
  document.getElementById("propertyType").value =
    listing.propertyDetails?.propertyType || "";
  document.getElementById("whatsapp").value =
    listing.contactOptions?.whatsapp || "";
  document.getElementById("phone").value = listing.contactOptions?.phone || "";

  // Populate highlights
  const highlightsPointsContainer = document.getElementById(
    "highlightPointsContainer"
  );
  const highlightsTagsContainer = document.getElementById(
    "highlightTagsContainer"
  );
  // Populate Highlights Tags
  highlightsTagsContainer.innerHTML = "";
  listing.highlights?.tags?.forEach((tag, index) => {
    const tagItem = document.createElement("div");
    tagItem.classList.add("highlight-tag-item", "mb-2");

    tagItem.innerHTML = `
    <input
      type="text"
      class="form-control highlightTag"
      value="${tag}"
      placeholder="Edit tag ${index + 1}"
    />
    <button
      type="button"
      class="btn btn-danger removeTag mt-2"
    >
      - Remove
    </button>
  `;

    highlightsTagsContainer.appendChild(tagItem);

    // Attach event listener to the remove button
    const removeButton = tagItem.querySelector(".removeTag");
    removeButton.addEventListener("click", () => {
      highlightsTagsContainer.removeChild(tagItem);
    });

    const mediaPreview = document.getElementById("mediaPreview");
    mediaPreview.innerHTML = ""; // Clear existing previews
    const existingMediaArray = [...(listing.media || [])]; // Clone media array

    existingMediaArray.forEach((mediaUrl, index) => {
      const mediaItem = document.createElement("div");
      mediaItem.classList.add("media-item", "me-3", "mb-3");

      mediaItem.innerHTML = `
      <img
        src="${mediaUrl}"
        alt="Media Preview"
        class="img-thumbnail"
        style="width: 100px; height: 100px; object-fit: cover;"
      />
      <button
        type="button"
        class="btn btn-danger btn-sm mt-2 removeExistingMedia"
        data-url="${mediaUrl}"
      >
        - Remove
      </button>
    `;

      mediaPreview.appendChild(mediaItem);

      // Handle removal of existing media
      const removeButton = mediaItem.querySelector(".removeExistingMedia");
      removeButton.addEventListener("click", () => {
        imagesToRemove.push(mediaUrl); // Add URL to imagesToRemove
        mediaItem.remove(); // Remove from DOM
      });
    });

    // Reset the input for new media uploads
    document.getElementById("media").value = "";
  });

  // Populate Highlights Points
  highlightsPointsContainer.innerHTML = "";
  listing.highlights?.points?.forEach((point, index) => {
    const pointItem = document.createElement("div");
    pointItem.classList.add("highlight-point-item", "mb-2");

    pointItem.innerHTML = `
    <input
      type="text"
      class="form-control highlightPoint"
      value="${point}"
      placeholder="Edit point ${index + 1}"
    />
    <button
      type="button"
      class="btn btn-danger removePoint mt-2"
    >
      - Remove
    </button>
  `;

    highlightsPointsContainer.appendChild(pointItem);

    // Attach event listener to the remove button
    const removeButton = pointItem.querySelector(".removePoint");
    removeButton.addEventListener("click", () => {
      highlightsPointsContainer.removeChild(pointItem);
    });
  });

  // Reset media (cannot populate existing images for security reasons)
  document.getElementById("media").value = "";
};

// Handle form submission for adding or updating listings
export const handleListingFormSubmission = async (event, listingId) => {
  event.preventDefault();

  // Collect form values
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const map = document.getElementById("map").value;
  const bedrooms = document.getElementById("bedrooms").value;
  const bathrooms = document.getElementById("bathrooms").value;
  const area = document.getElementById("area").value;
  const furnishingStatus = document.getElementById("furnishingStatus").value;
  const city = document.getElementById("city").value;
  const locality = document.getElementById("locality").value;
  const microMarket = document.getElementById("microMarket").value;
  const listingType = document.getElementById("listingType").value;
  const buildingType = document.getElementById("buildingType").value;
  const propertyType = document.getElementById("propertyType").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const phone = document.getElementById("phone").value;
  const description = document.getElementById("highlightDescription").value;
  const additionalRooms = document.getElementById("additionalRooms").value;
  const balcony = document.getElementById("balcony").value;
  const facing = document.getElementById("facing").value;
  const floorNumber = document.getElementById("floorNumber").value;
  const flooring = document.getElementById("flooring").value;
  const powerBackup = document.getElementById("powerBackup").value;
  const totalFloors = document.getElementById("totalFloors").value;
  const unitNumber = document.getElementById("unitNumber").value;
  const view = document.getElementById("view").value;

  const image = document.getElementById("media").files[0];

  // Collect highlights
  const highlightPoints = [];
  const highlightTags = [];
  document
    .querySelectorAll("#highlightPointsContainer input")
    .forEach((input) => {
      if (input.value.trim()) {
        highlightPoints.push(input.value.trim());
      }
    });
  document
    .querySelectorAll("#highlightTagsContainer input")
    .forEach((input) => {
      if (input.value.trim()) {
        highlightTags.push(input.value.trim());
      }
    });

  // Create FormData
  // const dataToSave = {
  //   title,price,map,bedrooms,bathrooms,area,f
  // }

  const formData = new FormData();

  formData.append("title", title);
  formData.append("price", price);
  formData.append("map", map);
  formData.append("bedrooms", bedrooms);
  formData.append("bathrooms", bathrooms);
  formData.append("area", area);
  formData.append("additionalRooms", additionalRooms);
  formData.append("balcony", balcony);
  formData.append("facing", facing);
  formData.append("floorNumber", floorNumber);
  formData.append("flooring", flooring);
  formData.append("powerBackup", powerBackup);
  formData.append("totalFloors", totalFloors);
  formData.append("unitNumber", unitNumber);
  formData.append("view", view);
  formData.append("furnishingStatus", furnishingStatus);
  formData.append("location[city]", city);
  formData.append("location[locality]", locality);
  formData.append("location[microMarket]", microMarket);
  formData.append("propertyDetails[listingType]", listingType);
  formData.append("propertyDetails[buildingType]", buildingType);
  formData.append("propertyDetails[propertyType]", propertyType);
  formData.append("contactOptions[whatsapp]", whatsapp);
  formData.append("contactOptions[phone]", phone);
  formData.append("highlights[description]", description);

  if (newImages && newImages.length > 0) {
    newImages.forEach((image) => {
      formData.append("photos", image);
    });
  }
  if (imagesToRemove.length > 0) {
    console.log(imagesToRemove);

    formData.append("imagesToRemove", JSON.stringify(imagesToRemove));
  }

  highlightPoints.forEach((point, index) => {
    formData.append(`highlights[points][${index}]`, point);
  });
  highlightTags.forEach((point, index) => {
    formData.append(`highlights[tags][${index}]`, point);
  });

  try {
    if (listingId) {
      await updateListingById(listingId, formData); // Update existing listing
    } else {
      await addListing(formData); // Add new listing
    }

    // Clear the form
    document.getElementById("listingForm").reset();

    // Reload listings
    fetchData("listing", "listings-container",currentPage);
    const mediaPreview = document.getElementById("mediaPreview");
    mediaPreview.innerHTML = "";

    newImages = [];
    imagesToRemove = [];
  } catch (error) {
    console.error("Error handling form submission:", error);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const mediaInput = document.getElementById("media");
  const mediaPreview = document.getElementById("mediaPreview");

  mediaInput.addEventListener("change", (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMediaItem = document.createElement("div");
        newMediaItem.classList.add("media-item", "me-3", "mb-3");

        newMediaItem.innerHTML = `
          <img
            src="${e.target.result}"
            alt="New Media Preview"
            class="img-thumbnail"
            style="width: 100px; height: 100px; object-fit: cover;"
          />
          <button
            type="button"
            class="btn btn-danger btn-sm mt-2 removeNewMedia"
          >
            - Remove
          </button>
        `;

        mediaPreview.appendChild(newMediaItem);
        newImages.push(file); // Add new file to newImages
        console.log(newImages);

        // Handle removal of newly added media
        const removeButton = newMediaItem.querySelector(".removeNewMedia");
        removeButton.addEventListener("click", () => {
          newImages = newImages.filter((img) => img !== file); // Remove from newImages
          newMediaItem.remove(); // Remove from DOM
        });
      };
      reader.readAsDataURL(file);
    });
  });

  // Highlights
  document.getElementById("listingForm").addEventListener("submit", (event) => {
    handleListingFormSubmission(event, editingListingId);
  });

  const highlightTagsContainer = document.getElementById(
    "highlightTagsContainer"
  );
  const highlightPointContainer = document.getElementById(
    "highlightPointsContainer"
  );
  const addHighlightTag = document.getElementById("addHighlightTag");
  addHighlightTag.addEventListener("click", () => {
    const tagInput = document.createElement("div");
    tagInput.classList.add("mb-2");
    tagInput.innerHTML = `
      <input type="text" class="form-control" placeholder="Add a tag" />
      <button type="button" class="btn btn-danger btn-sm mt-2 remove-tag">- Remove</button>
    `;
    tagInput.querySelector(".remove-tag").addEventListener("click", () => {
      highlightTagsContainer.removeChild(tagInput);
    });
    highlightTagsContainer.appendChild(tagInput);
  });
  const addHighlightPoint = document.getElementById("addHighlightPoint");
  addHighlightPoint.addEventListener("click", () => {
    const tagInput = document.createElement("div");
    tagInput.classList.add("mb-2");
    tagInput.innerHTML = `
      <input type="text" class="form-control" placeholder="Add a highlight point" />
      <button type="button" class="btn btn-danger btn-sm mt-2 remove-tag">- Remove</button>
    `;
    tagInput.querySelector(".remove-tag").addEventListener("click", () => {
      highlightPointContainer.removeChild(tagInput);
    });
    highlightPointContainer.appendChild(tagInput);
  });
  fetchData("listing", "listings-container", currentPage);
});
