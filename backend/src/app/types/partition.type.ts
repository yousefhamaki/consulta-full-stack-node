type Partition = {
  id?: number;
  name: string;
  img: string;
  link?: string | null;
  relations: { id: number; name?: "string" }[];
  status: number;
};

export default Partition;
