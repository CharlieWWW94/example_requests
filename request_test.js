// Grabs button from html page
const button = document.querySelector(".send-button");
// To be assigned after first login
let token = "";

async function testReq() {
  // I'm using axios to make the api requests. Fetch should work too,
  // if you want to use Axios, copy the script tag from html page.

  //Example login request. No token/headers needed here.
  let loginResponse = await axios({
    method: "post",
    url: "http://127.0.0.1:3000/users/login",
    data: { username: "user", pw_hash: "123" },
  });

  //A successful login will return user data, including budgets, budget_items etc.
  // It will also contain a JWT token - make sure you save this for future requests.
  authorization_token = loginResponse.data.token;

  console.log(authorization_token);

  // I saved the token in global namespace so its accessible from all functions.
  token = authorization_token;

  // Here is an example post request to add a new income. Notice i have added a headers key:value pair.
  //Convention dictates that the token is sent with the "Bearer: " prefix. Please be sure to
  //include this or the backend won't recognise the token.
  let res3 = await axios({
    method: "post",
    url: "http://127.0.0.1:3000/incomes",
    data: { income_type: "Salary", month: 5000 },
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
}

async function make_requests() {
  await testReq();
}

//Event listener that triggers the example requests
button.addEventListener("click", () => {
  make_requests();
});
