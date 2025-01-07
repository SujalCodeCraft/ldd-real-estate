import { BASE_URL,myFunction } from "./baseApi.js";
const loader = document.getElementById("loader");
const tabs = document.getElementById("myTabContent");

// Get all banners
export const getAllBanners = async () => {
  try {
    const response = await fetch(`${BASE_URL}/banners`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching banners:", error);
    return null;
  }
};

// Create a new banner
export const createBanner = async (bannerData) => {
  try {
    const response = await fetch(`${BASE_URL}/banners`, {
      method: "POST",
      body: bannerData,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating banner:", error);
    return null;
  }
};

// Update an existing banner
export const updateBanner = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/banners/${id}`, {
      method: "PUT",
      body: updatedData,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating banner:", error);
    return null;
  }
};

let newImages = []; // Array to store the new images added by the user
let imagesToRemove = []; // Array to store images that need to be removed

export const populateBanners = (banners) => {
  const mediaPreview = document.getElementById("bannerMediaPreview");

  console.log(banners);
  mediaPreview.innerHTML = ""; // Clear existing previews
  const existingMediaArray = [...(banners.data[0].media || [])]; // Clone media array

  console.log(mediaPreview);
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
};
document.addEventListener("DOMContentLoaded", () => {
  const mediaInput = document.getElementById("bannerMedia");
  const mediaPreview = document.getElementById("bannerMediaPreview");

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
  document
    .getElementById("uploadForm")
    .addEventListener("submit", async (event) => {
      // handleListingFormSubmission(event, editingListingId);
      event.preventDefault();
      console.log("uploaded");

      const formData = new FormData();

      if (newImages && newImages.length > 0) {
        newImages.forEach((image) => {
          formData.append("photos", image);
        });
      }
      if (imagesToRemove.length > 0) {
        console.log(imagesToRemove);

        formData.append("imagesToRemove", JSON.stringify(imagesToRemove));
      }
      try {
        await updateBanner("676669795875626f8f2dd82f", formData);
    myFunction("Banner Submitted Successfully");

      } catch (error) {
        console.error("Error handling form submission:", error);
      }

    });
});
