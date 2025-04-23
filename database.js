import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getAllSchoolsData() {
  const [result] = await pool.query("select * from schools");
  return result;
}

export async function getSchoolById(id) {
  const [rows] = await pool.query(
    `
    select * 
    from Schools
    where id = ?`,
    [id]
  );
  return rows[0];
}

export async function createSchool(id, name, address, latitude, longitude) {
  const [result] = await pool.query(
    `
    insert into Schools (id, name, address, latitude, longitude)
    values (?, ?, ?, ?, ?)`,
    [id, name, address, latitude, longitude]
  );
  return result;
}
