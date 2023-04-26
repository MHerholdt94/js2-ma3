import createMenu from "./components/createMenu.js";
import { getUsername } from "./utils/storage.js";

createMenu();

const heading = document.querySelector("h1");
const username = getUsername();

heading.innerHTML = `Hello, ${username}`;

if (!username) {
  location.href = "/";
}
