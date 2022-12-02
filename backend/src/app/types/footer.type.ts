type FooterType = {
  id?: number;
  name: string;
  status: number;
};

export type FooterFork = {
  id: number;
  name: string;
};

export type FooterForkType = {
  id: number;
  name: string;
  status: number;
  content: string;
  footer_id: number;
};

export type FooterUserType = {
  id: number;
  footer_id: number;
  name: string;
  footer_name: string;
};

export type FooterUser = {
  id: number;
  name: string;
  data: FooterFork[];
};

export default FooterType;
