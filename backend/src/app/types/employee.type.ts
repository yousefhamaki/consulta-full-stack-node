type Employee = {
  id?: number;
  admin_id: number;
  name: string;
  email: string;
  password: string;
  options: string;
  img: string;
  salary: number;
  job_title: string;
  status: string;
  rank?: string;
  token?: string;
};

export default Employee;
