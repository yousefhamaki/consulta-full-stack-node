class userRequest {
  login: { [key: string]: string } = {
    email: "required",
    password: "required",
  };

  changePass: { [key: string]: string } = {
    id: "required|number",
    oldpassword: "required",
    newpassword: "required",
  };
  verify: { [key: string]: string } = {
    email: "required|string",
    code: "required|string",
  };
  add: { [key: string]: string } = {
    email: "required",
    password: "required",
    name: "required",
    age: "required",
    ip: "required",
  };
}

export default userRequest;
