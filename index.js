const usernameInput = document.getElementById("sign-up__username");
const usernameError = document.getElementById("username__error");
const usernameIcon = document.querySelector(".fa-check");

const passwordInput = document.getElementById("sign-up__password");
const passwordError = document.getElementById("password__error");
const passwordIcon = document.querySelector(".fa-eye-slash");

// 화면 초기화
const initPage = function (username) {
  usernameInput.value = "";
  passwordInput.value = "";
  usernameIcon.style.color = "rgba(255, 0, 0, 0)";
  passwordIcon.style.color = "rgba(0, 0, 0, 0)";
  passwordInput.type = "text";
  passwordVisible();

  document.querySelector("h3").innerText = username + "님 회원가입 완료!";
  document.querySelector("dialog").showModal();
  console.log(userInfo);
};

// 회원 정보 저장
const userInfo = {};
const form = document.getElementById("sign-up");

const formSubmit = function (event) {
  event.preventDefault();

  if (!isUsernameValid() || !isPasswordValid()) {
    if (!isUsernameValid()) {
      usernameInput.style.animation = "shake 0.2s 2";
    }
    if (!isPasswordValid()) {
      passwordInput.style.animation = "shake 0.2s 2";
    }
    return;
  }
  let username = usernameInput.value;
  let password = passwordInput.value;
  userInfo[username] = password;

  initPage(username);
};
form.addEventListener("submit", function (event) {
  formSubmit(event);
});

// 아이디 정상성 체크
const isUsernameValid = function () {
  usernameError.innerText = "";
  usernameIcon.classList.remove("fa-check");
  usernameIcon.classList.add("fa-x");
  usernameIcon.style.color = "rgb(255, 0, 0)";

  if (usernameInput.value.length < 4) {
    usernameError.innerText = "사용자명은 4자 이상이어야 합니다.";
    return false;
  }
  if (userInfo[usernameInput.value]) {
    usernameError.innerText = "이미 사용중인 사용자명입니다.";
    return false;
  }
  usernameIcon.classList.remove("fa-x");
  usernameIcon.classList.add("fa-check");
  usernameIcon.style.color = "rgb(0, 128, 0)";
  return true;
};
usernameInput.addEventListener("input", isUsernameValid);

const isPasswordValid = function () {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  passwordError.innerText = "";
  passwordIcon.style.color = "rgb(0, 0, 0)";

  if (passwordInput.value.length < 6) {
    passwordError.innerText = "비밀번호는 6자 이상이어야 합니다.";
    return false;
  }
  if (!passwordRegex.test(passwordInput.value)) {
    passwordError.innerText = "비밀번호는 영어와 숫자를 포함해야 합니다.";
    return false;
  }
  return true;
};
passwordInput.addEventListener("input", isPasswordValid);

// 비밀번호 표시
const passwordVisible = function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordIcon.classList.remove("fa-eye-slash");
    passwordIcon.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    passwordIcon.classList.remove("fa-eye");
    passwordIcon.classList.add("fa-eye-slash");
  }
};
passwordIcon.addEventListener("click", passwordVisible);
