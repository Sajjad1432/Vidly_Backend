// console.log("Before");
// getUser(1, (user) => {
//   console.log("User", user);
//   //   Get Repositories
//   getRepos(user.gitHubUserName, (repos) => {
//     console.log("Repositories", repos);
//   });
// });
// console.log("After");

// How to use a call back function to make this code synchronous

// Callback
// A function called when the asynchronous result is ready

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log("Reading a user from database");
//     callback({ id: id, gitHubUserName: "Sajjad1432" });
//   }, 2000);
//   //   return 1;
// }

function getRepos(username, callback) {
  setTimeout(() => {
    console.log("Calling Github API...");
    callback(["repo1", "repo2", "repo3", "repo4"]);
  }, 2000);
}

// JavaScript Promises

// An Object which holds the eventual result of an asynchronous operation
// States: Pending, Fulfilled, Rejected

// const p = new Promise((resolve, reject) => {
//   // Kick off some async work
//   // ...
//   setTimeout(() => {
//     resolve(1); // pending =>  resolved, fulfilled
//     reject(new Error("Message")); //pending => rejected
//   }, 2000);
// });

// p.then((result) => console.log("Result", result)).catch((err) =>
//   console.log("Error", err.message)
// );

// function getUser(id) {
//   return new Promise((resolve, reject) => {
//     // Kick off some async work
//     setTimeout(() => {
//       console.log("Reading a user from database");
//       resolve({ id: id, gitHubUserName: "Sajjad1432" });
//     }, 2000);
//   });
// }

// function getRepos(username) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Calling Github API...");
//     }, 2000);
//     resolve(["repo1", "repo2", "repo3", "repo4"]);
//   });
// }

// getUser(1).then((user) => getRepos(user.gitHubUserName));

// Async and Await approach
