const { client } = require("../config/db");

const getUsers = async () => {
  const result = await client.query("SELECT * FROM customer");
  return result.rows;
};

const createUser = async (user) => {
  const { name, email, password, address } = user;
  const result = await client.query(
    "INSERT INTO customer ( c_name, c_email, c_password, c_address ) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, password, address]
  );
  return result.rows[0];
};

const updateUser = async (id, user) => {
  const { name, email } = user;
  const result = await client.query(
    "UPDATE customer SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await client.query(
    "DELETE FROM customer WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

const getUser = async (id) => {
  const result = await client.query(
    "SELECT * FROM customer WHERE c_no = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  try {
    const result = await client.query(
      "SELECT * FROM customer WHERE c_email = $1",
      [email]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUser,
};
