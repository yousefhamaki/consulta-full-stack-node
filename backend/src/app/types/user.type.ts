type User = {
  id?: number;
  email: string;
  password: string;
  token?: string;
  rank?: string;
  name: string;
  ip?: string;
  age?: string;
};

export type Pagination = {
  pagination: {
    current: number;
    perPage: number;
    totalPages: number;
    previous: number | undefined;
    next: number | undefined;
  };
  data: [object | null];
  type: string;
};

export default User;
