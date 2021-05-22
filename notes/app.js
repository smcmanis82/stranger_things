// const BASE_URL = "http://clever-neumann-583.herokuapp.com";

// async function fetchPosts() {
//   return fetch(`${BASE_URL}/posts`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       return data;
//     });
// }
// fetchPosts().then((data) => {
//   console.log(data);
// });

// async function fetchPosts() {
//   try {
//     const response = await fetch(`${BASE_URL}/posts`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// const createPostHTML = (post) => {
//   return `<div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title">${post.title}</h5>
//     <p class="card-text">${post.description}</p>
//     <footer class="blockquote-footer">${post.author || ""}</footer>
//   </div>
// </div>`;
// };

// (async function () {
//   const posts = await fetchPosts();
//   console.log(posts);
//   posts.forEach((post) => {
//     const postHTML = createPostHTML(post);
//     $("body").append(postHTML);
//   });
// });

// // async function renderPosts() {
// //   const posts = await fetchPosts();
// //   console.log(posts);
// // }

// // renderPosts();

// const loginContainer = $("#login");
// loginContainer.append(
//   ` <form> <div class="form-group"> <h3>Register</h3> <label for="exampleInputEmail1">Email address</label> <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email"> <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> </div> <div class="form-group"> <label for="exampleInputPassword1">Password</label> <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password"> </div> <div class="form-check"> <input type="checkbox" class="form-check-input" id="exampleCheck2"> <label class="form-check-label" for="exampleCheck1">Check me out</label> </div> <button type="submit" class="btn btn-primary">Submit</button> </form> `
// );
const BASE_URL = "https://jsonplaceholder.typicode.com";

const postblog = async (requestBody) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVkMWZiMDJlZTU3MzAwMDRlZWZiODQiLCJpYXQiOjE2MTY3MTY1MzR9.a6P64RdHUofG10bwixi0_TvruwxZhiuv7GHdrHZ04pw",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

$("form").on("submit", (e) => {
  e.preventDefault();
  const blogTitle = $("#blog-title").val();
  const blogDescription = $("#blog-description").val();
  // const blogAuthor = $("#blog-author").val();
  console.log(blogTitle, blogDescription);

  const requestBody = {
    userId: 1,
    title: blogTitle,
    description: blogDescription,
    // author: blogAuthor,
  };
  try {
    postBlog(requestBody);
  } catch (e) {
    console.error(e);
  }
});

////////////////////////////////////////////////
const userLoggedIn = () => {
  return localStorage.getItem;
};

//users/me get userID at the end of post that will me My Account

const myUserId = "6666666666666666"; //data._id or something
const messages = [{}];

// send messages are messages in the /users/me response that have a fromUserID that is the same...
const sentMessages = messages.filter((message) => {
  return message.fromUser._id === myUserId;
});

//opposite of above
const recievedMessages = messages.filter((message) => {
  return message.fromUser._id !== myUserId;
});
