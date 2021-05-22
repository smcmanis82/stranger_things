// if (loginUser) {
//   $(".login-submit").hide();
//   $("#register-submit").hide();
//   $("#logout-button").show();
// } else {
//   $(".login-submit").show();
//   $("#register-submit").show();
//   $("#logout-button").hide();
// }
// const username = "michael";
const name = "chicago";

if (localStorage["michael"]) {
  const hide = $(".input-button").hide();
  hide;
  console.log("hi");
} else {
  const show = $(".input-button").show();
  show;
  console.log("bye");
}
