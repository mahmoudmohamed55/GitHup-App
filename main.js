let userFormEL = document.querySelector("#user-form");
let userInputEl = document.querySelector("#username");
let languagesEL = document.querySelector(".languages");
let searchTermEL = document.querySelector(".search-term");
let reposEl = document.querySelector("#repos");
userFormEL.addEventListener("submit", formSubmitHandler);
languagesEL.addEventListener("click", languagesHandler);

function formSubmitHandler(e) {
  e.preventDefault();
  let user = userInputEl.value.trim();
  if (user) {
    getUserRepos(user);
  } else {
    Swal.fire("Please Enter a Username!");
  }
}

function getUserRepos(user) {
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayRepos(data, user);
    });
}

function displayRepos(repos, searchTerm) {
  reposEl.innerHTML = "";
  if (repos.length === 0) {
    reposEl.innerHTML = "No Repositories Found!";
    reposEl.classList.add("not-found");
    return;
  } else {
    searchTermEL.innerHTML = searchTerm;
    for (let i = 0; i < repos.length; i++) {
      reposEl.innerHTML += `
                    <a href="https://${userInputEl.value.trim()}.github.io/${repos[i].name}/" title="Demo" class="repo-item">
                        <span>${repos[i].full_name}</span>
                        <span>${
                          repos[i].open_issues_count > 0
                            ? ' <i class="fa-solid fa-x"></i>'
                            : 'No Issues Found <i class="fa-solid fa-check-square"></i>'
                        }</span>
                    </a>`;
    }
  }
}
function languagesHandler(e) {
  let lng = e.target.getAttribute("data-lng");
  if (lng) {
    reposEl.innerHTML = "";
    getLangRepos(userInputEl.value, lng);
  }
}
function displayRepos_(repos, lng) {
  reposEl.innerHTML = "";
  if (repos.length === 0) {
    reposEl.innerHTML = "No Repositories Found!";
    reposEl.classList.add("not-found");
    return;
  } else {
    searchTermEL.innerHTML = lng;
    for (let i = 0; i < repos.length; i++) {
      reposEl.innerHTML += `
                      <a href="https://${userInputEl.value}.github.io/${
        repos[i].name
      }" title="Demo" class="repo-item">
                          <span>${repos[i].full_name}</span>
                          <span>${
                            repos[i].open_issues_count > 0
                              ? ' <i class="fa-solid fa-x"></i>'
                              : 'No Issues Found <i class="fa-solid fa-check-square"></i>'
                          }</span>
                      </a>`;
    }
  }
}
function getLangRepos(user, lng) {
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((response) => response.json())
    .then((data) => {
      let filteredRepos = data.filter(
        (repo) =>
          repo.language && repo.language.toLowerCase() === lng.toLowerCase()
      );
      displayRepos_(filteredRepos, lng);
    });
}
