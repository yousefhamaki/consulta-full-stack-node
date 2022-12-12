class employeeRequest {
  add: { [key: string]: string } = {
    email: "required",
    password: "required",
    name: "required",
    options: "required",
    salary: "required|number",
    job_title: "required",
    status: "reuired",
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

export default employeeRequest;
