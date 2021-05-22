const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

$("#logout-button").on("click", async function (e) {
  e.preventDefault();
  localStorage.clear();
  await loadPage();
});

async function fetchPosts() {
  try {
    const url = `${BASE_URL}/posts`;
    const response = await fetch(url);
    const { data } = await response.json();
    return data.posts;
  } catch (error) {
    console.log(error);
  }
}

async function fetchMyAccount() {
  try {
    const myToken = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const { data } = await response.json();
    localStorage.setItem("accountID", data._id);
  } catch (error) {
    console.log(error);
  }
}

function isLoggedIn() {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

function isPostAuthor(post) {
  if (post.author._id == localStorage.getItem("accountID")) {
    return true;
  } else {
    return false;
  }
}

// hide and show message and delete click handlers
function selectCardLinks(post) {
  if (isLoggedIn() && isPostAuthor(post)) {
    return '<a href="#" class="main-delete-button">Delete</a>';
  } else if (isLoggedIn() && !isPostAuthor(post)) {
    return '<a href="./modals/messageModal.html" class="main-message-button" data-toggle="modal" data-target="#myMessage">Send Message</a>';
  } else {
    return "";
  }
}

function createPostHTML(post) {
  return $(`
    <div class="card" style="width: 40rem;">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Price: ${post.price}</li>
        <li class="list-group-item">${post.location}</li>
        <li class="list-group-item">Post by: ${post.author.username}</li>
      </ul>
      <div class="card-links">
        ${selectCardLinks(post)}
      </div>
    </div>
`).data("post", post);
}

// this passes the post data from the card to the send message modal
$(document).on("click", ".main-message-button", function () {
  let post = $(this).closest(".card").data("post");
  $(".modal-content").data("post", post);
});

// delete click handler
$("#posts").on("click", ".main-delete-button", async function () {
  const postElement = $(this).closest(".card");
  const post = postElement.data("post");

  try {
    await deletePost(post._id);
    postElement.slideUp();
  } catch (error) {
    console.log(error);
  }
});

// delete post from page
async function deletePost(postID) {
  const myToken = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// search bar
$(document).ready(function () {
  $("#mySearch").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $(".card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

// hide and show buttons based on login/logout status
function renderButtons() {
  if (isLoggedIn()) {
    $(".main-login-button").hide();
    $(".main-register-button").hide();

    $("#logout-button").show();
    $(".main-create-button").show();
    $(".main-account-button").show();
  } else {
    $(".main-login-button").show();
    $(".main-register-button").show();

    $("#logout-button").hide();
    $(".main-create-button").hide();
    $(".main-account-button").hide();
  }
}

async function allPostsAtState() {
  $("#posts").empty();
  const posts = await fetchPosts();
  posts.forEach((post) => {
    // Loop through the posts
    const postHTML = createPostHTML(post); // For each post, create some HTML
    $("#posts").prepend(postHTML); // Append the HTML to the body
  });
}

async function loadPage() {
  allPostsAtState();
  renderButtons();
}

(async () => {
  await loadPage();
})();
