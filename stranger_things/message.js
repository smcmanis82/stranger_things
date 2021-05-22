function setToken(token) {
  localStorage.setItem("token", token);
}

async function fetchAllMessages() {
  const myToken = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const { data } = await response.json();
    return data.messages;
  } catch (err) {
    console.error(err);
  }
}

async function getAccount() {
  try {
    const myToken = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    const accountID = data.data._id;
    localStorage.setItem("accountID", accountID);
    //    currentUserID = data._id
  } catch (error) {
    console.log(error);
  }
}
getAccount();

async function allMessagesAtState() {
  const messages = await fetchMessages();
  $("#messages").empty();
  messages.forEach((message) => {
    const messageHTML = createMessageHTML(message);
    if (isMessageAuthor(message)) {
      messageHTML.css("background-color", "rgb(17, 97, 116)");
      $("#messages").append(messageHTML);
    } else {
      $("#messages-rec").append(messageHTML);
    }
  });
}
allMessagesAtState();

// message card
const createMessageHTML = (message) => {
  return $(`
    <div class="card" style="width: 40rem;">
    <div class="card-body">
    <h5 class="msg-card-title">Post: ${message.post.title}</h5>
    <p class="msg-card-text">${message.content}</p>
    <p class="msg-card-user"> <b>User:</b> ${message.fromUser.username}</p>
    </div> 
    `).data("message", message);
};

async function createMessage(messageObj) {
  const myToken = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "POST",
      body: JSON.stringify({
        message: messageObj,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const newMessage = await response.json();
    return newMessage;
  } catch (err) {
    console.error(err);
  }
}

function isMessageAuthor(message) {
  if (message.fromUser._id == localStorage.getItem("accountID")) {
    return true;
  } else {
    return false;
  }
}
