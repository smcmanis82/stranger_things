$(".close-login").on("click", function () {
  $("#username-login").val("");
  $("#password-login").val("");
});

$("#login-submit").on("click", async function (e) {
  e.preventDefault();
  let username = $("#username-login").val();
  let password = $("#password-login").val();
  await loginUser(username, password);
  await fetchMyAccount();
  $(".close-login").click();
  await loadPage();
});

async function loginUser(username, password) {
  const userInfo = {
    user: {
      username,
      password,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const { data, success } = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);
    console.log(data);
    return success;
  } catch (error) {
    console.error(error);
  }
}

$(".close-register").on("click", function () {
  $("#username-register").val("");
  $("#password-register").val("");
  $("#password-register-reenter").val("");
  $("#register-submit").attr("disabled", true);
});

$("#register-submit").on("click", async function (e) {
  e.preventDefault();
  let username = $("#username-register").val();
  let password = $("#password-register").val();
  await registerUser(username, password);
  await fetchMyAccount();
  $(".close-register").click();
  await loadPage();
});

async function registerUser(username, password) {
  const userInfo = {
    user: {
      username,
      password,
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const { data, success } = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);
    return success;
  } catch (error) {
    console.error(error);
  }
}

$("#password-register-reenter").on("input", function (e) {
  if (passwordsMatch() && passwordLengthOk()) {
    $("#register-submit").removeAttr("disabled");
  } else {
    $("#register-submit").attr("disabled", true);
  }
});

function passwordsMatch() {
  return (
    $("#password-register").val() === $("#password-register-reenter").val()
  );
}

function passwordLengthOk() {
  return $("#password-register").val().length >= 8;
}

$("#create-submit").on("click", async function (e) {
  e.preventDefault();

  const post = {
    title: $("#post-title").val(),
    description: $("#post-description").val(),
    location: $("#post-location").val(),
    price: $("#post-price").val(),
  };
  await createPost(post);
  $(".close-login").click();
  await loadPage();
});

async function createPost(post) {
  const myToken = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        post,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const newPost = await response.json();

    return newPost;
  } catch (error) {
    throw error;
  }
}

async function sendMessage(postID, message) {
  const myToken = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/posts/${postID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify({
        message: {
          content: `${message}`,
        },
      }),
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

$("#message-submit").on("click", async function (e) {
  e.preventDefault();
  const post = $(this).closest(".modal-content").data("post");
  const message = $("#message-content").val();
  $(this).closest(".modal-content").data("post", null);
  $(".close-message").click();
  try {
    await sendMessage(post._id, message);
  } catch (err) {
    throw err;
  }
});

$(".close-message").on("click", function () {
  $("#message-content").val("");
});
