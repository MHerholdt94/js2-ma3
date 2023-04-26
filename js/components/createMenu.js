import { getUsername } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".navbar-nav");

  const username = getUsername();

  let authLink = `<a href="login.html" class="nav-link ${
    pathname === "/login.html" ? "active" : ""
  }" ${pathname === "/login.html" ? `aria-current="page"` : ""}>Login</a>`;

  if (username) {
    authLink = `<a href="profile.html" class="nav-link ${
      pathname === "/profile.html" ? "active" : ""
    }" ${
      pathname === "/profile.html" ? `aria-current="page"` : ""
    }>Profile</a>`;
  }

  container.innerHTML = `<a href="/" class="nav-link ${
    pathname === "/" || pathname === "/index.html" ? "active" : ""
  }">Home</a>
  ${authLink}`;

  logoutButton();
}

localStorage.clear();
