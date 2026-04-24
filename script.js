// Select Elements
const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const card = document.getElementById("profileCard");

// Event Listner
button.addEventListener("click", () => {
  const username = input.value.trim();

  if (username === "") {
    alert("Please enter a username");
    return;
  }

  getUser(username);
});

//  Press Enter to search
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

// Fetch User Data
async function getUser(username) {
  // Show loading & clear old data
  loading.textContent = "Loading...";
  error.textContent = "";
  card.innerHTML = "";
  card.style.display = "none";

  try {
    // Fetch user
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    // Display user
    displayUser(data);

    // Fetch repos
    const reposResponse = await fetch(data.repos_url);
    const reposData = await reposResponse.json();

    // Display repos
    displayRepos(reposData);

  } catch (err) {
    error.textContent = "❌ User Not Found";
  } finally {
    loading.textContent = "";
  }
}

// Display User
function displayUser(user) {
  card.style.display = "block";

  card.innerHTML = `
    <img src="${user.avatar_url}">
    <h2>${user.name || "No Name"}</h2>
    <p>${user.bio || "No Bio Available"}</p>
    <p>📅 Joined: ${formatDate(user.created_at)}</p>
    <p>👥 Followers: ${user.followers}</p>
    <p>🔗 Following: ${user.following}</p>
    <a href="${user.html_url}" target="_blank">View Profile</a>
  `;
}

// Format Date
function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
// Display Top Repos
function displayRepos(repos) {
  // Sort latest repos first
  const topRepos = repos
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  let repoHTML = "<h3>📦 Top Repositories</h3>";

  topRepos.forEach(repo => {
    repoHTML += `
      <div class="repo">
        <a href="${repo.html_url}" target="_blank">
          ${repo.name}
        </a>
        ⭐ ${repo.stargazers_count}
      </div>
    `;
  });

  card.innerHTML += repoHTML;
}
// Battle Mode 
async function battle(user1, user2) {
  try {
    const res1 = await fetch(`https://api.github.com/users/${user1}`);
    const res2 = await fetch(`https://api.github.com/users/${user2}`);

    const data1 = await res1.json();
    const data2 = await res2.json();

    if (data1.followers > data2.followers) {
      console.log(`${user1} wins 🏆`);
    } else if (data2.followers > data1.followers) {
      console.log(`${user2} wins 🏆`);
    } else {
      console.log("It's a tie 🤝");
    }
  } catch (error) {
    console.log("Error in battle mode");
  }
}


function setMode(mode) {
  const battleDiv = document.getElementById("battleInputs");

  if (mode === "battle") {
    battleDiv.style.display = "block";
  } else {
    battleDiv.style.display = "none";
  }
}

//battle result

function showBattleResult(user1, user2, stars1, stars2) {
  const card = document.getElementById("profileCard");

  card.style.display = "flex";
  card.style.gap = "20px";
  card.style.justifyContent = "space-between";

   let class1 = "";
  let  class2 = "";

  if (stars1 > stars2) {
    class1 = "winner";
    class2 = "loser";
  } else if (stars2 > stars1) {
    class2 = "winner";
    class1 = "loser";
  }

  card.innerHTML = `
    <div class="battle-card ${class1}">
      <img src="${user1.avatar_url}">
      <h3>${user1.login}</h3>
      <p>⭐ Stars: ${stars1}</p>
      <p>👥 Followers: ${user1.followers}</p>
    </div>

    <div class="battle-card ${class2}">
      <img src="${user2.avatar_url}">
      <h3>${user2.login}</h3>
      <p>⭐ Stars: ${stars2}</p>
      <p>👥 Followers: ${user2.followers}</p>
    </div>
  `;
}
async function startBattle() {
  const user1 = document.getElementById("user1").value.trim();
  const user2 = document.getElementById("user2").value.trim();

  if (!user1 || !user2) {
    alert("Enter both usernames");
    return;
  }

  try {
    // Fetch both users together
    const [res1, res2] = await Promise.all([
      fetch(`https://api.github.com/users/${user1}`),
      fetch(`https://api.github.com/users/${user2}`)
    ]);

    if (!res1.ok || !res2.ok) {
      throw new Error("User not found");
    }

    const data1 = await res1.json();
    const data2 = await res2.json();

    // Fetch repos
    const [repos1, repos2] = await Promise.all([
      fetch(data1.repos_url).then(r => r.json()),
      fetch(data2.repos_url).then(r => r.json())
    ]);

    //  Calculate total stars
    const stars1 = repos1.reduce((total, repo) => total + repo.stargazers_count, 0);
    const stars2 = repos2.reduce((total, repo) => total + repo.stargazers_count, 0);

    //  Decide winner
    let winner = "";
    if (stars1 > stars2) {
      winner = "user1";
    } else if (stars2 > stars1) {
      winner = "user2";
    } else {
      winner = "tie";
    }

    showBattleResult(data1, data2, stars1, stars2, winner);

  } catch (error) {
    alert("Error fetching users");
  }
}

function showBattleResult(user1, user2, stars1, stars2, winner) {
  const card = document.getElementById("profileCard");

  // Tie case
  if (stars1 === stars2) {
    card.style.display = "block";
    card.innerHTML = "<h2>🤝 It's a Tie!</h2>";
    return;
  }

  //  Layout fix
  card.style.display = "flex";
  card.style.gap = "20px";
  card.style.justifyContent = "space-between";

  let class1 = "";
  let class2 = "";

  if (winner === "user1") {
    class1 = "winner";
    class2 = "loser";
  } else if (winner === "user2") {
    class2 = "winner";
    class1 = "loser";
  }

  card.innerHTML = `
    <a href="${user1.html_url}" target="_blank" class="battle-card ${class1}">
      <img src="${user1.avatar_url}">
      <h3>${winner === "user1" ? "🏆 " : ""}${user1.login}</h3>
      <p>⭐ Stars: ${stars1}</p>
      <p>👥 Followers: ${user1.followers}</p>
    </a>

    <a href="${user2.html_url}" target="_blank" class="battle-card ${class2}">
      <img src="${user2.avatar_url}">
      <h3>${winner === "user2" ? "🏆 " : ""}${user2.login}</h3>
      <p>⭐ Stars: ${stars2}</p>
      <p>👥 Followers: ${user2.followers}</p>
    </a>
  `;
}
//Clear Button
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
  // Clear inputs
  document.getElementById("searchInput").value = "";
  document.getElementById("user1").value = "";
  document.getElementById("user2").value = "";

  // Clear UI
  const card = document.getElementById("profileCard");
  const error = document.getElementById("error");
  const loading = document.getElementById("loading");

  card.innerHTML = "";
  card.style.display = "none";

  error.textContent = "";
  loading.textContent = "";
});