import { createPool } from "mysql2/promise";

export const Pool = createPool({
  host: "localhost",
  user: "root",
  password: "0803",
  port: 3306,
  database: "formativojava"
});

