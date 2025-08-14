// API URL
const API_URL = "https://jsonplaceholder.typicode.com/users";

// HTML elements
const usersContainer = document.getElementById("usersContainer");
const statusBox = document.getElementById("status");
const reloadBtn = document.getElementById("reloadBtn");

// Tumhara email
const MY_EMAIL = "shubhamkumar748870@gmail.com";

// Status message show karne ka function
function showStatus(message, isError = false) {
  statusBox.textContent = message;
  statusBox.style.color = isError ? "red" : "black";
}

// Address ko readable format me convert karna
function formatAddress(addr) {
  if (!addr) return "N/A";
  return `${addr.suite}, ${addr.street}, ${addr.city}, ${addr.zipcode}`;
}

// Users render karna
function renderUsers(users) {
  usersContainer.innerHTML = "";
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";

    // Gmail compose link banate hue
    const gmailLink = `https://mail.google.com/mail/?view=cm&to=${MY_EMAIL}`;

    card.innerHTML = `
      <h3>${user.name ?? "Unknown"}</h3>
      <p class="meta"><b>Email:</b> 
         <a href="${gmailLink}" target="_blank">${MY_EMAIL}</a>
      </p>
      <p class="meta"><b>Address:</b> ${formatAddress(user.address)}</p>
    `;

    usersContainer.appendChild(card);
  });
}

// API se data fetch karna
async function fetchUsers() {
  try {
    showStatus("Loading users...");
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.json();
    renderUsers(data);
    showStatus("Users loaded successfully ✅");
  } catch (error) {
    showStatus("Error fetching data: " + error.message, true);
  }
}

// Reload button click event
reloadBtn.addEventListener("click", fetchUsers);

// Page load hone par fetch call
fetchUsers();
