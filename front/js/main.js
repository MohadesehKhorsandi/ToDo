import { login, register } from "./api.js";

// Get inputs data from user
let userName = document.querySelector("#userName");
let userFirstname = document.querySelector("#userFirstName");
let userLastname = document.querySelector("#userLastName");
let userPassword = document.querySelector("#userPassword");
let username = document.querySelector("#userName");
let password = document.querySelector("#passwordLogin");

// Btns
let btnRegister = document.querySelector("#btnRegister");
let btnLogin = document.querySelector("#btnLogin");

// Errors Handler p
let globalErr = document.querySelector(".globalErr");

const currentUser = {
  username: null,
  token: null,
};

// Register
try {
  btnRegister.addEventListener("click", async () => {
    doRegister();
  });
} catch (e) {
  console.log("Not Register page");
}

const doRegister = async function () {
  globalErr.innerHTML = "";
  const user = {
    firstName: userFirstname.value,
    lastName: userLastname.value,
    username: userName.value.toLowerCase(),
    password: userPassword.value,
  };

  // call register api
  const response = await register(user);
  console.log(response);
  if (response["success"]) {
    window.location.assign("login.html");
  } else {
    let errors = response["messages"];
    console.log(errors);
    let errorContent = "";
    Object.keys(response["messages"]).forEach((error) => {
      errorContent += `<i class="fa-solid fa-circle-exclamation"></i> ${response["messages"][error]}<br/>`;
    });
    globalErr.innerHTML = errorContent;
    currentUser.username = null;
    currentUser.token = null;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
};

// Login
try {
  btnLogin.addEventListener("click", async () => {
    doLogin();
  });
} catch (e) {
  console.log("Not Login page");
}

let doLogin = async function () {
  globalErr.innerHTML = "";
  const response = await login(username.value, password.value);
  if (response["success"]) {
    currentUser.username = username.value;
    currentUser.token = response["token"];
    console.log(currentUser);

    // Add current user to local storage and call a function to display then logout
    // redirect him to Home Page
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.assign("index.html");
  } else {
    let errorContent = "";
    Object.keys(response["messages"]).forEach((error) => {
      errorContent += `<i class="fa-solid fa-circle-exclamation"></i> ${response["messages"][error]}<br/>`;
    });
    globalErr.innerHTML = errorContent;
    currentUser.username = null;
    currentUser.token = null;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
  return;
};

const modeSwitchButton = document.getElementById("theme");
const darkModeStyles = document.getElementById("dark-mode-styles");
const girlImage = document.getElementById("girlImage");

modeSwitchButton.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");

  // Toggle the disabled attribute for dark mode styles
  darkModeStyles.disabled = !document.body.classList.contains("dark-mode");

  // Toggle the image source based on dark mode state
  const isDarkMode = document.body.classList.contains("dark-mode");
  girlImage.src = isDarkMode ? "./images/dark.jpg" : "./images/girl.jpg";

  // Save the current mode to local storage 
  localStorage.setItem("darkMode", isDarkMode);
});

// Check the initial mode from local storage 
const savedDarkMode = localStorage.getItem("darkMode");
if (savedDarkMode === "true") {
  document.body.classList.add("dark-mode");
  darkModeStyles.removeAttribute("disabled");
  girlImage.src = "./images/dark.jpg";
}
