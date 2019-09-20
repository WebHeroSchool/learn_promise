const userName = "6thSence";
const url = "https://api.github.com/users/";
let gitUrl = url + userName;

let getDate = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(showDate);
  }, 2000);
});

let getUserInfo = new Promise((resolve, reject) => {
  setTimeout(resolve(showUserInfo), 3000);
});

Promise.all([getDate, getUserInfo])
  .then(userInfo => fetch(gitUrl))
  .then(result => result.json())
  .then(data => showUserInfo(data))
  .then(nowDate => showDate(nowDate))
  .catch(err => alert("Информация о пользователе не доступна"));

function showUserInfo(data) {
  let avatar = data.avatar_url;
  let name = data.name;
  let profileDescription = data.bio;
  let profileUrl = data.html_url;
  let login = data.login;
  let preload = document.getElementsByClassName("loader");

  preload[0].style.display = "none";

  let nameElem = "";
  if (name != null) {
    nameElem = document.createElement("h1");
    nameElem.innerHTML = name;
  } else {
    nameElem = document.createElement("p");
    nameElem.innerHTML = "Информация о имени пользователя не найдена";
  }
  document.body.appendChild(nameElem);

  let avatarElem = document.createElement("img");
  avatarElem.setAttribute("src", avatar);
  document.body.appendChild(avatarElem);

  let loginElem = document.createElement("a");
  loginElem.setAttribute("href", profileUrl);
  loginElem.innerHTML = login;
  document.body.appendChild(loginElem);

  let descriptionElem = document.createElement("p");
  if (profileDescription != null) {
    descriptionElem.innerHTML = profileDescription;
  } else {
    descriptionElem.innerHTML = "Информация о пользователе не найдена";
  }
  document.body.appendChild(descriptionElem);
}

function showDate(nowDate) {
  nowDate = new Date();
  let dateElem = document.createElement("p");
  dateElem.innerHTML = nowDate;
  document.body.appendChild(dateElem);
}
