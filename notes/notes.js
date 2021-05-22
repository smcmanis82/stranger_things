//AJAX and CRUDE

async function populatePosts() {
  try {
    // const repsonse = await fetch("https:/jsonplace-univclone.herokuapp.com/posts");
    // const posts = await repsonse.json();
    const posts = await readPosts();
    const postListElement = $("#posts");

    posts.forEach((post) => {
      postListElement.append(renderPost(post));
    });
  } catch (error) {
    console.error(error);
  }
}

function renderPost(post) {
  const { id, title, body } = post;
  return $(`
            <div class="post" data-id="${id}">
            <h3>${title}</h3>
            <h3>${body}</h3>
            <button class = "edit">EDIT</button>
            <button class="delete">DELETE</button>
            </div>`).data("post", post);
}

populatePosts();

$("#posts").on("click", ".edit", async function () {
  const postElement = $(this).closest(".post");
  const post = postElement.data("post");

  $("#post-form").data({ post, postElement });
  $("#post-title").val(post.title);
  $("#post-body").val(post.body);
});

$("#posts").on("click", ".delete", async function () {
  const postElement = $(this).closest(".post");
  const post = postElement.data("post");

  try {
    const result = await deletePost(post.id);
    postElement.slideUp();
  } catch (error) {
    console.log(error);
  }
});

$("#post-form").on("submit", async function (event) {
  event.preventDefault();

  const { post, postElement } = $(this).data();
  const postData = {
    title: $("#post-title").val(),
    body: $("#post-body").val(),
  };

  if (post) {
    //editing
    try {
      const result = await updatePost(post.id, postData);
      const updatedElement = renderPost(result);
      postElement.replaceWith(updatedElement);
      $("#post-form").data({ post: null, postElement: null });
      $("#post-form").trigger("reset");
    } catch (error) {
      console.log(error);
    }
  } else {
    //creating
    try {
      const newPost = await createPost(postData);
      $("#posts").prepend(renderPost(newPost));
      $("post-form").trigger("reset");
    } catch (error) {
      console.log(error);
    }
  }
});

// Crud = Create(post) Read(get) Update(patch/put) Destroy(delete)

async function readPosts() {
  try {
    const repsonse = await fetch(
      "https:/jsonplace-univclone.herokuapp.com/posts",
      {}
    );
    const posts = await repsonse.json();
    return posts;
  } catch (error) {
    throw error;
  }
}

async function createPost(postObj) {
  try {
    const response = await fetch(
      `https:/jsonplace-univclone.herokuapp.com/posts`,
      {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newPost = await response.json();
    return newPost;
  } catch (error) {
    throw error;
  }
}

async function updatePost(postId, updatedPostObj) {
  try {
    const response = await fetch(
      `https:/jsonplace-univclone.herokuapp.com/posts/${postId}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedPostObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("UPDATED", result);
    return result;
  } catch (error) {
    throw error;
  }
}

async function deletePost(postId) {
  try {
    const response = await fetch(
      `https:/jsonplace-univclone.herokuapp.com/posts/ ${postId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
