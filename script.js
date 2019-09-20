const userName = "adamsitnik";
const url = "https://api.github.com/users/";
let gitUrl = url + userName;


let getDate = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(showDate);
  }, 2000)
});

let getUserInfo = new Promise((resolve, reject) => {
  setTimeout(resolve(showUserInfo), 3000)
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
  let preload = document.getElementsByClassName('loader');

  preload[0].style.display = 'none';

  let avatarElem = document.createElement("img");
  avatarElem.setAttribute("src", avatar);
  document.body.appendChild(avatarElem);

  let nameElem = document.createElement("a");
  nameElem.setAttribute("href", profileUrl);
  nameElem.innerHTML = name;
  document.body.appendChild(nameElem);

  let descriptionElem = document.createElement("p");
  if (profileDescription != null) {
    descriptionElem.innerHTML = profileDescription;
  } else {
    descriptionElem.innerHTML = "Информация о пользователе не найдена";
  }
  document.body.appendChild(descriptionElem);
}

function showDate(nowDate) {
  nowDate = new Date;
  let dateElem = document.createElement("p");
  dateElem.innerHTML = nowDate;
  document.body.appendChild(dateElem);
}