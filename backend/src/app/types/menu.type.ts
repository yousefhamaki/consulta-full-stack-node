type MenuEl = {
  id?: number;
  name: string;
  status: number;
};

export type Menufork = {
  id?: number;
  menu_id: number;
  name: string;
  content: string;
  logo: string | null;
  status: number;
};

export type MenuforkOption = {
  id?: number;
  fork_id: number;
  name: string;
  order: number;
  content: string;
  file: string | null;
  status: number;
};

export type MenuforkOptionOption = {
  id?: number;
  option_id: number;
  name: string;
  order: number;
  price: number;
  status: number;
};

export type MenuUserType = {
  id: number;
  menu_id: number;
  name: string;
  menu_name: string;
  logo: string;
};

export type MenuResult = {
  id: number;
  name: string;
  data: MenuDataResult[];
};

export type MenuDataResult = {
  id: number;
  name: string;
  logo: string;
};

export default MenuEl;
