import createMenu from "./components/createMenu.js";
import { getUsername } from "./utils/storage.js";

createMenu();

const username = getUsername();
const container = document.querySelector(".index-container");

if (username) {
  container.innerHTML = ` <h1 class="my-5 display-1">Welcome to site, ${username}!</h1>
                            <h2 class="mb-3">Don't forget to visit your profile</h2>
                            <a href="profile.html" class="btn btn-dark text-nowrap">${username}'s profile</a>`;
}
