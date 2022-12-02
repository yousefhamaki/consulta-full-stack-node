class adminRequest {
  add: { [key: string]: string } = {
    email: "required",
    password: "required",
    name: "required",
  };

  login: { [key: string]: string } = {
    email: "required",
    password: "required",
  };

  changePass: { [key: string]: string } = {
    id: "required|number",
    oldpassword: "required",
    newpassword: "required",
  };
}

export default adminRequest;
