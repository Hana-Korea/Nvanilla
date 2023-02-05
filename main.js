const innerHead = document.querySelector(".inner_head");
const innerHeadHeight = innerHead.getBoundingClientRect().height;
const navLink = document.querySelectorAll(".nav-link");
const logo = document.querySelector(".logo");
window.addEventListener("scroll", () => {
  if (window.scrollY > 114) {
    innerHead.classList.add("show");
    showBlackNavLink();
  } else {
    innerHead.classList.remove("show");
    showWhiteNavLink();
  }
});

function showBlackNavLink() {
  navLink.forEach((item) => {
    item.classList.add("show");
  });
}

function showWhiteNavLink() {
  navLink.forEach((item) => {
    item.classList.remove("show");
  });
}

// 랜덤이미지
const albArr = [
  {
    img: "https://t1.daumcdn.net/cfile/tistory/99D38E335A1F7D1020",
    title: "Hearts don't break around here",
    text: `Love the way you conquer your fear. You know hearts don't break around here`,
  },
  {
    img: "https://i1.sndcdn.com/artworks-000391930665-04n234-t500x500.jpg",
    title: "Photograph",
    text: "If you hurt me, that's okay, baby, only words bleed",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/en/8/8f/Ed_Sheeran_-_Overpass_Graffiti.png",
    title: "Overpass Graffiti",
    text: "I will always love you for what it's worth. We'll never fade like graffiti on the overpass",
  },
  {
    img: "https://i.pinimg.com/originals/7a/ed/c4/7aedc445f56ddca66b1bfe48fffdad2c.jpg",
    title: "Best Part of me",
    text: `Baby, the best part of me is you. I'm so in love with you`,
  },
];
const album = document.querySelector(".album");
const title = document.querySelector(".title");
const text = document.querySelector(".text");
const randomBtn = document.querySelector(".btn--random");
randomBtn.addEventListener("click", showRandomSong);
function showRandomSong() {
  let randomNum = Math.floor(Math.random() * albArr.length);
  album.src = albArr[randomNum].img;
  title.textContent = albArr[randomNum].title;
  text.textContent = albArr[randomNum].text;
}
// todo
const todoList = document.querySelector("ul.todo-list");
const input = document.querySelector("input");
const todoBtn = document.querySelector(".btn--todo");
let tasks = [];
todoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newTask = input.value;
  input.value = "";
  const newTaskObj = {
    task: newTask,
    id: Date.now(),
  };
  showTodo(newTaskObj);
  tasks.push(newTaskObj);
  // saveTask(tasks);
});
function showTodo(newTask) {
  const li = document.createElement("li");
  li.id = newTask.id;
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  li.append(span);
  li.append(deleteBtn);

  span.innerText = newTask.task;
  todoList.append(li);
  deleteBtn.addEventListener("click", deleteTask);
}
function saveTask(tasks) {
  localStorage.setItem("task", JSON.stringify(tasks));
}

function deleteTask(e) {
  const li = e.target.parentElement;
  li.remove();

  tasks = tasks.filter((task) => {
    task.id !== parseInt(li.id);
  });
  saveTask(tasks);
}
const savedTodos = JSON.parse(localStorage.getItem("task"));
if (savedTodos !== null) {
  savedTodos.forEach((item) => {
    showTodo(item);
  });
}

// log-in
const loginInput = document.querySelector(".login-input");
const loginBtn = document.querySelector(".login-btn ");
const greetings = document.querySelector(".greetings");
const nameEl = document.querySelector(".name");
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  nameEl.textContent = loginInput.value;
  loginInput.value = "";
  loginInput.classList.add("hide");
  loginBtn.classList.add("hide");
  greetings.classList.add("show");
});
//시계
const clock = document.querySelector(".clock");
function getTime() {
  const hour = document.querySelector(".hour");
  const minute = document.querySelector(".minute");
  const seconds = document.querySelector(".seconds");
  const time = new Date();

  hour.textContent = String(time.getHours()).padStart(2, 0);
  minute.textContent = String(time.getMinutes()).padStart(2, 0);
  seconds.textContent = String(time.getSeconds()).padStart(2, 0);
}
setInterval(getTime, 1000);

//위치,날씨

function onGeoOk(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  const API_key = "89c2cbfb04f98a8bf08654da22a1dd96";
  console.log(lat);
  console.log(lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherContainer = document.querySelector(".weather-container");
      const cityName = data.name;
      const weather = data.weather[0].main;
      const temp = data.main.temp;
      weatherContainer.textContent = `${cityName}, ${weather},${temp}°C`;
    });
}
function onGeoError() {
  alert("해당 위치를 찾을 수 없습니다.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//footer 연도
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();
