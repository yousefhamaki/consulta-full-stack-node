type InsertType = {
  insertId: number;
  fieldCount: number;
  affectedRows: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
};

export default InsertType;
