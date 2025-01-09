// export const BASE_URL = "http://localhost:5000/api";
export const BASE_URL = "https://ldd-backend.vercel.app/api";

export function myFunction(
  message = "Thank you! Your contact form has been submitted successfully."
) {
  console.log("toast");
  var x = document.getElementById("snackbar");
  x.innerText = message; // Set the dynamic message
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
