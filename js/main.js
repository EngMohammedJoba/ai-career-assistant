import { uploadCV } from "./api.js";
import { setCV, resetState, loadState } from "./state.js";

const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
const fileText = document.getElementById("fileText");
const uploadBtn = document.getElementById("uploadBtn");
const loader = document.getElementById("loader");
const toast = document.getElementById("toast");

let selectedFile = null;

loadState();

// ===== Toast =====
function showToast(message) {
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// ===== Ripple =====
function createRipple(e) {
  const button = e.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - button.offsetLeft - diameter / 2}px`;
  circle.style.top = `${e.clientY - button.offsetTop - diameter / 2}px`;

  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) ripple.remove();

  button.appendChild(circle);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    createRipple(e);
  }
});

// ===== Reset =====
function resetPage() {
  selectedFile = null;
  fileInput.value = "";
  fileText.innerText = "Click or drag your CV here";
  loader.style.display = "none";
}

window.addEventListener("pageshow", (event) => {
  if (event.persisted) resetPage();
});

// ===== Upload =====
uploadBox.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  selectedFile = e.target.files[0];
  if (selectedFile) fileText.innerText = selectedFile.name;
});

uploadBtn.addEventListener("click", async () => {
  if (!selectedFile) {
    return showToast("Please select a file first");
  }

  loader.style.display = "block";

  try {
    resetState();

    const data = await uploadCV(selectedFile);

    setCV(data);

    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "roles.html";
    }, 300);

  } catch (err) {
    showToast("Upload failed");
    console.error(err);
  } finally {
    loader.style.display = "none";
  }
});


// ===== Page Transition =====
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href && href.includes(".html")) {
      e.preventDefault();
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  });
});