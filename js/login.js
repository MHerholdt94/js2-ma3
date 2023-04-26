import displayMessage from "./components/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

createMenu();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 && passwordValue.length === 0) {
    return displayMessage(
      "warning",
      "Please enter your login details",
      ".message-container"
    );
  } else if (usernameValue.length === 0) {
    return displayMessage(
      "warning",
      "Please enter a username",
      ".message-container"
    );
  } else if (passwordValue.length === 0) {
    return displayMessage(
      "warning",
      "Please enter a password",
      ".message-container"
    );
  }

  doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
  const url = baseUrl + "/api/auth/local";

  const data = JSON.stringify({
    identifier: username,
    password: password,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json.user) {
      displayMessage(
        "success",
        `Welcome back ${username}<p>Returning to home page <span id="countdown"></span></p>`,
        ".message-container"
      );

      saveToken(json.jwt);
      saveUser(json.user);

      let count = 3;
      const countdown = setInterval(function () {
        if (count <= 0) {
          clearInterval(countdown);
          document.querySelector("#countdown").innerHTML = "0";
        } else {
          document.querySelector("#countdown").innerHTML = count;
        }
        count -= 1;
      }, 1000);

      setTimeout(function () {
        location.href = "/";
      }, 4000);
    }

    if (json.error) {
      displayMessage("warning", "Invalid login details", ".message-container");
    }
  } catch (error) {
    console.log(error);
    displayMessage("danger", error, ".message-container");
  }
}
